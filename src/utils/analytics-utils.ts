import { SupabaseUser } from "types/supabase-user";
import { Project } from "generated/interfaces/project";
import { pick } from "utils/core-utils";
import { isPersisted } from "utils/auditable-utils";

const { analytics } = window;

enum EventName {
    PasswordResetRequested = "Password Reset Requested",
    ProjectCreated = "Project Created",
    ProjectSaved = "Project Saved",
    ProjectSyncFailed = "Project Sync Failed",
    UserCreated = "User Created",
}

enum ProjectSaveLocation {
    FileMenu = "File Menu",
    KeyboardShortcut = "Keyboard Shortcut",
}

const identifyUser = (user: SupabaseUser): void => {
    analytics.identify(user.id, pick(user, "email"));
};

const trackPage = (): void => {
    analytics.page();
};

const trackUserCreated = (user: SupabaseUser): void => {
    analytics.track(EventName.UserCreated, pick(user, "id", "email"));
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
        error,
    });
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
    EventName,
    identifyUser,
    trackPage,
    trackProjectSavedFromFileMenu,
    trackProjectSavedFromKeyboardShortcut,
    trackPasswordResetRequested,
    trackUserCreated,
    trackProjectCreated,
    trackProjectSyncFailed,
};
