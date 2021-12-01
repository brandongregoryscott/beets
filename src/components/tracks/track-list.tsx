import {
    Pane,
    IconButton,
    PlusIcon,
    minorScale,
    Tooltip,
    majorScale,
} from "evergreen-ui";
import { TrackCard } from "components/tracks/track-card";
import { useCallback } from "react";
import { useTracksState } from "utils/hooks/use-tracks-state";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";
import { SelectMenuItem, SelectMenu } from "components/select-menu";
import { TrackType } from "generated/enums/track-type";
import { TrackRecord } from "models/track-record";
import { useProjectState } from "utils/hooks/use-project-state";

interface TrackListProps {}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { state: project } = useProjectState();
    const { state: tracks, add } = useTracksState();
    const { onStepPlay } = useReactronicaState();
    const options: Array<SelectMenuItem<TrackType>> = Object.entries(
        TrackType
    ).map(([label, value]) => ({
        id: value,
        label,
        value,
    }));

    const handleSelect = useCallback(
        (item: SelectMenuItem<TrackType>) =>
            add(
                new TrackRecord().merge({
                    index: tracks.count(),
                    project_id: project.id,
                    type: item.value,
                })
            ),
        [add, project, tracks]
    );
    return (
        <Pane>
            <Pane display="flex" flexDirection="column">
                {tracks.map((track) => (
                    <TrackCard
                        key={track.id}
                        onStepPlay={onStepPlay}
                        track={track}
                    />
                ))}
            </Pane>
            <Pane display="flex" flexDirection="row" marginRight="auto">
                <Tooltip content="Add Track">
                    <SelectMenu
                        closeOnSelect={true}
                        hasFilter={false}
                        height={108}
                        width={majorScale(16)}
                        isMultiSelect={false}
                        onSelect={handleSelect}
                        options={options}
                        title="Track Type">
                        <IconButton icon={PlusIcon} marginTop={minorScale(2)} />
                    </SelectMenu>
                </Tooltip>
            </Pane>
        </Pane>
    );
};

export { TrackList };
