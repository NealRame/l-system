import * as React from "react"

import {
    type ILSystemSymbols,
    type ILSystemTurtleActions,
    type ILSystemWord,
    type ITurtleAction,
    type ITurtle
} from "../../lib"

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
                value={ Number(Math.round((actionValues[0] ?? 90)*180/Math.PI)).toString() }
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

export default ActionsInspector
