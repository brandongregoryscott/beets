# Overview

This guide will serve as high-level documentation for the various different pages, features, and domain terms in the application. If you find the information is lacking or inaccurate, or you'd like to propose a new section, [please open up an issue](https://github.com/brandongregoryscott/beets/issues/new) or [shoot me an email](mailto:contact@brandonscott.me). I'll do my best to respond and add documentation or assist where possible!

### Workstation page

-   Refers to the page on initial site load. This page holds audio controls and UI components for building out your project.

![Workstation page](../../public/assets/WorkstationPage.png)

### Workstation

-   Data structure that contains persisted entities that make up a song: a [Project](#project), [Tracks](#track), [Track Sections](#track-section), and [Track Section Steps](#track-section-step). A Workstation is not persisted, but acts as a 1:1 container to a [Project](#project)

### Project

-   Container for parts of a musical composition. Has a name, [BPM](#bpm), [swing](#swing) and global [volume](#volume) values.
-   Projects are private and only available for registered users.
-   Consists of one or more [Tracks](#track)

![Project control components](../../public/assets/Project.png)

### Track

-   A layer that contains audio. Has a name, [mute](#mute), [solo](#solo), and [volume](#volume) values.
-   Consists of one or more [Track Sections](#track-section) which are collections of steps or notes of audio. See [Track Section Steps](#track-section-step) for more information.
-   Tracks can be based off of an [Instrument](#instrument), or simply used as a [Sequencer](#sequencer).
    -   This cannot currently be changed - you'll need to delete and create a new Track if you'd like to change it.

![Track component](../../public/assets/Track.png)

### Track Section

-   Collection of steps or notes of audio. Depending on the [Track](#track) type, these steps are added via the [Piano Roll](#piano-roll) or [Sequencer](#sequencer) dialogs.

![Track Section component](../../public/assets/TrackSection.png)

### Track Section Step

-   A single step/note of audio. In an [Instrument](#instrument) type [Track](#track), these can be layered to form a chord. In a [Sequencer](#sequencer) type [Track](#track), up to 4 samples (usually drum sounds) can be layered per step index.

![Track Section Step components](../../public/assets/TrackSectionStep.png)

### Instrument

-   A persisted configuration for a sampled instrument. This allows you to set the root note, its duration, the release time, and curve of the sample.
-   Samples that are configured as instruments can be pitched up or down in the [Piano Roll](#piano-roll) component, whereas standard [Sequencer](#sequencer) [Tracks](#track) cannot be.

### Piano Roll

-   Dialog that can be used to program in [Track Section Steps](#track-section-step) for an [Instrument](#instrument) type [Track's](#track) [Track Section](#track-section). It can be opened by hovering over a [Track Section](#track-section) and clicking the middle button:

    ![Open Piano Roll Dialog](../../public/assets/OpenPianoRoll.png)

    ![Piano Roll Dialog](../../public/assets/PianoRoll.png)

### Sequencer

-   Dialog that can be used to program in [Track Section Steps](#track-section-step) for a given [Track Section](#track-section). It can be opened by hovering over a [Track Section](#track-section) and clicking the middle button:

    ![Open Sequencer Dialog](../../public/assets/OpenSequencer.png)

    ![Sequencer Dialog](../../public/assets/Sequencer.png)

### BPM

-   Stands for _beats per minute_ or the tempo of the song. This is persisted as a property on the [Project](#project).

![Project BPM](../../public/assets/ProjectBPM.png)

### Swing

-   Value from 0 - 100 that controls how far notes will deviate from the metronome. This can be used for an 'off-beat' sound commonly used in hip-hop.

![Project Swing](../../public/assets/ProjectSwing.png)

### Volume

-   Value (in decibels, or dB) that controls how quiet or loud the audio is. The [Project](#project) has a global volume level, and each [Track](#track) will eventually have its own volume level to allow for mixing. (See [beets#68](https://github.com/brandongregoryscott/beets/issues/68))

![Project Volume](../../public/assets/ProjectVolume.png)

### Mute

-   Controls whether or not the audio is playing. The whole [Project](#project) can be muted, and individual [Tracks](#track) can be muted to play certain parts together.

![Mute Project](../../public/assets/MuteProject.png)

![Mute Track](../../public/assets/MuteTrack.png)

### Solo

-   Plays a specific [Track](#track) alone. This may be easier than muting all other [Tracks](#track) in a [Project](#project) to listen to just one part.

![Solo Track](../../public/assets/SoloTrack.png)
