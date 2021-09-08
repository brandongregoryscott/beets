import { BucketName } from "enums/bucket-name";
import { QueryKey } from "react-query";

const QueryKeyUtils = {
    listFilesByBucket(bucketName: BucketName): QueryKey {
        return ["files", bucketName];
    },
};

export { QueryKeyUtils };
