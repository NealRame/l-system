import * as React from "react"

interface IRenderingOptionsInspectorProps {
    backgroundColor: string
    onBackgroundColorChange: (color: string) => void

    strokeColor: string
    onStrokeColorChange: (color: string) => void

    strokeThickness: number
    onStrokeThicknessChange: (thickness: number) => void

    padding: number
    onPaddingChange: (padding: number) => void
}

const RenderingOptionsInspector = (props: IRenderingOptionsInspectorProps) => {
    const id = "l-system--colors-inspector"
    const labels = {
        backgroundColor: "background color",
        strokeColor: "stroke color",
        strokeThickness: "stroke thickness",
        padding: "padding",
    }
    const callbacks = {
        backgroundColor: props.onBackgroundColorChange,
        strokeColor: props.onStrokeColorChange,
        strokeThickness: props.onStrokeThicknessChange,
        padding: props.onPaddingChange,
    }
    return <section id={ id }>
        <header>
            <h2>Rendering options</h2>
        </header>
        <main>
            { (["backgroundColor", "strokeColor"] as const).map(type => {
                const colorId = `${ id }--${ type }`
                return <React.Fragment key={ type }>
                    <label htmlFor={ `${id}--${type}`}>{ labels[type] }</label>
                    <input
                        id={ colorId }
                        type="color"
                        value={ props[type] }
                        onChange={ e => {
                            callbacks[type](e.target.value)
                        } }
                    />
                </React.Fragment>
            }) }
            <label htmlFor={ `${id}--strokeThickness`}>{ labels.strokeThickness }</label>
            <input
                id={ `${id}--strokeThickness` }
                type="number"
                min={ 0.1 }
                max={ 10 }
                step={ 0.1 }
                value={ props.strokeThickness }
                onChange={ e => {
                    callbacks.strokeThickness(parseFloat(e.target.value))
                } }
            />
            <label htmlFor={ `${id}--padding`}>{ labels.padding }</label>
            <input
                id={ `${id}--padding` }
                type="number"
                min={ 0 }
                value={ props.padding }
                onChange={ e => {
                    callbacks.padding(parseFloat(e.target.value))
                } }
            />
        </main>
    </section>
}

export default RenderingOptionsInspector
