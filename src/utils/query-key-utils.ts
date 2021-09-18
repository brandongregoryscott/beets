import { QueryKey } from "react-query";

const storageProviderFilesKey = (): QueryKey => "storageProviderFiles";

const filesKey = (): QueryKey => "files";

export { filesKey, storageProviderFilesKey };
