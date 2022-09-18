import type {
    ILSystemSymbols,
    ILSystemWord,
    ILSystemRenderActionMap,
    ILSystemRenderDevice,
} from "./types"

export class Renderer<Alphabet extends ILSystemSymbols> {
    constructor(
        private actions_: ILSystemRenderActionMap<Alphabet>,
    ) { }

    render(
        word: ILSystemWord<Alphabet>,
        device: ILSystemRenderDevice,
    ) {
        word.forEach(symbol => {
            if (symbol in this.actions_) {
                const [action, ...args] = this.actions_[symbol]!
                ;(device[action] as Function).call(device, ...args)
            }
        })
    }
}
