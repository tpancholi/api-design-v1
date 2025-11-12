// user routes
import { Elysia } from "elysia";

const userRoutes = new Elysia();

userRoutes.get("/", async () => {
    try {
        // Your logic here
        return {
            success: true,
            message: "fetched all users successfully",
            data: {}
        };
    } catch (error:any) {
        // Handle error appropriately
        return {
            success: false,
            message: "failed to fetch users",
            error: error.message
        };
    }
});

userRoutes.get("/:userId", async ({ params: { userId } }) => {
    try {
        // Validate ID
        if (!userId) {
            return {
                success: false,
                message: "user ID is required",
                data: null
            };
        }

        console.log(userId);
        return {
            success: true,
            message: `fetched ${userId} user successfully`,
            data: {}
        };
    } catch (error:any) {
        return {
            success: false,
            message: `failed to fetch user ${userId}`,
            error: error.message
        };
    }
});

userRoutes.post("/", async (context) => {
    try {
        console.log(context.body);

        // Validate body
        if (!context.body) {
            return {
                success: false,
                message: "request body is required",
                data: null
            };
        }

        context.set.status = 201;
        return {
            success: true,
            message: "user stored successfully",
            data: {}
        };
    } catch (error:any) {
        context.set.status = 500;
        return {
            success: false,
            message: "failed to create user",
            error: error.message
        };
    }
});

userRoutes.put("/:userId", async ({ params: { userId }, body }) => {
    try {
        console.log(userId, body);

        if (!userId) {
            return {
                success: false,
                message: "user ID is required",
                data: null
            };
        }

        return {
            success: true,
            message: `updated ${userId} user successfully`,
            data: {}
        };
    } catch (error:any) {
        return {
            success: false,
            message: `failed to update user ${userId}`,
            error: error.message
        };
    }
});

userRoutes.delete("/:userId", async ({ params: { userId }, set }) => {
    try {
        console.log(userId);

        if (!userId) {
            return {
                success: false,
                message: "user ID is required",
                data: null
            };
        }

        set.status = 204; // No Content for successful deletion
        return {
            // success: true,
            // message: `deleted ${id} habit successfully`,
            // data: null
        };
    } catch (error:any) {
        return {
            success: false,
            message: `failed to delete user ${userId}`,
            error: error.message
        };
    }
});

export default userRoutes;