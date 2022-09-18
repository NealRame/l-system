import * as React from "react"

import type {
    ILSystemProductionRulesMap,
    ILSystemSymbols,
    ILSystemWord,
} from "../../../lib"

import {
    useAppSelector,
    useAppDispatch
} from "../../hooks"

import {
    selectAlphabet,
    selectProductionRules,
    updateProductionRules,
    setProductionRules,
} from "../../slices"

import WordInspector from "./word"

interface IRuleProps {
    alphabet: ILSystemWord
    symbol: ILSystemSymbols,
    word: ILSystemWord
    onChange: (word: ILSystemWord) => void
}

const Rule = ({
    alphabet,
    symbol,
    word,
    onChange,
}: IRuleProps) => {
    const className = "l-system--production-rules-inspector-rule"
    return <div className={ className }>
        <label htmlFor={ `${className}--${symbol}` }>{ symbol }</label>
        <WordInspector
            id={ `${className}--${symbol}` }
            alphabet={ alphabet }
            word={ word }
            onWordChange={ onChange }
        />
    </div>
}

const ProductionRulesInspector = () => {
    const alphabet = useAppSelector(selectAlphabet)

    const rules = useAppSelector(selectProductionRules)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        const initial = Object.assign({}, alphabet.map(symbol => {
            return {
                [symbol]: rules[symbol] ?? [symbol],
            } as ILSystemProductionRulesMap
        }))
        dispatch(setProductionRules(initial))
    }, [alphabet])

    return <section id="l-system--production-rules-inspector">
        <header>
            <h2>Production rules</h2>
        </header>
        <ul>
            { alphabet.map(symbol => (<li key={ symbol }>
                <Rule
                    alphabet={ alphabet }
                    symbol={ symbol }
                    word={ rules[symbol] ?? [symbol] }
                    onChange={ word => dispatch(updateProductionRules({
                        [symbol]: word,
                    })) }
                />
            </li>))}
        </ul>
    </section>
}

export default ProductionRulesInspector