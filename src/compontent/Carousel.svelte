<script lang="ts">
	import {onMount} from "svelte";

	export let keys = []
	export let selected = keys[0] ?? ''
	let div, indicator
	let delayed = true

	function select(e: PointerEvent) {
		const target = e.target as HTMLElement
		target.scrollIntoView({behavior: 'smooth', inline: 'center'})

		indicator.style.left = `${target.offsetLeft}px`
		indicator.style.width = `${target.offsetWidth}px`
	}

	onMount(() => {
		const target = document.querySelector('div.key.active') as HTMLElement
		target.scrollIntoView({behavior: 'auto', inline: 'center'})

		indicator.style.left = `${target.offsetLeft}px`
		indicator.style.width = `${target.offsetWidth}px`
		delayed = false
	})

</script>

<div class="wrapper" bind:this={div}>
	<div class="spacer"></div>
	{#each keys as key}
		<div class="key"
		     class:active={selected === key}
		     on:click={e => {selected = key; select(e)}}
		>{key}</div>
	{/each}
	<div class="spacer"></div>
	<div class="indicator" bind:this={indicator} class:hidden={delayed}></div>
</div>


<style>
	.wrapper {
		display: flex;
		overflow-y: auto;
		box-sizing: border-box;
		scroll-snap-type: x proximity;
		padding-bottom: 8px;
		position: relative;
	}

	.wrapper::-webkit-scrollbar {
		display: none;
	}

	.key {
		text-transform: uppercase;
		margin: 0 2rem;
		cursor: pointer;
		font-weight: 200;
		font-size: 26px;
		scroll-snap-align: center;
		transition: all 0.2s ease-in-out;
		position: relative;
	}

	.active {
		color: #5486ce;
		transition: all .2s ease-in-out;
	}

	.spacer {
		min-width: 50vw;
		height: 100%;
	}

	.indicator {
		content: '';
		position: absolute;
		width: 100px;
		height: 3px;
		background-color: #1E62C7;
		bottom: 0;
		left: 0;
		z-index: 2;
		transition: all .2s ease-in-out;
	}

	.hidden {
		display: none;
	}
</style>