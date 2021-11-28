import { Alert, Button, ButtonProps, majorScale } from "evergreen-ui";
import React, { PropsWithChildren, useCallback, useState } from "react";

interface ConfirmButtonProps extends Omit<ButtonProps, "onClick"> {
    alertDescription?: string | React.ReactNode;
    alertTitle?: string | React.ReactNode;
    onClick?: () => void;
    onConfirm?: () => void;
}

const ConfirmButton: React.FC<PropsWithChildren<ConfirmButtonProps>> = (
    props: PropsWithChildren<ConfirmButtonProps>
) => {
    const {
        alertDescription,
        alertTitle,
        children,
        intent,
        onClick,
        onConfirm,
        ...restProps
    } = props;
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const handleClick = useCallback(() => {
        if (isConfirmed) {
            onConfirm?.();
            return;
        }

        onClick?.();
        setIsConfirmed(true);
    }, [isConfirmed, onClick, onConfirm, setIsConfirmed]);
    return (
        <React.Fragment>
            <Button
                {...restProps}
                appearance={isConfirmed ? "primary" : undefined}
                intent={intent}
                onClick={handleClick}>
                {children}
            </Button>
            {(alertDescription != null || alertTitle != null) && isConfirmed && (
                <Alert
                    appearance="default"
                    intent={intent}
                    marginTop={majorScale(3)}
                    title={alertTitle}>
                    {alertDescription}
                </Alert>
            )}
        </React.Fragment>
    );
};

export { ConfirmButton };
