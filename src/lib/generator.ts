import type {
    ILSystemSymbols,
    ILSystemWord,
    ILSystemProductionRulesMap,
} from "./types"

export function createSymbolTransformer<Alphabet extends ILSystemSymbols>(
    rules: ILSystemProductionRulesMap<Alphabet>,
) {
    return (symbol: Alphabet) => rules[symbol] ?? [symbol]
}

export function createWordTransformer<Alphabet extends ILSystemSymbols>(
    rules: ILSystemProductionRulesMap<Alphabet>,
) {
    const transformSymbol = createSymbolTransformer(rules)
    return (word: ILSystemWord<Alphabet>) => word.flatMap(transformSymbol)
}

export function createGenerator<Alphabet extends ILSystemSymbols>(
    rules: ILSystemProductionRulesMap<Alphabet>,
) {
    const transformWord = createWordTransformer(rules)
    return function generate(axiom: ILSystemWord<Alphabet>, steps: number)
        : ILSystemWord<Alphabet> {
        if (steps === 0) {
            return axiom
        }
        return transformWord(generate(axiom, steps - 1))
    }
}

export function defineLSystemAxiom<Alphabet extends ILSystemSymbols>(
    axiom: ILSystemWord<Alphabet>
): ILSystemWord<Alphabet> { return axiom }

export function defineLSystemProductionRules<Alphabet extends ILSystemSymbols>(
    rules: ILSystemProductionRulesMap<Alphabet>
): ILSystemProductionRulesMap<Alphabet> { return rules }
