import * as React from "react"

import InspectorButton from "./button"
import AlphabetInspector from "./alphabet"
import ProductionRulesInspector from "./production-rules"
import GeneratorOptionsInspector from "./generator-options"
import RenderingRulesInspector from "./rendering-rules"
import RenderingOptionsInpector from "./renderer-options"

const Inspector = () => {
    const [ active, setActive ] = React.useState(false)
    const onClick = () => setActive(!active)
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
        <ProductionRulesInspector />
        <GeneratorOptionsInspector />
        <RenderingRulesInspector />
        <RenderingOptionsInpector />
    </form>
}

export default Inspector