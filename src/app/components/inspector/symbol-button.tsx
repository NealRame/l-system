import * as React from "react"

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

export default SymbolButton
