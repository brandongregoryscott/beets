import { useAtom } from "jotai";
import { GlobalStateAtom } from "utils/atoms/global-state-atom";

const useGlobalState = () => {
    const [globalState, setGlobalState] = useAtom(GlobalStateAtom);

    return { globalState, setGlobalState };
};

export { useGlobalState };
