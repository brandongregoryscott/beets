import { log } from "./log";
import openapi from "openapi-typescript";
import { env } from "../../utils/env";
import { BASE_PATH } from "./constants";
import { Project } from "ts-morph";

const generateSupabase = async (project: Project) => {
    const filename = "supabase.ts";
    log.info(`Loading supabase types...`);

    const output = await openapi(
        `${env.REACT_APP_SUPABASE_URL}/rest/v1/?apikey=${env.REACT_APP_SUPABASE_ANON_KEY}`
    );

    const file = project.createSourceFile(`${BASE_PATH}/${filename}`, output, {
        overwrite: true,
    });

    log.info(`Writing ${filename}`);

    return file;
};

export { generateSupabase };
