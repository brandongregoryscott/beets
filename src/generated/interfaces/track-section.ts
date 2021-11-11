interface TrackSection {
    created_on?: string;
    created_by_id?: string;
    deleted_on?: string;
    deleted_by_id?: string;
    updated_on?: string;
    updated_by_id?: string;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    index: number;
    step_count: number;
    /**
     * Note:
     * This is a Foreign Key to `tracks.id`.<fk table='tracks' column='id'/>
     */
    track_id: string;
}

export type { TrackSection };
