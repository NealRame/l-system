import * as React from "react"

import {
    useAppSelector,
    useAppDispatch,
} from "../hooks"

import {
    selectRenderingOptions,
    updateRenderingOptions,
} from "../slices"

const RenderingOptionsInspector = () => {
    const renderingOptions = useAppSelector(selectRenderingOptions)
    const dispatch = useAppDispatch()

    const id = "l-system--colors-inspector"
    const labels = {
        backgroundColor: "background color",
        strokeColor: "stroke color",
        strokeThickness: "stroke thickness",
        padding: "padding",
    }
    const callbacks = {
        backgroundColor: (color: string) => {
            dispatch(updateRenderingOptions({
                backgroundColor: color,
            }))
        },
        strokeColor: (color: string) => {
            dispatch(updateRenderingOptions({
                strokeColor: color,
            }))
        },
        strokeThickness: (thickness: number) => {
            dispatch(updateRenderingOptions({
                strokeThickness: thickness,
            }))
        },
        padding: (padding: number) => {
            dispatch(updateRenderingOptions({
                padding,
            }))
        },
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
                        value={ renderingOptions[type] }
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
                value={ renderingOptions.strokeThickness }
                onChange={ e => {
                    callbacks.strokeThickness(parseFloat(e.target.value))
                } }
            />
            <label htmlFor={ `${id}--padding`}>{ labels.padding }</label>
            <input
                id={ `${id}--padding` }
                type="number"
                min={ 0 }
                value={ renderingOptions.padding }
                onChange={ e => {
                    callbacks.padding(parseFloat(e.target.value))
                } }
            />
        </main>
    </section>
}

export default RenderingOptionsInspector
