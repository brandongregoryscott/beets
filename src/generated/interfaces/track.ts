interface Track {
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
    name: string;
    mute: boolean;
    solo: boolean;
    pan: number;
    /**
     * Note:
     * This is a Foreign Key to `projects.id`.<fk table='projects' column='id'/>
     */
    project_id: string;
}

export type { Track };
