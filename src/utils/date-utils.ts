import { DateTime } from "luxon";
import { isNilOrEmpty } from "utils/core-utils";

const formatUpdatedOn = (updatedon?: string): string =>
    isNilOrEmpty(updatedon)
        ? "--"
        : DateTime.fromISO(updatedon!).toLocaleString(
              DateTime.DATETIME_MED_WITH_WEEKDAY
          );

export { formatUpdatedOn };
