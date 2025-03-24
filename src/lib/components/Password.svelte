<script lang="ts">

    import {obiecte_tinute_in_mana as words} from '$lib/obiecte.json';
    import {FilteredList} from '$lib/stores'
    import {slide} from "svelte/transition";

    let code:number
    let passcode:string = $state("")

    function handleNumberPress(number:number) {
        if (passcode.length < 6) {
            passcode += number;
        }
        if (passcode.length == 6) {
            code = Number(passcode);


            //Check number of letters

            let NrLetters:number = Math.floor(code/100000);
            let NrFiltered:string[];

            if(NrLetters === 0){
                NrLetters=10
            }


            if(NrLetters > 1){
                NrFiltered = words.filter(word => word.length === NrLetters);
            }
            else {
                NrFiltered = words.filter(word => word.length >= 11 );
            }


            //Check position vowels

            let FirstVowel:number = (Math.floor(code/10000)%10);
            let SecondVowel:number = (Math.floor(code/1000)%10);
            let ThirdVowel:number = (Math.floor(code/100)%10);
            let ForthVowel:number = (Math.floor(code/10)%10);

            if (SecondVowel <= FirstVowel) {
                SecondVowel = FirstVowel;
            }

            if (ThirdVowel <= SecondVowel) {
                ThirdVowel = SecondVowel;
            }

            if (ForthVowel <= ThirdVowel) {
                ForthVowel = ThirdVowel;
            }

            const Vowels = ["a", "A", "I", "i", "U", "u", "O", "o", "E", "e", "Ă", "ă", "Î", "î", "â", "Â"];
            const positions: number[] = [...new Set([FirstVowel, SecondVowel, ThirdVowel, ForthVowel])];
            const NrAndVowels:string[] = NrFiltered.filter(word => {
                return positions.every(position => {
                    const char = word.charAt(position-1);
                    return Vowels.includes(char);
                });
            });



            //Check first letter

            const FirstLetter:number = code % 10;

            let ArrLetters:string[];

            if (FirstLetter === 1) {
                ArrLetters = ['a', 'e', 'f', 'h', 'i', 'k', 'l', 'm', 'n', 't', 'v', 'w', 'x', 'y', 'z', 'î' , 'ă', 'â' , 'ț']
            }
            if (FirstLetter === 2) {
                ArrLetters = ['b', 'd', 'g', 'p', 'q', 'r']

            }
            if (FirstLetter === 3) {
                ArrLetters = ['u', 'o', 's', 'j', 'c' , 'ș']
            }

            if(FirstLetter !== 0) {
                FilteredList.update(() =>
                    NrAndVowels.filter(word=>{return ArrLetters.includes(word[0]) }).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}))
                );

            }
            else {
                FilteredList.update(() =>
                    NrAndVowels.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}))
                );

            }

        }
    }

    function handleCancel() {
        passcode = "";
    }

</script>


{#if passcode.length < 6}
    <div class="background z-10 absolute h-full overflow-hidden w-full" transition:slide={{ duration: 200, axis: "y" }}>
        <div class="flex flex-col items-center justify-between h-screen text-white">

            <div class="mt-12 mb-8 h-[1rem] w-[1rem]">
                <svg width="1rem" height="1.25rem" viewBox="0 0 584 704" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M531.8 704H58.1996C26.1996 704 0.599609 678.4 0.599609 646.4V352C0.599609 320 32.5996 294.4 58.1996 294.4H525.4C563.8 294.4 583 320 583 352V646.4C589.4 678.4 563.8 704 531.8 704Z" fill="white"/>
                    <path d="M147.8 262.4V179.2C147.8 108.8 199 57.6 269.4 57.6H320.6C384.6 57.6 442.2 108.8 442.2 179.2V262.4H499.8V179.2C499.8 76.8 416.6 0 320.6 0H269.4C167 0 90.2002 83.2 90.2002 179.2V262.4H147.8Z" fill="white"/>
                </svg>
            </div>


            <div class="flex flex-col items-center flex-1 justify-center w-full px-6 -mt-20 ">
                <h1 class="text-2xl mb-8 mt-20">Enter Passcode</h1>

                <div class="flex gap-4 mb-16">
                    {#each Array(6) as _, index}
                        <div
                                class="w-4 h-4 rounded-full border border-white/50 {
            passcode.length > index ? 'bg-white' : 'bg-transparent'
          }"
                        ></div>
                    {/each}
                </div>


                <div class="grid grid-cols-3 gap-6 mb-8 ">
                    {#each [
                        { num: 1, letters: "" },
                        { num: 2, letters: "ABC" },
                        { num: 3, letters: "DEF" },
                        { num: 4, letters: "GHI" },
                        { num: 5, letters: "JKL" },
                        { num: 6, letters: "MNO" },
                        { num: 7, letters: "PQRS" },
                        { num: 8, letters: "TUV" },
                        { num: 9, letters: "WXYZ" }
                    ] as item}
                        <button
                                ontouchstart={() => handleNumberPress(item.num)}
                                class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex flex-col items-center justify-center"
                        >
                            <span class="text-3xl font-light">{item.num}</span>
                            {#if item.letters}
                                <span class="text-[10px] mt-0.5">{item.letters}</span>
                            {/if}
                        </button>
                    {/each}
                    <div class="col-start-2">
                        <button
                                ontouchstart={() => handleNumberPress(0)}
                                class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
                        >
                            <span class="text-3xl font-light">0</span>
                        </button>
                    </div>
                </div>
            </div>


            <div class="w-full px-8 pb-8 flex justify-between items-center">
                <button class="text-lg font-normal">Emergency</button>
                <button ontouchstart={handleCancel} class="text-lg font-normal">Cancel</button>
            </div>


            <div class="w-32 h-1 bg-white/80 rounded-full mb-2"></div>
        </div>
    </div>
{/if}

<style>

    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .background{
        background-image: url("$lib/assets/Password2.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        backdrop-filter: blur(10px);
    }
    button {
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    }

</style>