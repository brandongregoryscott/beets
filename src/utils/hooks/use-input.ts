import { ValueRequiredState } from "constants/validation-states";
import { ValidationState } from "interfaces/validation-state";
import { useCallback, useState } from "react";
import { isNilOrEmpty } from "utils/core-utils";

interface UseInputOptions {
    isRequired?: boolean;
    initialValue?: string;
}

interface useInputResult extends ValidationState {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setValidation: (validation?: ValidationState) => void;
    value?: string;
}

const useInput = (input?: UseInputOptions): useInputResult => {
    const { isRequired = false, initialValue } = input ?? {};
    const [validation, setValidation] = useState<ValidationState | undefined>();
    const [value, setValue] = useState<string | undefined>(initialValue);

    const handleValueChange = useCallback(
        (value?: string) => {
            setValidation(
                isRequired && isNilOrEmpty(value)
                    ? ValueRequiredState
                    : undefined
            );
            setValue(value);
        },
        [isRequired, setValidation, setValue]
    );

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            handleValueChange(event.target.value),
        [handleValueChange]
    );

    return {
        ...validation,
        onChange: handleChange,
        setValidation,
        value,
    };
};

export { useInput };
