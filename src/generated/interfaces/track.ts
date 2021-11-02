interface Track {
    createdon?: string;
    createdbyid?: string;
    deletedon?: string;
    deletedbyid?: string;
    updatedon?: string;
    updatedbyid?: string;
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
