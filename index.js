"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('FILE STARTED');
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const users = [];
const sessions = [];
const articles = [];
function getToken(req) {
    const value = req.headers['authentication-header'];
    return typeof value === 'string' ? value : undefined;
}
function getSession(token) {
    if (!token)
        return undefined;
    return sessions.find(s => s.token === token);
}
app.post('/api/user', (req, res) => {
    const { user_id, login, password } = req.body;
    if (!user_id || !login || !password) {
        return res.sendStatus(400);
    }
    users.push({
        user_id,
        login,
        password
    });
    return res.sendStatus(201);
});
app.get('/', (_req, res) => {
    res.send('OK');
});
app.listen(3000, () => {
    console.log('SERVER LISTENING ON 3000');
});
