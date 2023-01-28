import { useAtom } from "jotai";
import { GlobalStateAtom } from "atoms/global-state-atom";

const useGlobalState = () => {
    const [globalState, setGlobalState] = useAtom(GlobalStateAtom);

    return {
        globalState,
        setGlobalState,
        isAuthenticated: globalState.isAuthenticated(),
    };
};

export { useGlobalState };
