<script lang="ts">
	import {onMount} from "svelte";

	export let keys = []
	export let selected = keys[0] ?? ''
	let div
	let instascroll = true

	function select(e: PointerEvent) {
		const target = e.target as HTMLElement
		target.scrollIntoView({behavior: 'smooth', inline: 'center'})
		// const pos = target.getBoundingClientRect()

		// div.scrollLeft -= in_half - (pos.x + pos.width / 2)
	}

	onMount(() => {
		const target = document.querySelector('div.key.active') as HTMLElement
		target.scrollIntoView({behavior: 'auto', inline: 'center'})

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
		box-sizing: border-box;
		scroll-behavior: smooth;
		scroll-snap-type: x proximity;
		padding-bottom: 8px;
		/*scroll-snap-destination: 0 16px;*/
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
		font-weight: 100;
		font-size: 18px;
		scroll-snap-align: center;
		transition: all 0.2s ease-in-out;
		position: relative;
	}

	.active {
		color: #1E62C7;
		transition: all .2s ease-in-out;
	}

	.active:after {
		position: absolute;
		content: '';
		width: 100%;
		height: 2px;
		background-color: #1E62C7;
		bottom: -8px;
		left: 0;
		z-index: 1;
	}

	.spacer {
		min-width: 50vw;
		height: 100%;
	}
</style>