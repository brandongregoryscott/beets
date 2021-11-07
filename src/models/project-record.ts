import { List, Record as ImmutableRecord } from "immutable";
import { isNilOrEmpty, makeDefaultValues } from "utils/core-utils";
import { BaseRecord } from "models/base-record";
import { Project } from "generated/interfaces/project";
import { AuditableRecord } from "models/auditable-record";
import { AuditableDefaultValues } from "constants/auditable-default-values";
import { TrackRecordV2 } from "models/track-record-v2";

interface NavigationProperties {
    tracks?: List<TrackRecordV2>;
}

const defaultValues = makeDefaultValues<Project>({
    ...AuditableDefaultValues,
    name: "",
});

class ProjectRecord
    extends AuditableRecord(BaseRecord(ImmutableRecord(defaultValues)))
    implements Project
{
    private tracks: List<TrackRecordV2>;

    constructor(values?: Partial<Project | ProjectRecord>) {
        values = values ?? defaultValues;

        if (values instanceof ProjectRecord) {
            values = values.toPOJO();
        }

        super(values);

        this.tracks = List([new TrackRecordV2()]);
    }

    public addTrack(track?: TrackRecordV2): ProjectRecord {
        const tracks = this.tracks.push(track ?? new TrackRecordV2());
        return new ProjectRecord(this).setTracks(tracks);
    }

    public getNavigationProperties(): Required<NavigationProperties> {
        return { tracks: this.tracks };
    }

    public getTrack(id: string): TrackRecordV2 | undefined {
        return this.tracks.find((track) => track.id === id);
    }

    public getTracks(): List<TrackRecordV2> {
        return this.tracks;
    }

    public isPersisted(): boolean {
        return !isNilOrEmpty(this.id);
    }

    public removeTrack(track: TrackRecordV2): ProjectRecord {
        const tracks = this.tracks.filterNot(
            (existingTrack) => existingTrack.id === track.id
        );

        return new ProjectRecord(this).setTracks(tracks);
    }

    public setTracks(tracks: List<TrackRecordV2>): ProjectRecord {
        this.tracks = tracks;
        return this;
    }

    public updateTrack(track: TrackRecordV2): ProjectRecord {
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
