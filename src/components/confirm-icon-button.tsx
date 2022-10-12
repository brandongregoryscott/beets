import { ConfirmationDialog } from "components/confirmation-dialog";
import { IconButton } from "components/icon-button";
import type { IconButtonProps as EvergreenIconButtonProps } from "evergreen-ui";
import type { ForwardedRef } from "react";
import React, { forwardRef, useCallback, useState } from "react";

interface ConfirmIconButtonProps extends EvergreenIconButtonProps {
    confirmationDescription?: string;
    confirmationTitle?: string;
    onClick?: () => void;
}

const ConfirmIconButton: React.FC<ConfirmIconButtonProps> = forwardRef(
    (props: ConfirmIconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const { confirmationDescription, confirmationTitle, onClick, ...rest } =
            props;

        const [isConfirming, setIsConfirming] = useState<boolean>(false);

        const handleConfirmation = useCallback(
            (close: () => void) => {
                onClick?.();
                close();
            },
            [onClick]
        );

        return (
            <React.Fragment>
                <IconButton
                    onClick={() => setIsConfirming(true)}
                    ref={ref}
                    {...rest}
                />
                {isConfirming &&
                    confirmationDescription != null &&
                    confirmationTitle != null && (
                        <ConfirmationDialog
                            alertDescription={confirmationDescription}
                            alertTitle={confirmationTitle}
                            onCloseComplete={() => setIsConfirming(false)}
                            onConfirm={handleConfirmation}
                        />
                    )}
            </React.Fragment>
        );
    }
);

export { ConfirmIconButton };
