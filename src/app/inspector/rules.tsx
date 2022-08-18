import * as React from "react"

import {
    type ILSystemRules,
    type ILSystemSymbols,
    type ILSystemWord,
} from "../../lib"

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
    return <div className="l-system--rules-inspector-rule">
        <span className="l-system--rules-inspector-rule-symbol">{ symbol }</span>
        <WordInspector
            alphabet={ alphabet }
            word={ word }
            onWordChange={ onChange }
        />
    </div>
}

interface IRulesInspectorProps {
    alphabet: ILSystemWord
    rules: Partial<ILSystemRules>
    onRulesChange: (rules: Partial<ILSystemRules>) => void
}

const RulesInspector = ({
    alphabet,
    rules,
    onRulesChange,
}: IRulesInspectorProps) => {
    const ruleChangeHandler = (symbol: ILSystemSymbols) => (word: ILSystemWord) => {
        onRulesChange({
            ...rules,
            [symbol]: word
        })
    }
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
                    onChange={ ruleChangeHandler(symbol) }
                />
            </li>))}
        </ul>
    </section>
}

export default RulesInspector