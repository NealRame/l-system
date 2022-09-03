import * as React from "react"

import {
    type ILSystemSymbols,
    type ILSystemTurtleActions,
    type ITurtleAction,
    type ITurtle
} from "../../../lib"

import {
    useAppDispatch,
    useAppSelector,
} from "../../hooks"

import {
    selectAlphabet,
    selectActions,
    setActions,
    updateActions,
} from "../../slices"

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
        const type = actionTypeEl.current?.value as ITurtleAction[0]
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
        <label>{ symbol }</label>
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


const ActionsInspector = () => {
    const alphabet = useAppSelector(selectAlphabet)
    const actions = useAppSelector(selectActions)

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        const initial = Object.assign({}, ...alphabet.map(symbol => {
            return {
                [symbol]: actions[symbol] ?? ["noop"],
            } as Partial<ILSystemTurtleActions>
        }))
        dispatch(setActions(initial))
    }, [alphabet])

    return <section id="l-system--actions-inspector">
        <header>
            <h2>Actions</h2>
        </header>
        <ul>
            { Object.entries(actions).map(([symbol, action]) => {
                return <li key={ symbol }>
                    <Action
                        symbol={ symbol as ILSystemSymbols }
                        action={ action }
                        onActionChange={ action => {
                            dispatch(updateActions({ [symbol]: action }))
                        } }
                    />
                </li>
            }) }
        </ul>
    </section>
}

export default ActionsInspector
