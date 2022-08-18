import * as React from "react"

import {
    type ILSystemSymbols,
    type ILSystemWord,
} from "../../lib"

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

export default WordInspector