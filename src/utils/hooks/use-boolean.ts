import { useCallback, useState } from "react";

const useBoolean = (defaultValue?: boolean) => {
    const [value, setValue] = useState(defaultValue ?? false);
    const toggle = useCallback(
        () => setValue((prev: boolean) => !prev),
        [setValue]
    );
    const setTrue = useCallback(() => setValue(true), [setValue]);
    const setFalse = useCallback(() => setValue(false), [setValue]);

    return { value, setValue, setTrue, setFalse, toggle };
};

export { useBoolean };
