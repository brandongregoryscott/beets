import { isEmpty, zip } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

interface ResetPasswordQueryParams {
    access_token?: string;
    error_code?: number;
    error_description?: string;
    expires_in?: string;
    refresh_token?: string;
    token_type?: string;
    type?: string;
}

interface UseResetPasswordRouteResult extends ResetPasswordQueryParams {
    clear: () => void;
}

const keys: Array<keyof ResetPasswordQueryParams> = [
    "access_token",
    "error_code",
    "error_description",
    "refresh_token",
    "expires_in",
    "token_type",
    "type",
];

const useResetPasswordRoute = () => {
    const { hash } = useLocation();
    const [, setSearchParams] = useSearchParams();
    const [result, setResult] = useState<ResetPasswordQueryParams>({});
    const clear = useCallback(() => setResult({}), []);

    useEffect(() => {
        if (isEmpty(hash)) {
            return;
        }

        const searchParams = new URLSearchParams(hash.replace("#", ""));
        const values = keys.map((key) => searchParams.get(key) ?? undefined);
        setResult(
            Object.fromEntries(zip(keys, values)) as ResetPasswordQueryParams
        );
    }, [hash]);

    useEffect(() => {
        if (isEmpty(hash)) {
            return;
        }

        setSearchParams(new URLSearchParams());
    }, [hash, setSearchParams]);

    return { ...result, clear };
};

export { useResetPasswordRoute };
export type { ResetPasswordQueryParams, UseResetPasswordRouteResult };
