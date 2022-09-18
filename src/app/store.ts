import {
    configureStore,
} from '@reduxjs/toolkit'


import {
    alphabetReducer as alphabet,
    productionRulesReducer as productionRules,
    generatorOptionsReducer as generatorOptions,
    renderingRulesReducer as renderingRules,
    rendererOptionsReducer as rendererOptions
} from "./slices"

const store = configureStore({
    reducer: {
        alphabet,
        productionRules,
        generatorOptions,
        renderingRules,
        rendererOptions,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
