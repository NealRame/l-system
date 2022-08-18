import * as React from "react"

import {
    SVGLSystem,
    Symbols,
    type ILSystemRules,
    type ILSystemSymbols,
    type ILSystemTurtleActions,
    type ILSystemWord,
    type ITurtleAction,
    type ITurtle
} from "../lib"

interface ISymbolButtonProps {
    children: React.ReactNode
    onClick: () => void
    selected: boolean
}

const SymbolButton = ({ onClick, selected, children }: ISymbolButtonProps) => {
    return <button
        className={ ["l-system-symbol-button", selected ? "active" : ""].join(" ") }
        onClick={ e => {
            e.preventDefault()
            e.stopPropagation()
            onClick()
        }}
    >{ children }</button>
}

interface IAlphabetInspectorProps {
    onAlphabetChange: (alphabet: ILSystemWord) => void
}

const AlphabetInspector = (props: IAlphabetInspectorProps) => {
    const [alphabet, setAlphabet] = React.useState<ILSystemWord>([])

    const symbolClickHandler = (symbol: ILSystemSymbols) => () => {
        if (alphabet.includes(symbol)) {
            const newAlphabet = alphabet.filter(s => s !== symbol)
            setAlphabet(newAlphabet)
            props.onAlphabetChange(newAlphabet)
        } else {
            const newAlphabet = [...alphabet, symbol]
            setAlphabet(newAlphabet)
            props.onAlphabetChange(newAlphabet)
        }
    }

    return <>
        <section id="l-system--alphabet-inspector">
            <header>
            <h2>Alphabet</h2>
            </header>
            <ul>
                { Symbols.map(symbol => (<li key={ symbol }>
                    <SymbolButton
                        onClick={ symbolClickHandler(symbol) }
                        selected={ alphabet.includes(symbol) }
                    >{ symbol }</SymbolButton>
                </li>)) }
            </ul>
        </section>
    </>
}

interface IWordInspectorProps {
    alphabet: ILSystemWord
    word: ILSystemWord
    onWordChange: (word: ILSystemWord) => void
}

const WordInspector = ({
    alphabet,
    word,
    onWordChange,
}: IWordInspectorProps) => {
    return <input
        value={ word.join("") }
        onChange={e => {
            onWordChange(e.target.value
                .toUpperCase()
               .split("")
                .filter(c => alphabet.includes(c as ILSystemSymbols)) as ILSystemWord
            )
        }}
    />
}

interface IAxiomInspectorProps {
    alphabet: ILSystemWord
    axiom: ILSystemWord
    onAxiomChange: (axiom: ILSystemWord) => void
}

const AxiomInspector = ({
    alphabet,
    axiom,
    onAxiomChange,
}: IAxiomInspectorProps) => {
    return <section id="l-system--axiom-inspector">
        <header>
            <h2>Axiom</h2>
        </header>
        <WordInspector
            alphabet={ alphabet }
            word={ axiom }
            onWordChange={ onAxiomChange }
        />
    </section>
}

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

interface IActionProps {
    symbol: ILSystemSymbols,
    action: ITurtleAction,
    onActionChange: (action: ITurtleAction) => void
}

const Action = ({
    symbol,
    action,
    onActionChange,
}: IActionProps) => {
    const [actionType, ...actionValues] = action

    const actionTypeEl = React.useRef<HTMLSelectElement>(null)
    const actionValuesEl = React.useRef<HTMLInputElement>(null)

    const updateRule = () => {
        const type = actionTypeEl.current?.value as keyof ITurtle
        if (type === "turn") {
            const arg = Number(actionValuesEl.current?.value ?? 90)*Math.PI/180
            if (Number.isNaN(arg)) {
                onActionChange([type, Math.PI/2])
            } else {
                onActionChange([type, arg])
            }
        }
        else if (type === "forward") {
            const arg = Number(actionValuesEl.current?.value ?? 1)
            if (Number.isNaN(arg)) {
                onActionChange([type, 1])
            } else {
                onActionChange([type, arg])
            }
        }
        else {
            onActionChange([type])
        }
    }

    return <div className="l-system--actions-inspector-action">
        <span className="l-system--actions-inspector-action-symbol">{ symbol }</span>
        <select
            ref={ actionTypeEl }
            value={ actionType }
            onChange={ updateRule }
        >
            <option value="noop">Noop</option>
            <option value="forward">Forward</option>
            <option value="turn">Turn</option>
            <option value="push">Push</option>
            <option value="pop">Pop</option>
        </select>
        {
            (actionType === "forward") && <input
                ref={ actionValuesEl }
                type="number"
                min="0"
                step="0.1"
                value={ Number(actionValues[0] ?? 1).toString() }
                onChange={ updateRule }
            />
        } {
            (actionType === "turn") && <input
                ref={ actionValuesEl }
                type="number"
                min="-180"
                max="180"
                step="1"
                value={ Number(Math.round(actionValues[0]*180/Math.PI)).toString() }
                onChange={ updateRule }
            />
        }
    </div>
}

interface IActionInspectorProps {
    alphabet: ILSystemWord
    actions: Partial<ILSystemTurtleActions>
    onActionsChange: (actions: Partial<ILSystemTurtleActions>) => void
}

const ActionsInspector = ({
    alphabet,
    actions,
    onActionsChange,
}: IActionInspectorProps) => {
    const actionChangeHandler = (symbol: ILSystemSymbols) => (action: ITurtleAction) => {
        onActionsChange({
            ...actions,
            [symbol]: action
        })
    }
    return <section id="l-system--actions-inspector">
        <header>
            <h2>Actions</h2>
        </header>
        <ul>
            { alphabet.map(symbol => (<li key={ symbol }>
                <Action
                    symbol={ symbol }
                    action={ actions[symbol] ?? ["noop"] }
                    onActionChange={ actionChangeHandler(symbol) } />
            </li>))}
        </ul>
    </section>
}

interface IStepInspectorProps {
    step: number
    onStepChange: (step: number) => void
}

const StepInspector = ({ step, onStepChange }: IStepInspectorProps) => {
    return <section id="l-system--step-inspector">
        <header>
            <h2>Steps</h2>
            <input
                type="number"
                min="0"
                max="10"
                value={ step }
                onChange={ e => {
                    onStepChange(Number(e.target.value))
                } }
            />
        </header>
    </section>
}

type InspectorProps = {
    axiom: ILSystemWord,
    onAxiomChange: (axiom: ILSystemWord) => void

    rules: Partial<ILSystemRules>
    onRulesChange: (rules: ILSystemRules) => void

    actions: Partial<ILSystemTurtleActions>
    onActionsChange: (actions: ILSystemTurtleActions) => void

    step: number
    onStepChange: (step: number) => void
}

const Inspector = ({
    axiom,
    onAxiomChange,
    rules,
    onRulesChange,
    actions,
    onActionsChange,
    step,
    onStepChange,
}: InspectorProps) => {
    const [alphabet, setAlphabet] = React.useState<ILSystemWord>([
        ... new Set(Object.keys(rules))
    ] as ILSystemWord)

    const updateAxiom = (word: ILSystemWord) => {
        onAxiomChange(word)
    }

    const updateRules = (rules: Partial<ILSystemRules>) => {
        onRulesChange(rules as ILSystemRules)
    }

    const updateActions = (actions: Partial<ILSystemTurtleActions>) => {
        onActionsChange(actions as ILSystemTurtleActions)
    }

    const updateStep = (step: number) => {
        onStepChange(step)
    }

    return <form
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        id="l-system-inspector"
    >
        <AlphabetInspector onAlphabetChange={ setAlphabet } />
        <AxiomInspector alphabet={ alphabet } axiom={ axiom } onAxiomChange={ updateAxiom } />
        <RulesInspector alphabet={ alphabet } rules={ rules } onRulesChange={ updateRules } />
        <ActionsInspector alphabet={ alphabet } actions={ actions } onActionsChange={ updateActions } />
        <StepInspector step={ step } onStepChange={ updateStep } />
    </form>
}

const app = () => {
    const [axiom, setAxiom] = React.useState<ILSystemWord>([])
    const [rules, setRules] = React.useState<Partial<ILSystemRules>>({})
    const [actions, setActions] = React.useState<Partial<ILSystemTurtleActions>>({})
    const [step, setStep] = React.useState<number>(0)

    return <>
        <SVGLSystem
            backgroundColor="black"
            color="rebeccapurple"
            padding={ 8 }
            axiom={ axiom as ILSystemWord }
            rules={ rules as ILSystemRules }
            actions={ actions as ILSystemTurtleActions }
            steps={ step }
        />
        <Inspector
            axiom={ axiom }
            onAxiomChange={ setAxiom }

            rules={ rules }
            onRulesChange={ setRules }

            actions={ actions }
            onActionsChange={ setActions}

            step={ step }
            onStepChange={ setStep }
        />
    </>
}

export default app
