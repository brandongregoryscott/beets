import { DataAttributes } from "constants/data-attributes";
import { Map } from "immutable";
import { isEmpty, get } from "lodash";

const toDataAttributes = (
    values?: Partial<Record<keyof typeof DataAttributes, number | string>>
): Record<string, unknown> => {
    let props: Map<string, unknown> = Map();

    if (isEmpty(values)) {
        return props.toJS();
    }

    Object.entries(values!).forEach(([key, value]) => {
        if (value == null) {
            return;
        }

        // Get mapped data-attribute key
        props = props.set(get(DataAttributes, key), value);
    });

    return props.toJS();
};

export { toDataAttributes };
