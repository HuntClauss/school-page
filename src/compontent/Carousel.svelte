<script lang="ts">
	import {onMount} from "svelte";

	export let keys = []
	export let selected = keys[0]
	let div
	let instascroll = true

	const in_half = window.innerWidth / 2

	function select(e: PointerEvent) {
		const target = e.target as HTMLElement
		const pos = target.getBoundingClientRect()

		div.scrollLeft -= in_half - (pos.x + pos.width / 2)
	}

	onMount(() => {
		const target = document.querySelector('div.key.active') as HTMLElement
		const pos = target.getBoundingClientRect()

		div.scrollLeft -= in_half - (pos.x + pos.width / 2)
		instascroll = false
	})

</script>

<div class="wrapper" bind:this={div} class:instascroll>
	<div class="spacer"></div>
	{#each keys as key}
		<div class="key"
		     class:active={selected === key}
		     on:click={e => {selected = key; select(e)}}
		>{key}</div>
	{/each}
	<div class="spacer"></div>
</div>

<style>
	.wrapper {
		display: flex;
		overflow-y: auto;
		padding: 0.5rem 0;
		scroll-behavior: smooth;
	}

	.instascroll {
		scroll-behavior: unset;
	}

	.wrapper::-webkit-scrollbar {
		display: none;
	}

	.key {
		text-transform: uppercase;
		margin: 0 2rem;
		cursor: pointer;
		transition: all 0.1s ease-in-out;
		font-weight: 100;
		font-size: 18px;
	}

	.active {
		transform: scale(1.75);
	}

	.spacer {
		min-width: 50vw;
		height: 100%;
	}
</style>