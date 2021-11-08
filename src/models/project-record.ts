import { List, Record as ImmutableRecord } from "immutable";
import { isNilOrEmpty, makeDefaultValues } from "utils/core-utils";
import { BaseRecord } from "models/base-record";
import { Project } from "generated/interfaces/project";
import { AuditableRecord } from "models/auditable-record";
import { AuditableDefaultValues } from "constants/auditable-default-values";
import { TrackRecord } from "models/track-record";

interface NavigationProperties {
    tracks?: List<TrackRecord>;
}

const defaultValues = makeDefaultValues<Project>({
    ...AuditableDefaultValues,
    name: "",
});

class ProjectRecord
    extends AuditableRecord(BaseRecord(ImmutableRecord(defaultValues)))
    implements Project
{
    private tracks: List<TrackRecord>;

    constructor(values?: Partial<Project | ProjectRecord>) {
        values = values ?? defaultValues;

        if (values instanceof ProjectRecord) {
            values = values.toPOJO();
        }

        super(values);

        this.tracks = List([new TrackRecord()]);
    }

    public addTrack(track?: TrackRecord): ProjectRecord {
        const tracks = this.tracks.push(track ?? new TrackRecord());
        return new ProjectRecord(this).setTracks(tracks);
    }

    public getNavigationProperties(): Required<NavigationProperties> {
        return { tracks: this.tracks };
    }

    public getTrack(id: string): TrackRecord | undefined {
        return this.tracks.find((track) => track.id === id);
    }

    public getTracks(): List<TrackRecord> {
        return this.tracks;
    }

    public isPersisted(): boolean {
        return !isNilOrEmpty(this.id);
    }

    public removeTrack(track: TrackRecord): ProjectRecord {
        const tracks = this.tracks.filterNot(
            (existingTrack) => existingTrack.id === track.id
        );

        return new ProjectRecord(this).setTracks(tracks);
    }

    public setTracks(tracks: List<TrackRecord> | TrackRecord[]): ProjectRecord {
        this.tracks = (List.isList(tracks) ? tracks : List(tracks)).filter(
            (track) =>
                isNilOrEmpty(track.project_id) || track.project_id === this.id
        );
        return this;
    }

    public updateTrack(track: TrackRecord): ProjectRecord {
        const existingTrack = this.getTrack(track.id);
        if (existingTrack == null) {
            return this;
        }

        const index = this.tracks.indexOf(existingTrack);
        if (index < 0) {
            return this;
        }

        const tracks = this.tracks.set(index, track);
        return new ProjectRecord(this).setTracks(tracks);
    }
}

export { ProjectRecord };
