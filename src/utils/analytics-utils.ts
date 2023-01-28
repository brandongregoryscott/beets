import type { SupabaseUser } from "types/supabase-user";
import type { Project } from "generated/interfaces/project";
import { pick } from "utils/core-utils";
import { isPersisted } from "utils/auditable-utils";
import { errorToString } from "utils/error-utils";
import type { ApiError } from "@supabase/supabase-js";
import { debounce, isError } from "lodash";
import type { FeedbackCategory } from "components/feedback-dialog";

const { analytics } = window;

enum EventName {
    FeedbackSubmitted = "Feedback Submitted",
    LoginFailed = "Login Failed",
    PasswordResetRequested = "Password Reset Requested",
    ProjectCreated = "Project Created",
    ProjectSaved = "Project Saved",
    ProjectSyncFailed = "Project Sync Failed",
    UserCreated = "User Created",
    UserCreationAttempted = "User Creation Attempted",
}

enum ProjectSaveLocation {
    FileMenu = "File Menu",
    KeyboardShortcut = "Keyboard Shortcut",
}

interface TrackFeedbackSubmittedOptions {
    category: FeedbackCategory;
    consentToResponse: boolean;
    email?: string;
    feedback: string;
}

const identifyUser = (user: SupabaseUser): void => {
    analytics.identify(user.id, pick(user, "email"));
};

const trackFeedbackSubmitted = (
    options: TrackFeedbackSubmittedOptions
): void => {
    analytics.track(EventName.FeedbackSubmitted, options);
};

const trackLoginFailed = (email: string, error: ApiError | Error): void => {
    analytics.track(EventName.LoginFailed, {
        email,
        ..._pickErrorProperties(error),
    });
};

const trackPage = debounce((): void => {
    analytics.page();
}, 25);

const trackUserCreated = (user: SupabaseUser): void => {
    analytics.track(EventName.UserCreated, pick(user, "id", "email"));
};

const trackUserCreationAttempted = (email: string): void => {
    analytics.track(EventName.UserCreationAttempted, { email });
};

const trackPasswordResetRequested = (email: string): void => {
    analytics.track(EventName.PasswordResetRequested, { email });
};

const trackProjectCreated = (project: Project): void => {
    if (isPersisted(project)) {
        return;
    }

    analytics.track(EventName.ProjectCreated, _pickProjectProperties(project));
};

const trackProjectSavedFromFileMenu = (project: Project): void =>
    _trackProjectSaved(project, ProjectSaveLocation.FileMenu);

const trackProjectSavedFromKeyboardShortcut = (project: Project): void =>
    _trackProjectSaved(project, ProjectSaveLocation.KeyboardShortcut);

const trackProjectSyncFailed = (project: Project, error: Error): void => {
    analytics.track(EventName.ProjectSyncFailed, {
        ..._pickProjectProperties(project),
        ...{ error: _pickErrorProperties(error) },
    });
};

const _pickErrorProperties = (
    error?: ApiError | Error
): Record<string, string | null> => {
    if (error == null) {
        return {};
    }

    let stackTrace: string | null = null;
    if (isError(error) && error.stack != null) {
        stackTrace = error.stack;
    }

    const name = isError(error) ? error.name : "ApiError";

    return {
        message: errorToString(error),
        name,
        stack_trace: stackTrace,
    };
};

const _pickProjectProperties = (project: Project): Partial<Project> =>
    pick(project, "id", "name");

const _trackProjectSaved = (
    project: Project,
    location: ProjectSaveLocation
): void => {
    analytics.track(EventName.ProjectSaved, {
        ..._pickProjectProperties(project),
        location,
    });
};

export {
    identifyUser,
    trackPage,
    trackProjectSavedFromFileMenu,
    trackFeedbackSubmitted,
    trackProjectSavedFromKeyboardShortcut,
    trackPasswordResetRequested,
    trackUserCreated,
    trackLoginFailed,
    trackUserCreationAttempted,
    trackProjectCreated,
    trackProjectSyncFailed,
};
