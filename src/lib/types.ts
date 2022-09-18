import { Symbols } from "./constants"

export type ILSystemSymbols
    = typeof Symbols[number]

export type ILSystemWord<Alphabet extends ILSystemSymbols = ILSystemSymbols>
    = Array<Alphabet>

export type ILSystemProductionRules<Alphabet extends ILSystemSymbols = ILSystemSymbols>
    = {
    [key in Alphabet]: ILSystemWord<Alphabet>
}

export interface ILSystemRenderDevice {
    forward(len: number): void
    turn(angle: number): void
    push(): void
    pop(): void
    noop(): void
}

export type ILSystemRenderAction
    = {
    [K in keyof ILSystemRenderDevice]: [K,...Parameters<ILSystemRenderDevice[K]>]
}[keyof ILSystemRenderDevice]

export type ILSystemRenderActionMap<Alphabet extends ILSystemSymbols = ILSystemSymbols>
    = {
    [key in Alphabet]: ILSystemRenderAction
}
