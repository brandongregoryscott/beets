import { DateTime } from "luxon";
import { isNilOrEmpty } from "utils/collection-utils";

const formatUpdatedOn = (updated_on?: string): string =>
    isNilOrEmpty(updated_on)
        ? "--"
        : DateTime.fromISO(updated_on!).toLocaleString(
              DateTime.DATETIME_MED_WITH_WEEKDAY
          );

export { formatUpdatedOn };
