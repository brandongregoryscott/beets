import type { SupabaseUser } from "types/supabase-user";
import type { Project } from "generated/interfaces/project";
import { isNotNilOrEmpty, pick } from "utils/core-utils";
import { isPersisted } from "utils/auditable-utils";
import { errorToString } from "utils/error-utils";
import { debounce, isError } from "lodash";
import type { FeedbackCategory } from "components/feedback-dialog";
import posthog from "posthog-js";
import { env, isDevelopment } from "utils/env";

if (isNotNilOrEmpty(env.REACT_APP_POSTHOG_KEY)) {
    posthog.init(env.REACT_APP_POSTHOG_KEY, {
        api_host: "https://us.i.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false,
    });

    if (isDevelopment()) {
        posthog.debug(true);
    }
}

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
    posthog.identify(user.id, pick(user, "email"));
};

const trackFeedbackSubmitted = (
    options: TrackFeedbackSubmittedOptions
): void => {
    posthog.capture(EventName.FeedbackSubmitted, options);
};

const trackLoginFailed = (email: string, error: Error): void => {
    posthog.capture(EventName.LoginFailed, {
        email,
        ..._pickErrorProperties(error),
    });
};

const trackPage = debounce((): void => {
    posthog.capture("$pageview");
}, 25);

const trackUserCreated = (user: SupabaseUser): void => {
    posthog.capture(EventName.UserCreated, pick(user, "id", "email"));
};

const trackUserCreationAttempted = (email: string): void => {
    posthog.capture(EventName.UserCreationAttempted, { email });
};

const trackPasswordResetRequested = (email: string): void => {
    posthog.capture(EventName.PasswordResetRequested, { email });
};

const trackProjectCreated = (project: Project): void => {
    if (isPersisted(project)) {
        return;
    }

    posthog.capture(EventName.ProjectCreated, _pickProjectProperties(project));
};

const trackProjectSavedFromFileMenu = (project: Project): void =>
    _trackProjectSaved(project, ProjectSaveLocation.FileMenu);

const trackProjectSavedFromKeyboardShortcut = (project: Project): void =>
    _trackProjectSaved(project, ProjectSaveLocation.KeyboardShortcut);

const trackProjectSyncFailed = (project: Project, error: Error): void => {
    posthog.capture(EventName.ProjectSyncFailed, {
        ..._pickProjectProperties(project),
        ...{ error: _pickErrorProperties(error) },
    });
};

const _pickErrorProperties = (error?: Error): Record<string, string | null> => {
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
    posthog.capture(EventName.ProjectSaved, {
        ..._pickProjectProperties(project),
        location,
    });
};

export {
    identifyUser,
    trackFeedbackSubmitted,
    trackLoginFailed,
    trackPage,
    trackPasswordResetRequested,
    trackProjectCreated,
    trackProjectSavedFromFileMenu,
    trackProjectSavedFromKeyboardShortcut,
    trackProjectSyncFailed,
    trackUserCreated,
    trackUserCreationAttempted,
};
