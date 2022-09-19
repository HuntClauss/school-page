import {writable} from "svelte/store";

const placeholder = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: []}

export const duties_accu = writable({
    0: placeholder,
    1: placeholder,
    2: placeholder,
    3: placeholder,
    4: placeholder,
})

export const announcement = writable('Aktualizacja: 09.09.2022 | 17:00')
export const default_filters = writable([])
export const navbar = writable(false)
export const language = writable('polski')
export const trans = writable(await import('../public/locales/polski.json'))