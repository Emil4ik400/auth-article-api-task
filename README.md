# Auth & Article API Task

A simple REST API built with **Node.js**, **Express**, and **TypeScript**.

## Features
- **Authentication**: Stateful session management using UUIDs.
- **Complexity**: $O(1)$ lookups for Users and Sessions using JavaScript `Map`.
- **Security**: Visibility levels (Public, Logged_in, Private) with ownership checks.
- **Fail-Fast**: Input validation before expensive operations.

## How to Run
1. `npm install`
2. `npx ts-node index.ts`
3. Use the `test.http` file to verify endpoints.
