enum EnvironmentName {
    Development = "Development",
    Local = "Local",
    Production = "Production",
}

interface Environment extends NodeJS.ProcessEnv {
    REACT_APP_POSTHOG_KEY?: string;
    REACT_APP_SUPABASE_ANON_KEY?: string;
    REACT_APP_SUPABASE_STORAGE_PUBLIC_URL?: string;
    REACT_APP_SUPABASE_URL?: string;
}

const env: Environment = process.env;

const getCurrentEnvironment = (): EnvironmentName => {
    if (isDevelopment()) {
        return EnvironmentName.Local;
    }

    if (
        process.env.NODE_ENV === "production" &&
        window.location.hostname.startsWith("development")
    ) {
        return EnvironmentName.Development;
    }

    return EnvironmentName.Production;
};

const getTargetBranch = (): string => {
    const environment = getCurrentEnvironment();
    if (environment === EnvironmentName.Production) {
        return "main";
    }

    return EnvironmentName.Development.toLowerCase();
};

const isDevelopment = () => env.NODE_ENV === "development";

export type { Environment };
export {
    env,
    EnvironmentName,
    getCurrentEnvironment,
    getTargetBranch,
    isDevelopment,
};
