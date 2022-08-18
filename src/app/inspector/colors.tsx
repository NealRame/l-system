import * as React from "react"

interface IColorsInspectorProps {
    backgroundColor: string
    onBackgroundColorChange: (color: string) => void

    color: string
    onColorChange: (color: string) => void
}

const ColorsInspector = ({
    backgroundColor,
    onBackgroundColorChange,
    color,
    onColorChange,
}: IColorsInspectorProps) => {
    return <section id="l-system--color-inspector">
        <header>
            <h2>Colors</h2>
        </header>
        <main>
            <label htmlFor="background">background</label>
            <input
                name="background"
                type="color"
                value={ backgroundColor }
                onChange={ e => {
                    onBackgroundColorChange(e.target.value)
                } }
            />
            <label htmlFor="foreground">foreground</label>
            <input
                name="foreground"
                type="color"
                value={ color }
                onChange={ e => {
                    onColorChange(e.target.value)
                } }
            />
        </main>
    </section>
}

export default ColorsInspector
