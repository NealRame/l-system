import {
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit"

import type {
    ILSystemRules,
    ILSystemSymbols,
    ILSystemTurtleActions,
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
interface IRulesState {
    value: Partial<ILSystemRules>
}

const rulesSlice = createSlice({
    name: "rules",
    initialState: {
        value: {},
    } as IRulesState,
    reducers: {
        updateRules: (state, action: PayloadAction<Partial<ILSystemRules>>) => {
            const { payload: rules } = action
            state.value = {
                ...state.value,
                ...rules,
            }
        },
        setRules: (state, action: PayloadAction<Partial<ILSystemRules>>) => {
            const { payload: rules } = action
            state.value = rules
        },
    },
})

export const {
    updateRules,
    setRules
} = rulesSlice.actions

export const selectRules = (state: RootState) => state.rules.value

export const rulesReducer = rulesSlice.reducer

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
interface IActionsState {
    value: Partial<ILSystemTurtleActions>
}

const actionsSlice = createSlice({
    name: "actions",
    initialState: {
        value: {},
    } as IActionsState,
    reducers: {
        updateActions: (state, action: PayloadAction<Partial<ILSystemTurtleActions>>) => {
            const { payload: actions } = action
            state.value = {
                ...state.value,
                ...actions,
            }
        },
        setActions: (state, action: PayloadAction<Partial<ILSystemTurtleActions>>) => {
            const { payload: actions } = action
            state.value = actions
        },
    },
})

export const { updateActions, setActions } = actionsSlice.actions

export const selectActions = (state: RootState) => state.actions.value

export const actionsReducer = actionsSlice.reducer

/******************************************************************************
 * Renderer options slice
 *****************************************************************************/
interface RendererOptionsState {
    backgroundColor: string,
    strokeColor: string,
    strokeThickness: number,
    padding: number,
}

const rendererOptionsSlice = createSlice({
    name: "renderingOptions",
    initialState: {
        backgroundColor: "#000000",
        strokeColor: "#ffffff",
        strokeThickness: 1,
        padding: 8,
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
