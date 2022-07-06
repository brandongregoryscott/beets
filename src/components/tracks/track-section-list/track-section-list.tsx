import { TrackSectionCard } from "components/tracks/track-section-card/track-section-card";
import type { List } from "immutable";
import type { FileRecord } from "models/file-record";
import type { InstrumentRecord } from "models/instrument-record";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { SetStateAction } from "react";
import React from "react";
import { getStepCountOffset } from "utils/track-section-utils";

interface TrackSectionListProps {
    instrument?: InstrumentRecord;
    instrumentFile?: FileRecord;
    onChange: (id: string, update: SetStateAction<TrackSectionRecord>) => void;
    track: TrackRecord;
    trackSections?: List<TrackSectionRecord>;
}

const TrackSectionList: React.FC<TrackSectionListProps> = (
    props: TrackSectionListProps
) => {
    const { track, instrument, instrumentFile, trackSections, onChange } =
        props;
    return (
        <React.Fragment>
            {trackSections?.map((trackSection, index) => (
                <TrackSectionCard
                    file={instrumentFile}
                    instrument={instrument}
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
