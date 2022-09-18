import * as React from "react"

import {
    type ILSystemSymbols,
    type ILSystemRenderingRulesMap,
    type ILSystemRenderAction,
} from "../../../lib"

import {
    useAppDispatch,
    useAppSelector,
} from "../../hooks"

import {
    selectAlphabet,
    selectRenderingRules,
    setRenderingRules,
    updateRenderingRules,
} from "../../slices"

interface IActionProps {
    symbol: ILSystemSymbols,
    action: ILSystemRenderAction,
    onActionChange: (action: ILSystemRenderAction) => void
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
        const type = actionTypeEl.current?.value as ILSystemRenderAction[0]
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

    return <div className="l-system--rendering-rules-inspector-rule">
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


const RenderingRulesInspector = () => {
    const alphabet = useAppSelector(selectAlphabet)
    const renderingRules = useAppSelector(selectRenderingRules)

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        const initial = Object.assign({}, ...alphabet.map(symbol => {
            return {
                [symbol]: renderingRules[symbol] ?? ["noop"],
            } as ILSystemRenderingRulesMap
        }))
        dispatch(setRenderingRules(initial))
    }, [alphabet])

    return <section id="l-system--rendering-rules-inspector">
        <header>
            <h2>Rendering Rules</h2>
        </header>
        <ul>
            { Object.entries(renderingRules).map(([symbol, action]) => {
                return <li key={ symbol }>
                    <Action
                        symbol={ symbol as ILSystemSymbols }
                        action={ action }
                        onActionChange={ action => {
                            dispatch(updateRenderingRules({ [symbol]: action }))
                        } }
                    />
                </li>
            }) }
        </ul>
    </section>
}

export default RenderingRulesInspector
