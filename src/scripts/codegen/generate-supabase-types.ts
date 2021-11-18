import { log } from "./log";
import openapi from "openapi-typescript";
import { env } from "../../utils/env";
import { Project } from "ts-morph";
import { Paths } from "./constants/paths";
import upath from "upath";

const generateSupabaseTypes = async (project: Project) => {
    const filename = "supabase-types.ts";
    log.info(`Loading supabase types...`);

    const output = await openapi(
        `${env.REACT_APP_SUPABASE_URL}/rest/v1/?apikey=${env.REACT_APP_SUPABASE_ANON_KEY}`
    );

    const file = project.createSourceFile(
        upath.join(Paths.base, filename),
        output,
        {
            overwrite: true,
        }
    );

    log.info(`Writing ${filename}`);

    return file;
};

export { generateSupabaseTypes };
