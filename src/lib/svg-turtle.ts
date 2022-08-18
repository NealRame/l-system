import type {
    ITurtle,
    IRect,
} from "./types"

export class SVGTurtle implements ITurtle {
    private states_: Array<number> = []

    private x_ = 0
    private xMin_ = 0
    private xMax_ = 0

    private y_ = 0
    private yMax_ = 0
    private yMin_ = 0

    private cap_ = 0

    private d_: string

    constructor() {
        this.d_ = `M${this.x_} ${this.y_}`
    }

    noop(): void {
        // noop
    }

    turn(angle: number): void {
        this.cap_ -= angle
    }

    push(): void {
        this.states_.push(this.x_, this.y_, this.cap_)
    }

    pop(): void {
        if (this.states_.length < 3) {
            throw new Error("Stack is empty")
        }

        this.cap_ = this.states_.pop()!
        this.y_ = this.states_.pop()!
        this.x_ = this.states_.pop()!

        this.d_ = `${this.d_} M${this.x_} ${this.y_}`
    }

    forward(len: number): void {
        this.x_ = this.x_ + len*Math.cos(this.cap_)
        this.y_ = this.y_ + len*Math.sin(this.cap_)

        this.xMin_ = Math.min(this.xMin_, this.x_)
        this.xMax_ = Math.max(this.xMax_, this.x_)

        this.yMin_ = Math.min(this.yMin_, this.y_)
        this.yMax_ = Math.max(this.yMax_, this.y_)

        this.d_ = `${this.d_} L${this.x_} ${this.y_}`
    }

    get path(): string {
        return this.d_
    }

    get rect(): IRect {
        return {
            x: this.xMin_,
            y: this.yMin_,
            w: this.xMax_ - this.xMin_,
            h: this.yMax_ - this.yMin_,
        }
    }
}
