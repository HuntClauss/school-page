<script lang="ts">
	import {onMount} from "svelte";

	export let keys = []
	export let selected = 0
	export let clicked = false
	$: select(selected)

	let div: HTMLElement, indicator: HTMLElement
	let _keys_refs = new Array(keys.length)
	let delayed = true

	let previous_timeout = null
	function select(index: number, click?: boolean) {
		if (!_keys_refs[index]) return
		const target = _keys_refs[index]

		if (click === true && previous_timeout)
			clearTimeout(previous_timeout)

		if (click === true) {
			clicked = true
			previous_timeout = setTimeout(() => clicked = false, 600)
		}

		selected = index

		const middle_pos = target.offsetLeft + target.clientWidth / 2 - window.innerWidth / 2
		div.scrollTo({left: middle_pos, behavior: 'smooth'})

		indicator.style.left = `${target.offsetLeft}px`
		indicator.style.width = `${target.offsetWidth}px`
	}

	onMount(() => {
		const target = _keys_refs[selected]
		const middle_pos = target.offsetLeft + target.clientWidth / 2 - window.innerWidth / 2
		div.scrollTo({left: middle_pos, behavior: 'auto'})

		indicator.style.left = `${target.offsetLeft}px`
		indicator.style.width = `${target.offsetWidth}px`
		delayed = false
	})


</script>

<svelte:window on:resize={_ => select(selected)}></svelte:window>

<div class="wrapper" bind:this={div}>
	<div class="spacer"></div>
	{#each keys as key, i}
		<div class="key"
		     bind:this={_keys_refs[i]}
		     class:active={selected === i}
		     on:click={_ => {select(i, true)}}
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