import type { FormFieldProps as EvergreenFormFieldProps } from "evergreen-ui";
// eslint-disable-next-line no-restricted-imports
import { majorScale, FormField as EvergreenFormField } from "evergreen-ui";
import type { PropsWithChildren } from "react";

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
