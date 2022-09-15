import {writable} from "svelte/store";

const placeholder = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: []}

export const duties_accu = writable({
    0: placeholder,
    1: placeholder,
    2: placeholder,
    3: placeholder,
    4: placeholder,
})

export const filters = writable([])