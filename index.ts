import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());


type Visible = "public" | "private" | "logged_in";

type User = {
  user_id: string;
  login: string;
  password: string;
};

type Session = {
  token: string;
  user_id: string;
};

type Article = {
  article_id: string;
  title: string;
  content: string;
  visibility: Visible;
  user_id: string;
};


const users = new Map<string, User>(); 
const sessions = new Map<string, Session>(); 
const articles: Article[] = [];


function getToken(req: Request): string | undefined {
  const value = req.headers["authentication-header"];
  return typeof value === "string" ? value : undefined;
}




app.post("/api/user", (req: Request, res: Response) => {
  const { user_id, login, password } = req.body;
  
  if (!user_id || !login || !password) return res.sendStatus(400);
  if (users.has(login)) return res.status(409).send("User already exists");

  users.set(login, { user_id, login, password });
  return res.sendStatus(201);
});


app.post("/api/authenticate", (req: Request, res: Response) => {
  const { login, password } = req.body;
  if (!login || !password) return res.sendStatus(400);

  const user = users.get(login);
  if (!user) return res.sendStatus(404);
  if (user.password !== password) return res.sendStatus(401);

  const token = uuidv4();
  sessions.set(token, { token, user_id: user.user_id });
  return res.status(200).json({ token });
});


app.post("/api/articles", (req: Request, res: Response) => {
 
  if (!req.body || typeof req.body !== 'object') return res.sendStatus(400);

  const { title, content, visibility } = req.body;

  
  if (!title || !content || !visibility) return res.sendStatus(400);
  if (!["public", "private", "logged_in"].includes(visibility)) return res.sendStatus(400);

  
  const token = getToken(req);
  const session = token ? sessions.get(token) : undefined;

  if (!session) return res.sendStatus(401); 

  const article: Article = {
    article_id: uuidv4(),
    title,
    content,
    visibility: visibility as Visible,
    user_id: session.user_id,
  };

  articles.push(article);
  return res.status(201).json(article);
});


app.get("/api/articles", (req: Request, res: Response) => {
  const token = getToken(req);
  const session = token ? sessions.get(token) : undefined;

  const result = articles.filter((article) => {
    
    if (article.visibility === "public") return true;
    
    
    if (article.visibility === "logged_in") return !!session;
    console.log(article.user_id, session?.user_id);
    
    if (article.visibility === "private") {
      return session && article.user_id === session.user_id;
    }

    return false;
  });

  return res.status(200).json(result);
});


app.post("/api/logout", (req: Request, res: Response) => {
  const token = getToken(req);
  if (!token || !sessions.has(token)) return res.sendStatus(401);

  sessions.delete(token);
  return res.sendStatus(200);
});

app.delete("/api/articles/:id", (req: Request, res: Response) => {
  const token = getToken(req);
  const session = token ? sessions.get(token) : undefined;

  
  if (!session) return res.sendStatus(401);

  const articleId = req.params.id;
  const index = articles.findIndex(a => a.article_id === articleId);

  
  if (index === -1) return res.sendStatus(404);

  
  if (articles[index].user_id !== session.user_id) {
    return res.status(403).send("You are not the author");
  }

  articles.splice(index, 1);
  return res.sendStatus(204);
});

app.patch("/api/articles/:id", (req: Request, res: Response) => {
  // implement here
})

app.listen(3000, () => console.log("SERVER READY ON PORT 3000"));