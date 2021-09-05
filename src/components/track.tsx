import {
    Card,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    Paragraph,
    PropertiesIcon,
    PropertyIcon,
    RemoveIcon,
    VolumeOffIcon,
    VolumeUpIcon,
} from "evergreen-ui";
import { useBoolean } from "utils/hooks/use-boolean";
import { useTracksAtom } from "utils/hooks/use-tracks-atom";
import { Track as TrackInterface } from "interfaces/track";

interface TrackProps extends TrackInterface {
    index: number;
}

const Track: React.FC<TrackProps> = (props: TrackProps) => {
    const { id, name } = props;
    const { value: mute, toggle: toggleMute } = useBoolean(false);
    const { value: solo, toggle: toggleSolo } = useBoolean(false);
    const { removeById } = useTracksAtom();
    const remove = () => removeById(id);
    return (
        <Card
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            background="gray200"
            maxWidth="50%"
            margin={majorScale(1)}
            padding={majorScale(1)}>
            <Paragraph>{name}</Paragraph>
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
