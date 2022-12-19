import type { Location, NavigateFunction, Params } from "react-router";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useLocation } from "react-router";

interface UseRouterResult {
    location: Location;
    navigate: NavigateFunction;
    params: Params;
}

const useRouter = (): UseRouterResult => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    return {
        navigate,
        location,
        params,
    };
};

export { useRouter };
