// auth routes
import {Elysia} from "elysia";

const authRoutes = new Elysia()

authRoutes.post("/register", async (context) => {
    context.set.status = 201;
    return {
        success: true,
        message: "user signed up successfully",
        data: {}
    }
})

authRoutes.post("/login", async (context) => {
    context.set.status = 200;
    return {
        success: true,
        message: "user logged in successfully",
        data: {}
    }
})

export default authRoutes;


