import { ValueRequiredState } from "constants/validation-states";
import { ValidationState } from "interfaces/validation-state";
import { useCallback, useState } from "react";

interface UseNumberInputOptions {
    allowFloating?: boolean;
    isRequired?: boolean;
    initialValue?: number;
}

interface UseNumberInputResult extends ValidationState {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: number;
}

const useNumberInput = (
    input?: UseNumberInputOptions
): UseNumberInputResult => {
    const {
        allowFloating = false,
        isRequired = false,
        initialValue,
    } = input ?? {};
    const [validation, setValidation] = useState<ValidationState | undefined>();
    const [value, setValue] = useState<number | undefined>(initialValue);

    const parseNumber = useCallback(
        (value: string) =>
            allowFloating ? parseFloat(value) : parseInt(value),
        [allowFloating]
    );

    const handleValueChange = useCallback(
        (value?: number) => {
            if (isRequired && value == null) {
                setValidation(ValueRequiredState);
            }

            setValue(value);
        },
        [isRequired, setValidation, setValue]
    );

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value: rawValue } = event.target;
            const parsedValue = parseNumber(rawValue);
            handleValueChange(isNaN(parsedValue) ? undefined : parsedValue);
        },
        [handleValueChange, parseNumber]
    );

    return {
        ...validation,
        onChange: handleChange,
        value,
    };
};

export { useNumberInput };
