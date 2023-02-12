const Sitemap = {
    help: {
        root: "help",
        resource: "/help/:resource",
    },
    root: {
        root: "/",
        newProject: "/project/new",
        project: "/project/:projectId",
    },
    library: {
        root: "library",
        files: "/library/files",
        instruments: "/library/instruments",
        projects: "/library/projects",
    },
    login: "login",
    logout: "logout",
    register: "register",
    resetPassword: "reset-password",
};

export { Sitemap };
