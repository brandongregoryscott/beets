import { Flex } from "components/flex";
import type { DialogProps as EvergreenDialogProps } from "evergreen-ui";
import {
    CrossIcon,
    Dialog as EvergreenDialog,
    Heading,
    IconButton,
    majorScale,
    MaximizeIcon,
    MinimizeIcon,
} from "evergreen-ui";
import { isFunction } from "lodash";
import React, { useCallback } from "react";
import { attachEventSource } from "utils/event-utils";
import { useBoolean } from "hooks/use-boolean";

interface DialogProps extends Omit<EvergreenDialogProps, "isShown"> {
    allowFullscreen?: boolean;
    initialIsFullscreen?: boolean;
    onFullscreenClick?: () => void;
}

const defaultProps: Partial<DialogProps> = {
    contentContainerProps: {
        onClick: attachEventSource("Dialog"),
    },
    containerProps: {
        onClick: attachEventSource("Dialog"),
    },
    overlayProps: {
        onClick: attachEventSource("Dialog"),
    },
};

const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
    const {
        children,
        containerProps,
        allowFullscreen = false,
        header,
        hasHeader = true,
        initialIsFullscreen,
        onFullscreenClick,
        title,
        width,
        ...rest
    } = props;
    const { value: isFullscreen, toggle: toggleFullscreen } =
        useBoolean(initialIsFullscreen);

    const handleFullscreenClick = useCallback(() => {
        toggleFullscreen();
        onFullscreenClick?.();
    }, [onFullscreenClick, toggleFullscreen]);

    return (
        <EvergreenDialog
            {...rest}
            containerProps={
                allowFullscreen && isFullscreen
                    ? {
                          marginY: majorScale(2),
                          maxHeight: `calc(100% - ${majorScale(4)}px)`,
                          ...(containerProps ?? {}),
                      }
                    : containerProps
            }
            header={
                hasHeader
                    ? ({ close }) => (
                          <Flex.Row
                              alignItems="center"
                              marginLeft="auto"
                              width="100%">
                              {title != null && (
                                  <Heading flex={1} is="h4" size={600}>
                                      {title}
                                  </Heading>
                              )}
                              {isFunction(header) && header({ close })}
                              {header != null && !isFunction(header) && header}
                              {allowFullscreen && (
                                  <IconButton
                                      appearance="minimal"
                                      icon={
                                          isFullscreen
                                              ? MinimizeIcon
                                              : MaximizeIcon
                                      }
                                      marginLeft={majorScale(1)}
                                      onClick={handleFullscreenClick}
                                  />
                              )}
                              <IconButton
                                  appearance="minimal"
                                  icon={CrossIcon}
                                  marginLeft={majorScale(1)}
                                  onClick={close}
                              />
                          </Flex.Row>
                      )
                    : undefined
            }
            isShown={true}
            width={allowFullscreen && isFullscreen ? "100%" : width}>
            {children}
        </EvergreenDialog>
    );
};

Dialog.defaultProps = defaultProps;

export type { DialogProps };
export { Dialog };
