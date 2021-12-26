import { majorScale, TextInput } from "evergreen-ui";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { useOutsideClick, useKey } from "rooks";

interface EditableParagraphProps {
    onChange?: (newValue: string) => void;
    value: string;
}

const EditableParagraph: React.FC<EditableParagraphProps> = (
    props: EditableParagraphProps
) => {
    const { onChange, value } = props;
    const {
        value: isEditing,
        setFalse: setIsEditingFalse,
        setTrue: setIsEditingTrue,
    } = useBoolean(false);
    const [initialValue, setInitialValue] = useState(value);
    const textInputRef = useRef<HTMLInputElement>(null);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(event.target.value),
        [onChange]
    );

    const cancelEditing = useCallback(() => {
        onChange?.(initialValue);
        setIsEditingFalse();
    }, [initialValue, onChange, setIsEditingFalse]);

    const startEditing = useCallback(() => {
        setInitialValue(value);
        setIsEditingTrue();
    }, [setInitialValue, setIsEditingTrue, value]);

    const stopEditingOrDefault = useCallback(() => {
        if (value == null || value.trim().length === 0) {
            onChange?.(initialValue);
        }

        setIsEditingFalse();
    }, [initialValue, onChange, setIsEditingFalse, value]);

    useOutsideClick(textInputRef, stopEditingOrDefault);
    useKey(["Enter"], stopEditingOrDefault, { target: textInputRef });
    useKey(["Escape"], cancelEditing, { target: textInputRef });

    useEffect(() => {
        if (isEditing) {
            textInputRef.current?.focus();
            return;
        }

        textInputRef.current?.blur();
    }, [isEditing, textInputRef]);

    const appearance = isEditing
        ? "editableParagraphEditing"
        : "editableParagraph";

    return (
        <TextInput
            appearance={appearance as any}
            marginBottom={majorScale(1)}
            maxWidth={majorScale(14)}
            onBlur={stopEditingOrDefault}
            onChange={handleChange}
            onFocus={startEditing}
            ref={textInputRef}
            value={value}
        />
    );
};

export { EditableParagraph };
