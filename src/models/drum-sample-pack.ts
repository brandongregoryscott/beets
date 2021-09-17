import { Player } from "tone";
import * as Tone from "tone";
import { FileExtension } from "enums/file-extension";
import { DrumType } from "enums/drum-type";
import { DrumSamplePack as DrumSamplePackInterface } from "interfaces/drum-sample-pack";
import { SamplePaths } from "constants/sample-paths";
import upath from "upath";
import { randomInt } from "utils/core-utils";

class DrumSamplePack implements DrumSamplePackInterface {
    public count: Record<DrumType, number>;
    public fileExtension?: FileExtension;
    public name: string;

    private _players: Record<DrumType, Player[]>;

    constructor(options: DrumSamplePackInterface) {
        this.count = options.count;
        this.fileExtension = options.fileExtension ?? FileExtension.WAV;
        this.name = options.name;
        this._players = {
            [DrumType.ClosedHiHat]: [],
            [DrumType.OpenHiHat]: [],
            [DrumType.Kick]: [],
            [DrumType.Snare]: [],
            [DrumType.Shaker]: [],
        };
    }

    public async load(): Promise<void> {
        this._players = this.loadPlayers();
        await Tone.loaded();
    }

    public getPlayers(samples?: Partial<Record<DrumType, number>>) {
        return {
            closedHiHat: this.getPlayer(
                DrumType.ClosedHiHat,
                samples?.CLOSED_HI_HAT
            ),
            openHiHat: this.getPlayer(DrumType.OpenHiHat, samples?.OPEN_HI_HAT),
            kick: this.getPlayer(DrumType.Kick, samples?.KICK),
            snare: this.getPlayer(DrumType.Snare, samples?.SNARE),
            shaker: this.getPlayer(DrumType.Shaker, samples?.SHAKER),
        };
    }

    public getPlayer(drumType: DrumType, sampleNumber?: number): Player {
        sampleNumber = sampleNumber ?? randomInt(1, this.count[drumType]);

        const existingPlayer = (this._players[drumType] ?? [])[
            sampleNumber - 1
        ];

        if (existingPlayer != null) {
            return existingPlayer;
        }

        const path =
            upath.join(
                this.getBaseSamplePath(),
                SamplePaths[drumType],
                sampleNumber.toString()
            ) + this.fileExtension;
        return new Player(path).toDestination();
    }

    private getBaseSamplePath(): string {
        return `${process.env.PUBLIC_URL}/samples/${this.name}`;
    }

    private loadPlayers(): Record<DrumType, Player[]> {
        const players: Partial<Record<string, Player[]>> = {};
        (Object.values(DrumType) as DrumType[]).forEach(
            (drumType: DrumType) => {
                players[drumType] = [];

                for (let i = 1; i <= this.count[drumType]; i++) {
                    players[drumType]!.push(this.getPlayer(drumType, i));
                }
            }
        );

        return players as Record<DrumType, Player[]>;
    }
}

export { DrumSamplePack };
