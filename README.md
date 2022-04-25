<h1 align="center">beets</h1>
<p align="center">
    <img src="https://raw.githubusercontent.com/brandongregoryscott/beets/main/assets/beets-hero.png" width="70%" height="70%"/>
    <br/>
    <a href="https://app.netlify.com/sites/beets/deploys">
        <img src="https://api.netlify.com/api/v1/badges/577171ad-5dab-42f6-9f2e-8a4088452771/deploy-status">
    </a>
    <a href="https://github.com/brandongregoryscott/beets/actions">
        <img src="https://github.com/brandongregoryscott/beets/actions/workflows/build.yaml/badge.svg">
    </a>
    <a href="https://github.com/prettier/prettier">
        <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"/>
    </a>
    <a href="http://www.typescriptlang.org/">
        <img alt="TypeScript" src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg"/>
    </a>
</p>

Web-based DAW (Digital Audio Workstation) written in React for making music.

## Quick Start

The app can be accessed at [beets.studio](https://beets.studio). While no account is necessary to begin using the app, functionality is limited.

https://user-images.githubusercontent.com/11774799/163682665-69db80cf-22ba-44be-87bd-ad27e24138fd.mp4

Additional documentation can be found in markdown files under [`src/docs`](https://github.com/brandongregoryscott/beets/tree/main/src/docs) or in-app at [beets.studio/help](https://beets.studio/help).

## Features

-   Authentication
-   File uploads for samples
-   Workstation with tracks, a piano roll and step sequencer
    -   Drag & Drop to reorder tracks or sections
    -   Sampler instrument creation
    -   Keyboard shortcut `⌘S` & `Ctrl+S` to save the project
    -   Keyboard shortcut `⌘D` & `Ctrl+D` to duplicate track section(s) while selected
    -   Keyboard shortcut `Shift+Click` to select multiple track sections
-   Project management (saving, opening, deleting)
-   Export project as a wav, ogg or webm file

## Issues

If you find a bug, feel free to [open up an issue](https://github.com/brandongregoryscott/beets/issues/new) and try to describe it in detail with reproduction steps if possible.

If you would like to see a feature, and it isn't [already documented](https://github.com/brandongregoryscott/beets/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement), feel free to open up a new issue and describe the desired behavior.

### Special thanks

-   [Tone.js](https://github.com/Tonejs/Tone.js)
-   [Evergreen](https://github.com/segmentio/evergreen)
-   [Supabase](https://github.com/supabase/supabase)
