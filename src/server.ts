import { Elysia } from "elysia";

const app = new Elysia();

app.get("/health", (context) => {
    return {
        status: "OK",
        timestamp: new Date().toISOString(),
        service: "Habit Tracker API",
    }
})

export {app}; // can help when needed in another module like test

export default app;
