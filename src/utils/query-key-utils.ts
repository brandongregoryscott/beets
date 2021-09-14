import { BucketName } from "enums/bucket-name";
import { QueryKey } from "react-query";

const filesByBucketKey = (bucketName: BucketName): QueryKey => [
    "storageProviderFiles",
    bucketName,
];

const filesKey = (): QueryKey => "files";

export { filesKey, filesByBucketKey };
