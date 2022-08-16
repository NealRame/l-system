import type {
    ITurtle,
} from "./types"

export const Symbols = [
    "A", "B", "C", "D", "E", "G", "F", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", "+", "[", "]"
] as const

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
    [key in Alphabet]: (turtle: ITurtle) => void
}

export class LSystem<Alphabet extends ILSystemSymbols> {
    private apply_(symbol: Alphabet)
        : ILSystemWord<Alphabet> {
        return this.rules_[symbol]
    }

    private step_(word: ILSystemWord<Alphabet>)
        : ILSystemWord<Alphabet> {
        return word.reduce(
            (prev, current) => prev.concat(this.apply_(current)),
            [] as ILSystemWord<Alphabet>
        )
    }

    constructor(
        private rules_: ILSystemRules<Alphabet>,
    ) { }

    generate(axiom: ILSystemWord<Alphabet>, steps: number)
        : ILSystemWord<Alphabet> {
        if (steps === 0) {
            return axiom
        }
        return this.step_(this.generate(axiom, steps - 1))
    }
}

export function defineLSystemRules<Alphabet extends ILSystemSymbols>(
    rules: ILSystemRules<Alphabet>
): ILSystemRules<Alphabet> { return rules }

export function defineLSystemTurtleActions<Alphabet extends ILSystemSymbols>(
    actions: ILSystemTurtleActions<Alphabet>
): ILSystemTurtleActions<Alphabet> { return actions }
