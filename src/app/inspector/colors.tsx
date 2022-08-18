import * as React from "react"

interface IColorsInspectorProps {
    background: string
    onBackgroundChange: (color: string) => void

    stroke: string
    onStrokeChange: (color: string) => void
}

const ColorsInspector = (props: IColorsInspectorProps) => {
    const id = "l-system--colors-inspector"
    const callbacks = {
        background: props.onBackgroundChange,
        stroke: props.onStrokeChange,
    }
    return <section id={ id }>
        <header>
            <h2>Colors</h2>
        </header>
        <main>
            { (["background", "stroke"] as const).map(type => {
                const colorId = `${ id }--${ type }`
                return <>
                    <label htmlFor={ `${id}--${type}`}>{ type }</label>
                    <input
                        id={ colorId }
                        type="color"
                        value={ props[type] }
                        onChange={ e => {
                            callbacks[type](e.target.value)
                        } }
                    />
                </>
            }) }
        </main>
    </section>
}

export default ColorsInspector
