import { QueryKey } from "react-query";

const filesKey = (): QueryKey => "files";

const projectsKey = (): QueryKey => "projects";

const storageProviderFilesKey = (): QueryKey => "storageProviderFiles";

export { filesKey, projectsKey, storageProviderFilesKey };
