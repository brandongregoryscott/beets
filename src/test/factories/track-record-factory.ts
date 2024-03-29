import { faker } from "@faker-js/faker/locale/en";
import { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionRecordFactory } from "test/factories/track-section-record-factory";
import { BaseFactory } from "test/factories/base-factory";

interface BuildWithTrackSectionsOptions {
    count: number;
}

interface BuildWithTrackSectionsResult {
    track: TrackRecord;
    trackSections: TrackSectionRecord[];
}

interface BuildListWithTrackSectionsOptions {
    count: number;
    trackSectionCount: number;
}

interface BuildListWithTrackSectionsResult {
    tracks: TrackRecord[];
    trackSections: TrackSectionRecord[];
}

class TrackRecordFactory extends BaseFactory<TrackRecord> {
    buildWithTrackSections(
        options: BuildWithTrackSectionsOptions
    ): BuildWithTrackSectionsResult {
        const { count } = options;

        const track = this.build();
        const trackSections = TrackSectionRecordFactory.trackId(
            track.id
        ).buildList(count);

        return { track, trackSections };
    }

    buildListWithTrackSections(
        options: BuildListWithTrackSectionsOptions
    ): BuildListWithTrackSectionsResult {
        const { count, trackSectionCount } = options;

        const tracks = this.buildList(count);
        const trackSections = tracks.flatMap((track) =>
            TrackSectionRecordFactory.rewind()
                .trackId(track.id)
                .buildList(trackSectionCount)
        );

        return { tracks, trackSections };
    }

    projectId(projectId: string): this {
        return this.associations({ project_id: projectId });
    }
}

const TrackRecordFactorySingleton = new TrackRecordFactory(({ sequence }) => {
    return new TrackRecord({
        index: sequence - 1,
        name: `Track ${sequence + 1}`,
        project_id: faker.datatype.uuid(),
        id: faker.datatype.uuid(),
        // Factory-created Records need to be mutable for params/overrides to be set
        // Immutability is reset in the afterBuild hook
    }).asMutable();
});

export { TrackRecordFactorySingleton as TrackRecordFactory };
