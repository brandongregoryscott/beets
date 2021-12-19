import { ValueRequiredState } from "constants/validation-states";
import { ValidationState } from "interfaces/validation-state";
import { useCallback, useState } from "react";

interface UseNumberInputOptions {
    allowFloating?: boolean;
    isRequired?: boolean;
    initialValue?: number;
    min?: number;
    max?: number;
}

interface UseNumberInputResult extends ValidationState {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setValidation: (validation?: ValidationState) => void;
    value?: number;
}

const useNumberInput = (
    options?: UseNumberInputOptions
): UseNumberInputResult => {
    const {
        allowFloating = false,
        isRequired = false,
        initialValue,
        min,
        max,
    } = options ?? {};
    const [validation, setValidation] = useState<ValidationState | undefined>();
    const [value, setValue] = useState<number | undefined>(initialValue);

    const parseNumber = useCallback(
        (value: string) =>
            allowFloating ? parseFloat(value) : parseInt(value),
        [allowFloating]
    );

    const handleValueChange = useCallback(
        (value?: number) => {
            setValidation(getValidationState(value, { min, max, isRequired }));
            setValue(value);
        },
        [isRequired, min, max, setValidation, setValue]
    );

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value: rawValue } = event.target;
            if (rawValue === "-") {
                handleValueChange(-1);
                return;
            }
            const parsedValue = parseNumber(rawValue);
            handleValueChange(isNaN(parsedValue) ? undefined : parsedValue);
        },
        [handleValueChange, parseNumber]
    );

    return {
        ...validation,
        onChange: handleChange,
        setValidation,
        value,
    };
};

const getValidationState = (
    value: number | undefined,
    options: Pick<UseNumberInputOptions, "isRequired" | "min" | "max">
): ValidationState | undefined => {
    const { isRequired, min, max } = options;
    if (isRequired && value == null) {
        return ValueRequiredState;
    }

    const hasMin = min != null;
    const hasMax = max != null;
    const isLessThanMin = min != null && value != null && value < min;
    const isGreaterThanMax = max != null && value != null && value > max;

    if (hasMin && hasMax && (isLessThanMin || isGreaterThanMax)) {
        return {
            isInvalid: true,
            validationMessage: `Value must be between ${min} and ${max}.`,
        };
    }

    if (hasMin && isLessThanMin) {
        return {
            isInvalid: true,
            validationMessage: `Value must be greater than ${min}.`,
        };
    }

    if (hasMax && isGreaterThanMax) {
        return {
            isInvalid: true,
            validationMessage: `Value must be less than ${max}.`,
        };
    }

    return undefined;
};

export { useNumberInput };
