import { List } from "immutable";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";

const TrackUtils = {
    getByProject(
        project: ProjectRecord,
        tracks: List<TrackRecord>
    ): List<TrackRecord> {
        return tracks.filter((track) => track.project_id === project.id);
    },
};

export { TrackUtils };
