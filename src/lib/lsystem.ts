import type {
    ILSystemSymbols,
    ILSystemWord,
    ILSystemRules,
    ILSystemTurtleActions,
} from "./types"

export class LSystem<Alphabet extends ILSystemSymbols> {
    private apply_(symbol: Alphabet)
        : ILSystemWord<Alphabet> {
        return this.rules_[symbol] ?? [symbol]
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
