import type { DialogProps } from "components/dialog";
import { Dialog } from "components/dialog";
import { Checkbox, SelectField, TextareaField, toaster } from "evergreen-ui";
import { useBoolean } from "hooks/use-boolean";
import { useCurrentUser } from "hooks/use-current-user";
import { useGlobalState } from "hooks/use-global-state";
import { useInput } from "hooks/use-input";
import { isEmpty } from "lodash";
import { useCallback, useState } from "react";
import { trackFeedbackSubmitted } from "utils/analytics-utils";

interface FeedbackDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

enum FeedbackCategory {
    General = "General",
    Idea = "Idea",
    Question = "Question",
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = (
    props: FeedbackDialogProps
) => {
    const { onCloseComplete } = props;
    const { isAuthenticated } = useGlobalState();
    const { user } = useCurrentUser();
    const {
        value: feedback,
        setValueRequiredState,
        onChange: handleFeedbackChange,
        validation: feedbackValidation,
    } = useInput({
        isRequired: true,
    });

    const [category, setCategory] = useState<FeedbackCategory>(
        FeedbackCategory.General
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { value: consentToResponse, toggle: toggleConsentToResponse } =
        useBoolean();

    const handleSubmit = useCallback(() => {
        if (isEmpty(feedback)) {
            setValueRequiredState();
            return;
        }

        trackFeedbackSubmitted({
            category,
            feedback: feedback!,
            email: user?.email,
            consentToResponse,
        });
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            toaster.success("Thanks for the feedback!");
            onCloseComplete?.();
        }, 750);
    }, [
        category,
        consentToResponse,
        feedback,
        onCloseComplete,
        setValueRequiredState,
        user?.email,
    ]);

    return (
        <Dialog
            confirmLabel="Submit"
            isConfirmLoading={isLoading}
            onCloseComplete={onCloseComplete}
            onConfirm={handleSubmit}
            title="Submit Feedback">
            <SelectField
                label="Category"
                maxWidth="fit-content"
                onChange={(event) =>
                    setCategory(event.target.value as FeedbackCategory)
                }
                value={category}>
                {Object.values(FeedbackCategory).map((category) => (
                    <option key={category}>{category}</option>
                ))}
            </SelectField>
            <TextareaField
                {...feedbackValidation}
                description="Let us know what you'd like to see added or improved."
                label="Feedback"
                onChange={handleFeedbackChange}
                resize="none"
                value={feedback}
                width="100%"
            />
            {isAuthenticated && (
                <Checkbox
                    checked={consentToResponse}
                    label="It's okay to contact me with follow-up questions or comments."
                    onChange={toggleConsentToResponse}
                />
            )}
        </Dialog>
    );
};

export { FeedbackCategory, FeedbackDialog };
