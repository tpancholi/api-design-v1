// habit routes - nested under users
import { Elysia } from "elysia";

const habitRoutes = new Elysia();

// Get all habits for a specific user
habitRoutes.get("/", async ({ params }) => {
    const { userId } = params as { userId: string };
    try {
        // Fetch habits for userId
        return {
            success: true,
            message: `fetched all habits for user ${userId} successfully`,
            data: {}
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            success: false,
            message: `failed to fetch habits for user ${userId}`,
            error: errorMessage
        };
    }
});

// Get specific habit for a user
habitRoutes.get("/:habitId", async ({ params }) => {
    const { userId, habitId } = params as { userId: string; habitId: string };
    try {
        return {
            success: true,
            message: `fetched habit ${habitId} for user ${userId} successfully`,
            data: {}
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            success: false,
            message: `failed to fetch habit ${habitId} for user ${userId}`,
            error: errorMessage
        };
    }
});

// Create habit for a user
habitRoutes.post("/", async (context) => {
    const { userId } = context.params as { userId: string };
    try {
        context.set.status = 201;
        return {
            success: true,
            message: `habit created for user ${userId} successfully`,
            data: {}
        };
    } catch (error: unknown) {
        context.set.status = 500;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            success: false,
            message: `failed to create habit for user ${userId}`,
            error: errorMessage
        };
    }
});

// Update habit for a user
habitRoutes.put("/:habitId", async ({ params, body }) => {
    const { userId, habitId } = params as { userId: string; habitId: string };
    try {
        return {
            success: true,
            message: `updated habit ${habitId} for user ${userId} successfully`,
            data: {}
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            success: false,
            message: `failed to update habit ${habitId} for user ${userId}`,
            error: errorMessage
        };
    }
});

// Delete habit for a user
habitRoutes.delete("/:habitId", async ({ params, set }) => {
    const { userId, habitId } = params as { userId: string; habitId: string };
    try {
        set.status = 204;
        return;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            success: false,
            message: `failed to delete habit ${habitId} for user ${userId}`,
            error: errorMessage
        };
    }
});

// Mark habit as complete
habitRoutes.post("/:habitId/complete", async ({ params }) => {
    const { userId, habitId } = params as { userId: string; habitId: string };
    return {
        success: true,
        message: `marked habit ${habitId} for user ${userId} as completed successfully`,
        data: {}
    };
});

export default habitRoutes;
