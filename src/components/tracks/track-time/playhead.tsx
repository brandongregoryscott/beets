import { majorScale, Pane } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import { useTracksState } from "utils/hooks/use-tracks-state";
import { css, keyframes } from "glamor";

interface PlayheadProps {
    bpm: number;
    isPlaying: boolean;
    stepCount: number;
}

const Playhead: React.FC<PlayheadProps> = (props: PlayheadProps) => {
    const { isPlaying, bpm, stepCount } = props;
    const { colors } = useTheme();
    const { state: tracks } = useTracksState();
    const animationClassName = keyframes("playhead", {
        "0%": {
            transform: "translate(0, 0)",
        },
        "100%": {
            transform: `translate(${isPlaying ? `${16 * 32}px` : 0}, 0);`,
        },
    });
    const className = css({
        animation: `${animationClassName} ${(16 / bpm) * 60}s infinite linear`,
    });
    console.log("animationClassName", animationClassName);
    return (
        <Pane
            backgroundColor={colors.gray900}
            className={className.toString()}
            height={tracks.count() * 96 + majorScale(1)}
            position="absolute"
            width={1}
        />
    );
};

export { Playhead };
