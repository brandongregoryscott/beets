import { Form } from "components/forms/form";
import { majorScale, TextInputField } from "evergreen-ui";
import { useInput } from "utils/hooks/use-input";

interface ResetPasswordFormProps {}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (
    props: ResetPasswordFormProps
) => {
    const {
        value: email,
        onChange: handleEmailChange,
        ...emailValidation
    } = useInput({ isRequired: true });

    return (
        <Form display="flex" flexDirection="column" width={majorScale(30)}>
            <TextInputField
                {...emailValidation}
                label="Email"
                onChange={handleEmailChange}
                value={email}
            />
        </Form>
    );
};

export { ResetPasswordForm };
