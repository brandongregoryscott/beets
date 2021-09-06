import { EditableParagraph } from "components/editable-paragraph";
import {
    Card,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    PropertiesIcon,
    PropertyIcon,
    RemoveIcon,
    VolumeOffIcon,
    VolumeUpIcon,
} from "evergreen-ui";
import { Track as TrackInterface } from "interfaces/track";
import { useTrackAtom } from "utils/hooks/use-track-atom";

interface TrackProps extends TrackInterface {
    index: number;
}

const Track: React.FC<TrackProps> = (props: TrackProps) => {
    const { id, name, mute, solo } = props;
    const { remove, setName, toggleMute, toggleSolo } = useTrackAtom(id);
    return (
        <Card
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            background="gray200"
            maxWidth="50%"
            marginY={majorScale(1)}
            padding={majorScale(1)}>
            <EditableParagraph onChange={setName} value={name} />
            <Pane display="flex" flexDirection="row">
                <IconButton
                    icon={mute ? VolumeOffIcon : VolumeUpIcon}
                    marginRight={minorScale(2)}
                    onClick={toggleMute}
                />
                <IconButton
                    icon={solo ? PropertyIcon : PropertiesIcon}
                    marginRight={minorScale(2)}
                    onClick={toggleSolo}
                />
                <IconButton
                    icon={RemoveIcon}
                    intent="danger"
                    marginRight={minorScale(2)}
                    onClick={remove}
                />
            </Pane>
        </Card>
    );
};

export { Track };
export type { TrackProps };
