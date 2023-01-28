import { Menu } from "components/menu/menu";
import {
    AnnotationIcon,
    Button,
    DocumentIcon,
    HelpIcon,
    InfoSignIcon,
    Popover,
    Position,
    SquareIcon,
} from "evergreen-ui";
import React, { useCallback } from "react";
import { useDialog } from "hooks/use-dialog";
import { DocumentationDialog } from "components/sidebar/documentation-dialog/documentation-dialog";
import { AboutDialog } from "components/sidebar/about-dialog";

const HelpTab: React.FC = () => {
    const [isAboutDialogOpen, handleOpenAboutDialog, handleCloseAboutDialog] =
        useDialog();
    const [
        isDocumentationDialogOpen,
        handleOpenDocumentationDialog,
        handleCloseDocumentationDialog,
    ] = useDialog();

    const handleClick = useCallback(
        (closePopover: () => void, callback: () => void) => () => {
            callback();
            closePopover();
        },
        []
    );

    return (
        <React.Fragment>
            <Popover
                content={({ close: closePopover }) => (
                    <Menu>
                        <Menu.Item
                            icon={InfoSignIcon}
                            onClick={handleClick(
                                closePopover,
                                handleOpenAboutDialog
                            )}>
                            About
                        </Menu.Item>
                        <Menu.Item
                            icon={DocumentIcon}
                            onClick={handleClick(
                                closePopover,
                                handleOpenDocumentationDialog
                            )}>
                            Documentation
                        </Menu.Item>
                    </Menu>
                )}
                position={Position.TOP_RIGHT}>
                <Button
                    appearance="tab"
                    iconBefore={<HelpIcon />}
                    intent="none">
                    Help
                </Button>
            </Popover>
            {isAboutDialogOpen && (
                <AboutDialog onCloseComplete={handleCloseAboutDialog} />
            )}
            {isDocumentationDialogOpen && (
                <DocumentationDialog
                    onCloseComplete={handleCloseDocumentationDialog}
                />
            )}
        </React.Fragment>
    );
};

export { HelpTab };
