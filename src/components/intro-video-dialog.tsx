import type { DialogProps } from "components/dialog";
import { Dialog } from "components/dialog";
import React from "react";
import Box from "ui-box";

interface IntroVideoDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const IntroVideoDialog: React.FC<IntroVideoDialogProps> = (
    props: IntroVideoDialogProps
) => {
    const { onCloseComplete } = props;
    return (
        <Dialog
            confirmLabel="Done"
            hasCancel={false}
            onCloseComplete={onCloseComplete}
            title="Introduction">
            <Box
                controls={true}
                height="100%"
                is="video"
                src="https://user-images.githubusercontent.com/11774799/163682665-69db80cf-22ba-44be-87bd-ad27e24138fd.mp4"
                width="100%"
            />
        </Dialog>
    );
};

export { IntroVideoDialog };
