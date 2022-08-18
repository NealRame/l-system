export interface IRect {
    x: number
    y: number
    w: number
    h: number
}

export type ITurtleAction =
    ["forward", number]
    | ["turn", number]
    | ["pop"]
    | ["push"]
    | ["noop"]

export interface ITurtle {
    forward(len: number): void
    turn(angle: number): void
    push(): void
    pop(): void
    noop(): void
}
