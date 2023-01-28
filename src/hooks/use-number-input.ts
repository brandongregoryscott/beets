import { ValueRequiredState } from "constants/validation-states";
import type { ValidationState } from "interfaces/validation-state";
import { isEmpty } from "lodash";
import { useCallback, useState } from "react";

interface UseNumberInputOptions {
    allowFloating?: boolean;
    initialValue?: number;
    isRequired?: boolean;
    max?: number;
    min?: number;
}

interface UseNumberInputResult {
    displayValue?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setValidation?: (validation?: ValidationState) => void;
    validation: ValidationState;
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
    const [displayValue, setDisplayValue] = useState<string | undefined>(
        initialValue?.toString() ?? ""
    );
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
        [isRequired, max, min, setValidation, setValue]
    );

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value: rawValue } = event.target;
            const parsedValue = parseNumber(rawValue);

            if (isEmpty(rawValue)) {
                setDisplayValue(rawValue);
                handleValueChange(undefined);
                return;
            }

            if (!rawValue.match(/[0-9-.]+/)) {
                return;
            }

            const isPartialDecimal = rawValue.endsWith(".");
            const isPartialNegative = rawValue === "-";
            if (isPartialDecimal || isPartialNegative) {
                setDisplayValue(rawValue);
                return;
            }

            setDisplayValue(rawValue);
            handleValueChange(isNaN(parsedValue) ? undefined : parsedValue);
        },
        [handleValueChange, parseNumber]
    );

    return {
        validation: validation ?? {},
        displayValue,
        onChange: handleChange,
        setValidation,
        value,
    };
};

const getValidationState = (
    value: number | undefined,
    options: Pick<UseNumberInputOptions, "isRequired" | "max" | "min">
): ValidationState | undefined => {
    const { isRequired = false, min, max } = options;
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
