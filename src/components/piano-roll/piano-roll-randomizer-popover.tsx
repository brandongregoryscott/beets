import { IconButton } from "components/icon-button";
import {
    PianoRollRandomizer,
    PianoRollRandomizerSettings,
} from "components/piano-roll/piano-roll-randomizer";
import {
    BoxProps,
    Button,
    CogIcon,
    Group,
    Popover,
    RandomIcon,
} from "evergreen-ui";

interface PianoRollRandomizerPopoverProps extends BoxProps<"div"> {
    settings?: PianoRollRandomizerSettings;
    stepCount: number;
}

const localStorageKey = "pianoRollRandomizerSettings";

const PianoRollRandomizerPopover: React.FC<PianoRollRandomizerPopoverProps> = (
    props: PianoRollRandomizerPopoverProps
) => {
    const { settings, stepCount, ...boxProps } = props;
    return (
        <Group {...boxProps}>
            <Popover
                content={({ close }) => (
                    <PianoRollRandomizer
                        close={close}
                        settings={settings}
                        stepCount={stepCount}
                    />
                )}
                shouldCloseOnExternalClick={false}>
                <IconButton icon={CogIcon} />
            </Popover>
            <Button iconBefore={RandomIcon}>Randomize</Button>
        </Group>
    );
};

export { PianoRollRandomizerPopover };
