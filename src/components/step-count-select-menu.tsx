import { SelectMenu, SelectMenuItem } from "components/select-menu/select-menu";
import { BoxProps, Button, majorScale } from "evergreen-ui";
import _ from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import pluralize from "pluralize";
import { useCallback } from "react";

interface StepCountSelectMenuProps extends Omit<BoxProps<"div">, "onChange"> {
    onChange: (stepCount: number) => void;
    stepCount: number;
}

const options: Array<SelectMenuItem<number>> = _.range(
    1,
    TrackSectionRecord.maxStepCount + 1
).map((stepCount: number) => ({
    label: `${stepCount} ${pluralize("steps", stepCount)}`,
    id: stepCount.toString(),
    value: stepCount,
}));

const StepCountSelectMenu: React.FC<StepCountSelectMenuProps> = (
    props: StepCountSelectMenuProps
) => {
    const { onChange, stepCount, ...boxProps } = props;
    const handleSelect = useCallback(
        (item: SelectMenuItem<number>) => onChange(item.value),
        [onChange]
    );

    return (
        <SelectMenu
            hasFilter={false}
            hasTitle={false}
            isMultiSelect={false}
            onSelect={handleSelect}
            options={options}
            selected={stepCount}
            width={majorScale(11)}>
            <Button {...boxProps}>
                {stepCount} {pluralize("Step", stepCount)}
            </Button>
        </SelectMenu>
    );
};

export { StepCountSelectMenu };
