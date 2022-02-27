import { MimeType } from "enums/mime-type";
import { findKey } from "lodash";

const getExtension = (mimeType: MimeType): string | undefined => {
    const key = findKey(
        MimeType,
        (existingMimeType) => existingMimeType === mimeType
    );

    if (key == null) {
        return undefined;
    }

    return `.${key}`.toLowerCase();
};

export { getExtension };
