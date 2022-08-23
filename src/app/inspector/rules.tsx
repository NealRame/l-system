import * as React from "react"

import type {
    ILSystemRules,
    ILSystemSymbols,
    ILSystemWord,
} from "../../lib"

import {
    useAppSelector,
    useAppDispatch
} from "../hooks"

import WordInspector from "./word"

import {
    selectAlphabet,
    selectRules,
    updateRules,
    setRules,
} from "../slices"

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
    const className = "l-system--rules-inspector-rule"
    return <div className="l-system--rules-inspector-rule">
        <label htmlFor={ `${className}--${symbol}` }>{ symbol }</label>
        <WordInspector
            id={ `${className}--${symbol}` }
            alphabet={ alphabet }
            word={ word }
            onWordChange={ onChange }
        />
    </div>
}

const RulesInspector = () => {
    const alphabet = useAppSelector(selectAlphabet)

    const rules = useAppSelector(selectRules)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        const initial = Object.assign({}, alphabet.map(symbol => {
            return {
                [symbol]: rules[symbol] ?? [symbol],
            } as Partial<ILSystemRules>
        }))
        dispatch(setRules(initial))
    }, [alphabet])

    return <section id="l-system--rules-inspector">
        <header>
            <h2>Rules</h2>
        </header>
        <ul>
            { alphabet.map(symbol => (<li key={ symbol }>
                <Rule
                    alphabet={ alphabet }
                    symbol={ symbol }
                    word={ rules[symbol] ?? [symbol] }
                    onChange={ word => dispatch(updateRules({
                        [symbol]: word,
                    })) }
                />
            </li>))}
        </ul>
    </section>
}

export default RulesInspector