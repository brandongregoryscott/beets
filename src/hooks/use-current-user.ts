import type { UserRecord } from "models/user-record";
import { useGlobalState } from "hooks/use-global-state";

interface UseCurrentUserResult {
    user?: UserRecord;
}

const useCurrentUser = (): UseCurrentUserResult => {
    const { globalState } = useGlobalState();
    const { user } = globalState;

    return { user };
};

export { useCurrentUser };
