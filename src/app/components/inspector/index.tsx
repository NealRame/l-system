import * as React from "react"

import AlphabetInspector from "./alphabet"
import RulesInspector from "./rules"
import ActionsInspector from "./actions"
import GeneratorOptionsInspector from "./generator-options"
import RenderingOptionsInpector from "./renderer-options"

const Inspector = () => {
    return <form
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        id="l-system-inspector"
    >
        <AlphabetInspector />
        <RulesInspector />
        <ActionsInspector />
        <GeneratorOptionsInspector />
        <RenderingOptionsInpector />
    </form>
}

export default Inspector