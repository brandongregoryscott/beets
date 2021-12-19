import {
    majorScale,
    FormField as EvergreenFormField,
    FormFieldProps as EvergreenFormFieldProps,
} from "evergreen-ui";
import { PropsWithChildren } from "react";

interface FormFieldProps extends EvergreenFormFieldProps {}

const FormField: React.FC<PropsWithChildren<FormFieldProps>> = (
    props: PropsWithChildren<FormFieldProps>
) => {
    const { children } = props;
    return (
        <EvergreenFormField {...props} marginBottom={majorScale(3)}>
            {children}
        </EvergreenFormField>
    );
};

export { FormField };
