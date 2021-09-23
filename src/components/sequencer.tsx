import { SequencerStep } from "components/sequencer-step";
import { Pane } from "evergreen-ui";
import _ from "lodash";
import { useTrackAtom } from "utils/hooks/use-track-atom";
import { List } from "immutable";

interface SequencerProps {
    onChange: (index: number) => void;
    trackId: string;
    value: List<string | null>;
}

const Sequencer: React.FC<SequencerProps> = (props: SequencerProps) => {
    const { onChange, trackId, value } = props;
    useTrackAtom(trackId);
    return (
        <Pane
            marginX="auto"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center">
            {_.range(0, value.count()).map((step: number) => (
                <SequencerStep
                    key={step}
                    index={step}
                    isChecked={value.get(step) != null}
                    onClick={onChange}
                />
            ))}
        </Pane>
    );
};

export { Sequencer };
