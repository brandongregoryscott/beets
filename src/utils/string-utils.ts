import { isEmpty } from "lodash";

const format = (value: string, ...args: any[]) => {
    while (!isEmpty(args)) {
        value = value.replace("%s", args.shift());
    }

    return value;
};

export { format };
