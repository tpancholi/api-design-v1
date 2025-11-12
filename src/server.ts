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
    // Catch-all for non-API routes
    .all("*", (context) => {
        context.set.status = 404;
        return {
            success: false,
            message: `Route not found: ${context.request.method} ${context.request.url}`,
            path: context.request.url,
            method: context.request.method,
            timestamp: new Date().toISOString()
        };
    })
    .onError(({ code, error, request }) => {
        console.error(`Error ${code}:`, error);

        if (code === 'NOT_FOUND') {
            return {
                success: false,
                message: `Resource not found: ${request.method} ${request.url}`,
                path: request.url,
                method: request.method,
                timestamp: new Date().toISOString()
            };
        }

        return {
            success: false,
            message: "Internal server error",
            ...(process.env.NODE_ENV === 'development' && { error: error })
        };
    });


export {app}; // can help when needed in another module like test

export default app;
