import * as React from "react"

interface IStepInspectorProps {
    steps: number
    onStepsChange: (steps: number) => void
}

const StepsInspector = ({ steps, onStepsChange }: IStepInspectorProps) => {
    return <section id="l-system--step-inspector">
        <header>
            <h2>Steps</h2>
            <input
                type="number"
                min="0"
                max="10"
                value={ steps }
                onChange={ e => {
                    onStepsChange(Number(e.target.value))
                } }
            />
        </header>
    </section>
}

export default StepsInspector