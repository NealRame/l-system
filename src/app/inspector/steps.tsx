import * as React from "react"

interface IStepInspectorProps {
    steps: number
    max?: number
    onStepsChange: (steps: number) => void
}

const StepsInspector = ({ steps, max, onStepsChange }: IStepInspectorProps) => {
    return <section id="l-system--step-inspector">
        <header>
            <label htmlFor="l-system--step-inspector-input">
                <h2>Steps</h2>
            </label>
            <input
                id="l-system--step-inspector-input"
                type="number"
                min="0"
                max={ max ?? 10}
                value={ steps }
                onChange={ e => {
                    onStepsChange(Number(e.target.value))
                } }
            />
        </header>
    </section>
}

export default StepsInspector