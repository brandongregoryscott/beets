import { TrackSectionCard } from "components/tracks/track-section-card/track-section-card";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import React, { SetStateAction } from "react";
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
