import * as React from "react"

import InspectorButton from "./button"
import AlphabetInspector from "./alphabet"
import RulesInspector from "./rules"
import ActionsInspector from "./actions"
import GeneratorOptionsInspector from "./generator-options"
import RenderingOptionsInpector from "./renderer-options"

const Inspector = () => {
    const [ active, setActive ] = React.useState(false)
    const onClick = () => {
        setActive(!active)
        console.log(active)
    }
    return <form
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        id="l-system-inspector"
        className={ active ? "active" : "" }
    >
        <InspectorButton active={ active } onClick={ onClick }/>
        <AlphabetInspector />
        <RulesInspector />
        <ActionsInspector />
        <GeneratorOptionsInspector />
        <RenderingOptionsInpector />
    </form>
}

export default Inspector