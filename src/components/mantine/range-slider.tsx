import {
    RangeSlider as MantineRangeSlider,
    RangeSliderProps as MantineRangeSliderProps,
} from "@mantine/core";
import { Flex } from "components/flex";
import { majorScale, PaneProps, Label } from "evergreen-ui";
import { isEmpty } from "lodash";

interface RangeSliderProps
    extends Omit<PaneProps, "defaultValue" | "onChange" | "value">,
        Pick<
            MantineRangeSliderProps,
            | "defaultValue"
            | "label"
            | "max"
            | "min"
            | "minRange"
            | "onChange"
            | "onChangeEnd"
            | "value"
        > {}

const RangeSlider: React.FC<RangeSliderProps> = (props: RangeSliderProps) => {
    const {
        label,
        onChange,
        onChangeEnd,
        value,
        defaultValue,
        min,
        minRange,
        max,
        ...rest
    } = props;
    const renderLabel = !isEmpty(label);
    return (
        <Flex.Column width={majorScale(8)} {...rest}>
            {renderLabel && (
                <Label fontSize="x-small" textTransform="uppercase">
                    {label}
                </Label>
            )}
            <MantineRangeSlider
                defaultValue={defaultValue}
                max={max}
                min={min}
                minRange={minRange}
                onChange={onChange}
                onChangeEnd={onChangeEnd}
                radius="sm"
                size="sm"
                value={value}
            />
        </Flex.Column>
    );
};

export { RangeSlider };
