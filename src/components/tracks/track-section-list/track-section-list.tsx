import { TrackSectionCard } from "components/tracks/track-section-card/track-section-card";
import { useListFiles } from "hooks/domain/files/use-list-files";
import { useGetInstrument } from "hooks/domain/instruments/use-get-instrument";
import type { TrackRecord } from "models/track-record";
import { useMemo } from "react";
import React from "react";
import { isNotNilOrEmpty } from "utils/core-utils";
import { getStepCountOffset } from "utils/track-section-utils";
import { getFileById } from "utils/file-utils";
import { useTrackSectionsState } from "hooks/use-track-sections-state";

interface TrackSectionListProps {
    track: TrackRecord;
}

const TrackSectionList: React.FC<TrackSectionListProps> = (
    props: TrackSectionListProps
) => {
    const { track } = props;

    const { id, instrument_id } = track;
    const { state: trackSections, update: updateTrackSection } =
        useTrackSectionsState({ trackId: id });

    const { resultObject: files } = useListFiles();
    const { resultObject: instrument } = useGetInstrument({
        id: instrument_id!,
        enabled: isNotNilOrEmpty(instrument_id),
        files,
    });

    const instrumentFile = useMemo(
        () => getFileById(instrument?.file_id, files),
        [files, instrument]
    );

    return (
        <React.Fragment>
            {trackSections?.map((trackSection, index) => (
                <TrackSectionCard
                    file={instrumentFile}
                    instrument={instrument}
                    isFirst={index === 0}
                    isLast={index === trackSections.count() - 1}
                    key={trackSection.id}
                    onChange={updateTrackSection}
                    stepCountOffset={getStepCountOffset(trackSections, index)}
                    track={track}
                    trackSection={trackSection}
                />
            ))}
        </React.Fragment>
    );
};

export { TrackSectionList };
