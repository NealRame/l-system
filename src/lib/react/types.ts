import type {
    ILSystemWord,
    ILSystemSymbols,
    ILSystemProductionRulesMap,
    ILSystemRenderingRulesMap,
} from "../../lib"

export interface ILSystemRendererComponentProps<Alphabet extends ILSystemSymbols> {
    axiom: ILSystemWord<Alphabet>
    productionRules: ILSystemProductionRulesMap<Alphabet>
    steps: number
    renderingRules: ILSystemRenderingRulesMap<Alphabet>
    backgroundColor?: string
    strokeColor?: string
    strokeThickness?: number
    padding?: number
}
