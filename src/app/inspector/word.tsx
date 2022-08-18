import * as React from "react"

import {
    type ILSystemSymbols,
    type ILSystemWord,
} from "../../lib"

interface IWordInspectorProps {
    id: string
    alphabet: ILSystemWord
    word: ILSystemWord
    onWordChange: (word: ILSystemWord) => void
}

const WordInspector = ({
    id,
    alphabet,
    word,
    onWordChange,
}: IWordInspectorProps) => {
    return <input
        id={ id }
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