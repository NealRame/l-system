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
}

