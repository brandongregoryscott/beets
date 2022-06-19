import { Alert, Button, ButtonProps, majorScale } from "evergreen-ui";
import React, { PropsWithChildren, useCallback, useRef, useState } from "react";

interface ConfirmButtonProps extends Omit<ButtonProps, "onClick"> {
    alertDescription?: React.ReactNode | string;
    alertTitle?: React.ReactNode | string;
    /**
     * When provided, resets the confirmation state after the specified amount of time to force the
     * user to confirm again.
     */
    clearConfirmationAfterMs?: number;
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
        clearConfirmationAfterMs,
        ...restProps
    } = props;
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const confirmationTimeoutRef = useRef<NodeJS.Timeout | undefined>();

    const maybeClearConfirmationState = useCallback(() => {
        if (clearConfirmationAfterMs == null) {
            return;
        }

        confirmationTimeoutRef.current = setTimeout(
            () => setIsConfirmed(false),
            clearConfirmationAfterMs
        );
    }, [clearConfirmationAfterMs]);

    const resetConfirmationTimeout = useCallback(() => {
        if (
            clearConfirmationAfterMs == null ||
            confirmationTimeoutRef.current == null
        ) {
            return;
        }

        clearTimeout(confirmationTimeoutRef.current);
        confirmationTimeoutRef.current = setTimeout(
            () => setIsConfirmed(false),
            clearConfirmationAfterMs
        );
    }, [clearConfirmationAfterMs]);

    const handleClick = useCallback(() => {
        if (isConfirmed) {
            resetConfirmationTimeout();
            onConfirm?.();
            return;
        }

        onClick?.();
        setIsConfirmed(true);
        maybeClearConfirmationState();
    }, [
        isConfirmed,
        maybeClearConfirmationState,
        resetConfirmationTimeout,
        onClick,
        onConfirm,
    ]);

    return (
        <React.Fragment>
            <Button
                {...restProps}
                appearance={isConfirmed ? "primary" : undefined}
                intent={intent}
                onClick={handleClick}
                type="button">
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
