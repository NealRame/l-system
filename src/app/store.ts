import {
    configureStore,
} from '@reduxjs/toolkit'


import {
    alphabetReducer as alphabet,
    productionRulesReducer as productionRules,
    productionOptionsReducer as productionOptions,
    renderingRulesReducer as renderingRules,
    rendererOptionsReducer as rendererOptions
} from "./slices"

const store = configureStore({
    reducer: {
        alphabet,
        productionRules,
        productionOptions,
        renderingRules,
        rendererOptions,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
