import type {
    ILSystemSymbols,
    ILSystemWord,
    ILSystemProductionRules,
    ILSystemRenderActionMap,
} from "./types"

export class LSystem<Alphabet extends ILSystemSymbols> {
    private apply_(symbol: Alphabet)
        : ILSystemWord<Alphabet> {
        return this.rules_[symbol] ?? [symbol]
    }

    private step_(word: ILSystemWord<Alphabet>)
        : ILSystemWord<Alphabet> {
        return word.flatMap(symbol => this.apply_(symbol))
    }

    constructor(
        private rules_: ILSystemProductionRules<Alphabet>,
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
    rules: ILSystemProductionRules<Alphabet>
): ILSystemProductionRules<Alphabet> { return rules }

export function defineLSystemTurtleActions<Alphabet extends ILSystemSymbols>(
    actions: ILSystemRenderActionMap<Alphabet>
): ILSystemRenderActionMap<Alphabet> { return actions }


export function defineLSystemAxiom<Alphabet extends ILSystemSymbols>(
    axiom: ILSystemWord<Alphabet>
): ILSystemWord<Alphabet> { return axiom }
