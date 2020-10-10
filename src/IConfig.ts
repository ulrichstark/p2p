export interface IConfigSeed {
    port: number;
}

export interface IConfig {
    port: number;
    seeds: IConfigSeed[];
}