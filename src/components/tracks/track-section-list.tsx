import { TrackSectionCard } from "components/tracks/track-section-card";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import React, { SetStateAction } from "react";
import { getStepCountOffset } from "utils/track-section-utils";

interface TrackSectionListProps {
    instrumentFile?: FileRecord;
    onChange: (id: string, update: SetStateAction<TrackSectionRecord>) => void;
    track: TrackRecord;
    trackSections?: List<TrackSectionRecord>;
}

const TrackSectionList: React.FC<TrackSectionListProps> = (
    props: TrackSectionListProps
) => {
    const { track, instrumentFile, trackSections, onChange } = props;
    return (
        <React.Fragment>
            {trackSections?.map((trackSection, index) => (
                <TrackSectionCard
                    file={instrumentFile}
                    isFirst={index === 0}
                    isLast={index === trackSections.count() - 1}
                    key={trackSection.id}
                    onChange={onChange}
                    stepCountOffset={getStepCountOffset(trackSections, index)}
                    track={track}
                    trackSection={trackSection}
                />
            ))}
        </React.Fragment>
    );
};

export { TrackSectionList };
