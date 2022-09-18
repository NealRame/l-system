import {
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit"

import type {
    ILSystemProductionRulesMap,
    ILSystemSymbols,
    ILSystemRenderingRulesMap,
    ILSystemWord,
} from "../lib"

import type {
    RootState
} from "./store"

/******************************************************************************
 * Alphabet slice
 *****************************************************************************/
interface IAlphabetState {
    value: ILSystemWord
}

const alphabetSlice = createSlice({
    name: "alphabet",
    initialState: {
        value: [],
    } as IAlphabetState,
    reducers: {
        addSymbol: (state, action: PayloadAction<ILSystemSymbols>) => {
            const { payload: symbol } = action
            if (!state.value.includes(symbol)) {
                state.value = [...state.value, symbol].sort()
            }
        },
        removeSymbol: (state, action: PayloadAction<ILSystemSymbols>) => {
            const { payload: symbol } = action
            if (state.value.includes(symbol)) {
                state.value = state.value.filter(s => s !== symbol)
            }
        },
        toggleSymbol: (state, action: PayloadAction<ILSystemSymbols>) => {
            const { payload: symbol } = action
            if (state.value.includes(symbol)) {
                state.value = state.value.filter(s => s !== symbol)
            } else {
                state.value = [...state.value, symbol].sort()
            }
        }
    },
})

export const {
    addSymbol,
    removeSymbol,
    toggleSymbol,
} = alphabetSlice.actions

export const selectAlphabet = (state: RootState) => state.alphabet.value

export const alphabetReducer = alphabetSlice.reducer

/******************************************************************************
 * Rules slice
 *****************************************************************************/
interface IProductionRulesState {
    value: ILSystemProductionRulesMap
}

const rulesSlice = createSlice({
    name: "productionRules",
    initialState: {
        value: {},
    } as IProductionRulesState,
    reducers: {
        updateProductionRules: (state, action: PayloadAction<ILSystemProductionRulesMap>) => {
            const { payload: rules } = action
            state.value = {
                ...state.value,
                ...rules,
            }
        },
        setProductionRules: (state, action: PayloadAction<ILSystemProductionRulesMap>) => {
            const { payload: rules } = action
            state.value = rules
        },
    },
})

export const {
    updateProductionRules,
    setProductionRules
} = rulesSlice.actions

export const selectProductionRules = (state: RootState) => state.productionRules.value

export const productionRulesReducer = rulesSlice.reducer

/******************************************************************************
 * Generator options slice
 *****************************************************************************/
interface GeneratorOptionsState {
    axiom: ILSystemWord,
    steps: number,
}

const generatorOptionsSlice = createSlice({
    name: "generatorOptions",
    initialState: {
        axiom: [],
        steps: 0,
    } as GeneratorOptionsState,
    reducers: {
        updateGeneratorOptions: (state, action: PayloadAction<Partial<GeneratorOptionsState>>) => {
            const { payload: options } = action
            Object.assign(state, options)
        },
    },
})

export const {
    updateGeneratorOptions,
} = generatorOptionsSlice.actions

export const selectGeneratorOptions = (state: RootState) => state.generatorOptions

export const generatorOptionsReducer = generatorOptionsSlice.reducer

/******************************************************************************
 * Actions slice
 *****************************************************************************/
interface IRenderingRulesState {
    value: ILSystemRenderingRulesMap
}

const renderingRulesSlice = createSlice({
    name: "renderingRules",
    initialState: {
        value: {},
    } as IRenderingRulesState,
    reducers: {
        updateRenderingRules: (state, action: PayloadAction<ILSystemRenderingRulesMap>) => {
            const { payload: rules } = action
            state.value = {
                ...state.value,
                ...rules,
            }
        },
        setRenderingRules: (state, action: PayloadAction<ILSystemRenderingRulesMap>) => {
            const { payload: rules } = action
            state.value = rules
        },
    },
})

export const {
    updateRenderingRules,
    setRenderingRules,
} = renderingRulesSlice.actions

export const selectRenderingRules = (state: RootState) => state.renderingRules.value

export const renderingRulesReducer = renderingRulesSlice.reducer

/******************************************************************************
 * Renderer options slice
 *****************************************************************************/
interface RendererOptionsState {
    backgroundColor: string,
    strokeColor: string,
    strokeThickness: number,
    padding: number,
    renderer: "svg" | "canvas",
}

const rendererOptionsSlice = createSlice({
    name: "renderingOptions",
    initialState: {
        backgroundColor: "#000000",
        strokeColor: "#ffffff",
        strokeThickness: 1,
        padding: 8,
        renderer: "svg",
    } as RendererOptionsState,
    reducers: {
        updateRenderingOptions: (state, action: PayloadAction<Partial<RendererOptionsState>>) => {
            const { payload: options } = action
            Object.assign(state, options)
        },
    },
})

export const {
    updateRenderingOptions,
} = rendererOptionsSlice.actions

export const selectRenderingOptions = (state: RootState) => state.rendererOptions

export const rendererOptionsReducer = rendererOptionsSlice.reducer
