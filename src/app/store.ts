import {
    configureStore,
} from '@reduxjs/toolkit'


import {
    alphabetReducer as alphabet,
    rulesReducer as rules,
    generatorOptionsReducer as generatorOptions,
    actionsReducer as actions,
    rendererOptionsReducer as rendererOptions
} from "./slices"

const store = configureStore({
    reducer: {
        alphabet,
        rules,
        generatorOptions,
        actions,
        rendererOptions,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
