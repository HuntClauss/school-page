<script lang="ts">
	import {times} from "../const.js";
	import ExpandList from "./ExpandList.svelte";

	export let day = 0
	export let activeFilters = []

	let counting_list = new Array(times.length).fill(0)
	let output = 0
	$: is_empty(counting_list)

	function is_empty(list) {
		output = list.reduce((prV, crV) => prV + crV)
	}

</script>

{#each new Array(times.length) as _, index}
	<ExpandList dayKey="{day}" timeKey="{index}" bind:elements="{counting_list[index]}" activeFilters="{activeFilters}"/>
{/each}
{#if output === 0}
	<div class="message">Nie ma żadnych dyżurów</div>
{/if}

<style>
	.message {
		font-size: 20px;
		color: #5A5A5A;
		width: 100%;
		text-align: center;
		margin-top: 3rem;
	}
</style>