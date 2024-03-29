import { ValueRequiredState } from "constants/validation-states";
import type { ValidationState } from "interfaces/validation-state";
import { useCallback, useState } from "react";
import { isNilOrEmpty } from "utils/core-utils";

interface UseInputOptions {
    initialValue?: string;
    isRequired?: boolean;
}

interface useInputResult {
    onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    setValidation: (validation?: ValidationState) => void;
    setValueRequiredState: () => void;
    validation: ValidationState;
    value?: string;
}

const useInput = (input?: UseInputOptions): useInputResult => {
    const { isRequired = false, initialValue = "" } = input ?? {};
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
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleValueChange(event.target.value),
        [handleValueChange]
    );

    const setValueRequiredState = useCallback(
        () => setValidation(ValueRequiredState),
        []
    );

    return {
        validation: validation ?? {},
        onChange: handleChange,
        setValidation,
        setValueRequiredState,
        value,
    };
};

export { useInput };
