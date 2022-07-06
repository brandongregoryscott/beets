import { Slider as MantineSlider } from "@mantine/core";
import { Flex } from "components/flex";
import type { PaneProps } from "evergreen-ui";
import { majorScale, Label } from "evergreen-ui";
import { isEmpty } from "lodash";

interface SliderProps extends Omit<PaneProps, "onChange" | "value"> {
    defaultValue?: number;
    label?: string;
    max?: number;
    min?: number;
    onChange?: (value: number) => void;
    onChangeEnd?: (value: number) => void;
    value?: number;
}

const defaultDefaultValue = 0;
const defaultMax = 12;
const defaultMin = -12;

const Slider: React.FC<SliderProps> = (props: SliderProps) => {
    const {
        label,
        onChange,
        onChangeEnd,
        value,
        defaultValue = defaultDefaultValue,
        min = defaultMin,
        max = defaultMax,
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
            <MantineSlider
                defaultValue={defaultValue}
                max={max}
                min={min}
                onChange={onChange}
                onChangeEnd={onChangeEnd}
                radius="sm"
                size="sm"
                value={value}
            />
        </Flex.Column>
    );
};

export { Slider };
