import { useState } from "react";

const useSyncProject = () => {
    const [isLoading, setIsLoading] = useState(false);

    const mutate = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3500);
    };

    return { isLoading, mutate };
};

export { useSyncProject };
