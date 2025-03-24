<script lang="ts">
    import {FilteredList} from "$lib/stores"
    import { onDestroy } from "svelte";

    let filteredListValue:string[] = [];
    let originalList:string[] = [];  // Store original list

    const unsubscribe = FilteredList.subscribe(value => {
        filteredListValue = value;
        originalList = value;
    });

    onDestroy(unsubscribe);


    $: AllUniqueFirstLetters = [...new Set(originalList.map(word => word[0]))];


    function filterByLetter(letter: string) {

        if (filteredListValue.length < originalList.length &&
            filteredListValue.every(word => word[0] === letter)) {
            filteredListValue = originalList;
        } else {
            filteredListValue = originalList.filter(word => word[0] === letter);
        }
    }
</script>

<div class="background h-[100lvh] w-full flex flex-col overflow-hidden relative z-0 ">
    <div class="h-auto w-full text-gray-400 text-wrap absolute top-0 left-0 ">{filteredListValue}</div>
    <div class="h-auto flex w-full text-gray-400 text-wrap absolute bottom-[15%] left-0">
        {#each AllUniqueFirstLetters as letter}
            <button
                    class="text-gray-600 text-xl m-2"
                    on:click={() => filterByLetter(letter)}
            >
                {letter}
            </button>
        {/each}
    </div>
</div>

<style>
    .background {
        background-repeat: no-repeat;
        background-image: url("$lib/assets/Landing-screen.png");
        background-size: 100% 100%;
    }
</style>