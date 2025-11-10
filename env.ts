import dotenv from 'dotenv';
import {z} from 'zod';
import fs from 'fs';

// Set default APP_STAGE if not provided
process.env.APP_STAGE = process.env.APP_STAGE || 'dev';

const isProduction = process.env.APP_STAGE === 'production';
const isDevelopment = process.env.APP_STAGE === 'dev';
const isTest = process.env.APP_STAGE === 'test';

// Detect if running in an AWS environment
const isAWS = !!process.env.AWS_REGION || !!process.env.AWS_EXECUTION_ENV;

// Only load local environment files in non-AWS environments
if (!isAWS) {
    // Load environment files based on APP_STAGE
    if (isDevelopment && fs.existsSync('.env.local')) {
        dotenv.config({ path: '.env.local' });
    } else if (isTest && fs.existsSync('.env.test.local')) {
        dotenv.config({ path: '.env.test.local' });
    } else if (isProduction && fs.existsSync('.env.production.local')) {
        dotenv.config({ path: '.env.production.local' });
    }

    // Also load a base .env file if it exists (fallback)
    if (fs.existsSync('.env')) {
        dotenv.config({ path: '.env', override: false });
    }
}

// Environment validation schema
const envSchema = z.object({
    BUN_ENV: z.enum(['development', 'test', 'production']).default('development'),
    APP_STAGE: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(5000),
    DATABASE_URL: z.string().startsWith('postgres://'),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
});

export type Env = z.infer<typeof envSchema>;

// Validate environment variables
let env: Env;
try {
    env = envSchema.parse(process.env);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.error('❌ Invalid environment variables:');

        error.issues.forEach((err) => {
            const path = err.path.join('.');
            console.error(`  - ${path}: ${err.message}`);
        });

        console.error('\n📝 Please check your environment configuration');
        process.exit(1);
    }
    throw error;
}

// Environment helper functions
export const isProd = () => env.APP_STAGE === 'production';
export const isDev = () => env.APP_STAGE === 'dev';
export const isTestEnv = () => env.APP_STAGE === 'test';

// Export validated environment
export {env};
export default env;
