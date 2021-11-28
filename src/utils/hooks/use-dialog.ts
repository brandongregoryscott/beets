import { useCallback, useState } from "react";

const useDialog = (): [
    isOpen: boolean,
    handleOpen: () => void,
    handleClose: () => void,
    handleToggle: () => void
] => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
    const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);
    const handleToggle = useCallback(
        () => setIsOpen((prev) => !prev),
        [setIsOpen]
    );

    return [isOpen, handleOpen, handleClose, handleToggle];
};

export { useDialog };
