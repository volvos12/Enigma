import {writable , type Writable} from "svelte/store";
export const FilteredList:Writable<string[]> = writable([]);