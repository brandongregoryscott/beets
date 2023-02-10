import { log } from "./log";
import openapi from "openapi-typescript";
import { env } from "../../utils/env";
import { Project } from "ts-morph";
import { Paths } from "./constants/paths";
import { joinPaths } from "./utils";

interface GenerateSupabaseTypesOptions {
    /**
     * Skips attempting to load OpenAPI types in favor of existing file
     */
    useExistingFile?: boolean;
}

const generateSupabaseTypes = async (
    project: Project,
    options?: GenerateSupabaseTypesOptions
) => {
    const { useExistingFile = false } = options ?? {};
    const filename = "supabase-types.ts";
    log.info(`Loading supabase types...`);

    if (useExistingFile) {
        return project.addSourceFileAtPath(joinPaths(Paths.base, filename));
    }

    log.info("REACT_APP_SUPABASE_URL", env.REACT_APP_SUPABASE_URL);
    log.info("REACT_APP_SUPABASE_ANON_KEY", env.REACT_APP_SUPABASE_ANON_KEY);

    const output = await openapi(
        `${env.REACT_APP_SUPABASE_URL}/rest/v1/?apikey=${env.REACT_APP_SUPABASE_ANON_KEY}`
    );

    const file = project.createSourceFile(
        joinPaths(Paths.base, filename),
        output,
        {
            overwrite: true,
        }
    );

    log.info(`Writing ${filename}`);

    return file;
};

export { generateSupabaseTypes };
