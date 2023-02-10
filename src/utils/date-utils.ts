import { isNilOrEmpty } from "utils/collection-utils";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import getMonth from "date-fns/getMonth";

const formatUpdatedOn = (updated_on?: string): string =>
    isNilOrEmpty(updated_on)
        ? "--"
        : format(parseISO(updated_on), "E, d LLL u, p");

const getCurrentTime = () => new Date().toISOString();

const isJanuaryOrDecember = (): boolean => {
    const currentMonth = getMonth(new Date());

    // Months in the Date constructor are index-based
    const december = getMonth(new Date(2023, 11, 1));
    const january = getMonth(new Date(2023, 0, 1));

    return currentMonth === december || currentMonth === january;
};

export { formatUpdatedOn, getCurrentTime, isJanuaryOrDecember };
