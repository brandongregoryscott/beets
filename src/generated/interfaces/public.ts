interface Public {
    Enums: {
        InstrumentCurve: "exponential" | "linear";
        tracktype: "instrument" | "sequencer";
    };
    Functions: {
        [_ in never]: never;
    };
    Tables: {
        files: {
            Insert: {
                bucket_id: string;
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                description?: string | null;
                id: string;
                name: string;
                path: string;
                size?: number | null;
                type: string;
                updated_by_id?: string | null;
                updated_on?: string | null;
            };
            Row: {
                bucket_id: string;
                created_by_id: string | null;
                created_on: string | null;
                deleted_by_id: string | null;
                deleted_on: string | null;
                description: string | null;
                id: string;
                name: string;
                path: string;
                size: number | null;
                type: string;
                updated_by_id: string | null;
                updated_on: string | null;
            };
            Update: {
                bucket_id?: string;
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                description?: string | null;
                id?: string;
                name?: string;
                path?: string;
                size?: number | null;
                type?: string;
                updated_by_id?: string | null;
                updated_on?: string | null;
            };
        };
        instruments: {
            Insert: {
                created_by_id?: string | null;
                created_on?: string | null;
                curve?: Database["public"]["Enums"]["InstrumentCurve"];
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                duration?: number | null;
                file_id: string;
                id?: string;
                name: string;
                release?: number | null;
                root_note?: string | null;
                updated_by_id?: string | null;
                updated_on?: string | null;
            };
            Row: {
                created_by_id: string | null;
                created_on: string | null;
                curve: Database["public"]["Enums"]["InstrumentCurve"];
                deleted_by_id: string | null;
                deleted_on: string | null;
                duration: number | null;
                file_id: string;
                id: string;
                name: string;
                release: number | null;
                root_note: string | null;
                updated_by_id: string | null;
                updated_on: string | null;
            };
            Update: {
                created_by_id?: string | null;
                created_on?: string | null;
                curve?: Database["public"]["Enums"]["InstrumentCurve"];
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                duration?: number | null;
                file_id?: string;
                id?: string;
                name?: string;
                release?: number | null;
                root_note?: string | null;
                updated_by_id?: string | null;
                updated_on?: string | null;
            };
        };
        pgmigrations: {
            Insert: {
                id?: number;
                name: string;
                run_on: string;
            };
            Row: {
                id: number;
                name: string;
                run_on: string;
            };
            Update: {
                id?: number;
                name?: string;
                run_on?: string;
            };
        };
        projects: {
            Insert: {
                bpm: number;
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                id?: string;
                name: string;
                swing?: number;
                updated_by_id?: string | null;
                updated_on?: string | null;
                volume?: number;
            };
            Row: {
                bpm: number;
                created_by_id: string | null;
                created_on: string | null;
                deleted_by_id: string | null;
                deleted_on: string | null;
                id: string;
                name: string;
                swing: number;
                updated_by_id: string | null;
                updated_on: string | null;
                volume: number;
            };
            Update: {
                bpm?: number;
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                id?: string;
                name?: string;
                swing?: number;
                updated_by_id?: string | null;
                updated_on?: string | null;
                volume?: number;
            };
        };
        track_section_steps: {
            Insert: {
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                file_id?: string | null;
                id?: string;
                index?: number;
                note?: string | null;
                track_section_id: string;
                updated_by_id?: string | null;
                updated_on?: string | null;
            };
            Row: {
                created_by_id: string | null;
                created_on: string | null;
                deleted_by_id: string | null;
                deleted_on: string | null;
                file_id: string | null;
                id: string;
                index: number;
                note: string | null;
                track_section_id: string;
                updated_by_id: string | null;
                updated_on: string | null;
            };
            Update: {
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                file_id?: string | null;
                id?: string;
                index?: number;
                note?: string | null;
                track_section_id?: string;
                updated_by_id?: string | null;
                updated_on?: string | null;
            };
        };
        track_sections: {
            Insert: {
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                id?: string;
                index?: number;
                step_count?: number;
                track_id: string;
                updated_by_id?: string | null;
                updated_on?: string | null;
            };
            Row: {
                created_by_id: string | null;
                created_on: string | null;
                deleted_by_id: string | null;
                deleted_on: string | null;
                id: string;
                index: number;
                step_count: number;
                track_id: string;
                updated_by_id: string | null;
                updated_on: string | null;
            };
            Update: {
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                id?: string;
                index?: number;
                step_count?: number;
                track_id?: string;
                updated_by_id?: string | null;
                updated_on?: string | null;
            };
        };
        tracks: {
            Insert: {
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                id?: string;
                index?: number;
                instrument_id?: string | null;
                mute?: boolean;
                name: string;
                pan?: number;
                project_id: string;
                solo?: boolean;
                updated_by_id?: string | null;
                updated_on?: string | null;
                volume?: number;
            };
            Row: {
                created_by_id: string | null;
                created_on: string | null;
                deleted_by_id: string | null;
                deleted_on: string | null;
                id: string;
                index: number;
                instrument_id: string | null;
                mute: boolean;
                name: string;
                pan: number;
                project_id: string;
                solo: boolean;
                updated_by_id: string | null;
                updated_on: string | null;
                volume: number;
            };
            Update: {
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                id?: string;
                index?: number;
                instrument_id?: string | null;
                mute?: boolean;
                name?: string;
                pan?: number;
                project_id?: string;
                solo?: boolean;
                updated_by_id?: string | null;
                updated_on?: string | null;
                volume?: number;
            };
        };
        users: {
            Insert: {
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                email: string;
                id: string;
                updated_by_id?: string | null;
                updated_on?: string | null;
            };
            Row: {
                created_by_id: string | null;
                created_on: string | null;
                deleted_by_id: string | null;
                deleted_on: string | null;
                email: string;
                id: string;
                updated_by_id: string | null;
                updated_on: string | null;
            };
            Update: {
                created_by_id?: string | null;
                created_on?: string | null;
                deleted_by_id?: string | null;
                deleted_on?: string | null;
                email?: string;
                id?: string;
                updated_by_id?: string | null;
                updated_on?: string | null;
            };
        };
    };
    Views: {
        [_ in never]: never;
    };
}

export type { Public };
