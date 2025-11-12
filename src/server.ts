import {Elysia} from "elysia";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import habitRoutes from "./routes/habitRoutes";

const app = new Elysia()
    .group("/api/v1", (app) =>
        app.group("/auth", (authApp) => authApp.use(authRoutes))
            .group("/users", (userApp) => userApp.use(userRoutes))
            .group("/users/:userId/habits", (habitApp) => habitApp.use(habitRoutes))
    )
    .get("/health", (context) => {
        return {
            status: "OK",
            timestamp: new Date().toISOString(),
            service: "Habit Tracker API",
            version: process.env.npm_package_version || "1.0.0"
        }
    })
    .onError(({code, error}) => {
        console.error(`Error ${code}:`, error);
        return {
            success: false,
            message: "Internal server error",
            ...(process.env.NODE_ENV === 'development' && { error: error })
        };
    });


export {app}; // can help when needed in another module like test

export default app;
