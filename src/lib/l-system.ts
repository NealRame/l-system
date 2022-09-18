import type {
    ILSystemSymbols,
    ILSystemWord,
    ILSystemProductionRulesMap,
    ILSystemRenderingRulesMap,
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
        private rules_: ILSystemProductionRulesMap<Alphabet>,
    ) { }

    generate(axiom: ILSystemWord<Alphabet>, steps: number)
        : ILSystemWord<Alphabet> {
        if (steps === 0) {
            return axiom
        }
        return this.step_(this.generate(axiom, steps - 1))
    }
}

export function defineLSystemAxiom<Alphabet extends ILSystemSymbols>(
    axiom: ILSystemWord<Alphabet>
): ILSystemWord<Alphabet> { return axiom }

export function defineLSystemProductionRules<Alphabet extends ILSystemSymbols>(
    rules: ILSystemProductionRulesMap<Alphabet>
): ILSystemProductionRulesMap<Alphabet> { return rules }
