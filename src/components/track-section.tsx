import { Card, majorScale } from "evergreen-ui";
import { TrackSectionRecord } from "models/track-section-record";
import { useTheme } from "utils/hooks/use-theme";

interface TrackSectionProps {
    section: TrackSectionRecord;
}

const TrackSection: React.FC<TrackSectionProps> = (
    props: TrackSectionProps
) => {
    const theme = useTheme();
    return (
        <Card
            backgroundColor={theme.colors.gray200}
            alignItems="flex-start"
            marginX={majorScale(1)}
            padding={majorScale(1)}
            height={majorScale(10)}
            width={majorScale(21)}
        />
    );
};

export { TrackSection };
