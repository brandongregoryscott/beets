import { Alert, Button, majorScale, Pane, BoxProps } from "evergreen-ui";
import React, { PropsWithChildren, useCallback, useRef, useState } from "react";

type ConfirmButtonProps<T extends React.ElementType<any> = typeof Button> =
    Omit<BoxProps<T>, "children"> & {
        alertDescription?: React.ReactNode | string;
        alertTitle?: React.ReactNode | string;
        /**
         * When provided, resets the confirmation state after the specified amount of time to force the
         * user to confirm again.
         */
        clearConfirmationAfterMs?: number;
        is?: T;
        onClick?: () => void;
        onConfirm?: () => void;
    };

const defaultProps: ConfirmButtonProps = {
    is: Button,
};

const ConfirmButton = <T extends React.ElementType<any> = typeof Button>(
    props: PropsWithChildren<ConfirmButtonProps<T>>
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
            <Pane
                {...restProps}
                appearance={isConfirmed ? "primary" : undefined}
                intent={intent}
                onClick={handleClick}
                type="button">
                {children}
            </Pane>
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

ConfirmButton.defaultProps = defaultProps;

export { ConfirmButton };
