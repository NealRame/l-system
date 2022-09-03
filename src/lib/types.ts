import { Symbols } from "./constants"

export interface IRect {
    x: number
    y: number
    w: number
    h: number
}

export interface ITurtle {
    forward(len: number): void
    turn(angle: number): void
    push(): void
    pop(): void
    noop(): void
    readonly path: string
    readonly rect: IRect
}

export type ITurtleAction
    = {
    [K in keyof ITurtle]: ITurtle[K] extends (...args: any[]) => void ? [K,...Parameters<ITurtle[K]>] : never
}[keyof ITurtle]

export type ILSystemSymbols
    = typeof Symbols[number]

export type ILSystemWord<Alphabet extends ILSystemSymbols = ILSystemSymbols>
    = Array<Alphabet>

export type ILSystemRules<Alphabet extends ILSystemSymbols = ILSystemSymbols>
    = {
    [key in Alphabet]: ILSystemWord<Alphabet>
}

export type ILSystemTurtleActions<Alphabet extends ILSystemSymbols = ILSystemSymbols>
    = {
    [key in Alphabet]: ITurtleAction
}
