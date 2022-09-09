import * as React from "react"

interface IInspectorButtonProps {
    active: boolean
    onClick: () => void
}

const InspectorButton = ({
    active,
    onClick,
}: IInspectorButtonProps) => {
    return <button onClick={ ev => {
        onClick()
        ev.preventDefault()
        ev.stopPropagation()
    } }>{
        active
            ? <i className="fa-solid fa-xmark"/>
            : <i className="fa-solid fa-cog"/>
    }

    </button>
}

export default InspectorButton