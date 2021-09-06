import { SequencerStep } from "components/sequencer-step";
import { Pane } from "evergreen-ui";
import _ from "lodash";
import { useState } from "react";
import { useTrackAtom } from "utils/hooks/use-track-atom";

interface SequencerProps {
    trackId: string;
}

const Sequencer: React.FC<SequencerProps> = (props: SequencerProps) => {
    const { trackId } = props;
    const {} = useTrackAtom(trackId);
    const [stepCount] = useState(16);
    return (
        <Pane
            marginX="auto"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center">
            {_.range(0, stepCount).map((step: number) => (
                <SequencerStep index={step} isChecked={true} onClick={_.noop} />
            ))}
        </Pane>
    );
};

export { Sequencer };
