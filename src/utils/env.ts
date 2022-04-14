import dotenv from "dotenv";

dotenv.config();

interface Environment extends NodeJS.ProcessEnv {
    REACT_APP_SUPABASE_ANON_KEY?: string;
    REACT_APP_SUPABASE_STORAGE_PUBLIC_URL?: string;
    REACT_APP_SUPABASE_URL?: string;
}

const env: Environment = process.env;

const isDevelopment = () => env.NODE_ENV === "development";

export { env, isDevelopment };
export type { Environment };
