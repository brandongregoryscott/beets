import { useState } from "react";
import { useTimeoutWhen } from "rooks";

interface UseTimeoutRenderOptions {
    /**
     * Amount of time to wait before timing out and forcing a rerender
     */
    lengthInMs?: number;

    /**
     * Optional callback to run when timing out
     */
    onTimeout?: () => void;
}

/**
 * Utility to force a re-render of a component after a certain amount of time
 *
 * Unfortunate hack to prevent infinite loading issue for initial render when a staleTime is set
 * @see https://github.com/tannerlinsley/react-query/issues/1657
 */
const useTimeoutRender = (options?: UseTimeoutRenderOptions) => {
    const { lengthInMs = 1000, onTimeout } = options ?? {};
    const [timedOut, setTimedOut] = useState<boolean>(false);

    useTimeoutWhen(
        () => {
            setTimedOut(true);
            onTimeout?.();
        },
        lengthInMs,
        !timedOut
    );
};

export { useTimeoutRender };
