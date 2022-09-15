<script lang="ts">
	import {onMount} from "svelte";

	export let keys = []
	export let selected = 0
	export let meta = {position: 0, distance: 0}
	$: select(selected)
	$: move_indicator(meta.position, meta.distance)

	let div: HTMLElement, indicator: HTMLElement
	let _keys_refs = new Array(keys.length)
	let delayed = true

	function select(index: number) {
		if (!_keys_refs[index]) return
		indicator.style.transition = 'all .35s ease-in-out'
		const target = _keys_refs[index]
		selected = index

		const middle_pos = target.offsetLeft + target.clientWidth / 2 - window.innerWidth / 2
		div.style.scrollSnapType = 'x mandatory'
		div.scrollTo({left: middle_pos, behavior: 'smooth'})

		indicator.style.left = `${target.offsetLeft}px`
		indicator.style.width = `${target.offsetWidth}px`
	}

	function scale(number, inMin, inMax, outMin, outMax) {
		return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
	}

	function move_indicator(pos: number, max_distance: number) {
		if (!indicator) return
		const selected_pos = _keys_refs[selected].offsetLeft
		const selected_width = _keys_refs[selected].offsetWidth

		indicator.style.transition = (pos === 0 ? 'all .35s ease-in-out' : '')
		indicator.style.scrollSnapType = (pos === 0 ? 'x mandatory' : '')

		if (pos === 0) {
			indicator.style.left = `${selected_pos}px`
			indicator.style.width = `${selected_width}px`
			return
		}
		if (pos < 0 && selected === keys.length - 1) return
		if (pos > 0 && selected === 0) return

		const target_pos = (pos < 0 ? _keys_refs[selected + 1].offsetLeft : _keys_refs[selected - 1].offsetLeft)
		const target_width = (pos < 0 ? _keys_refs[selected + 1].offsetWidth : _keys_refs[selected - 1].offsetWidth)

		let scale_pos, scale_width
		if (pos < 0) {
			scale_pos = scale(selected_pos - pos, selected_pos, selected_pos + max_distance, selected_pos, target_pos)
			scale_width = scale(selected_pos - pos, selected_pos, selected_pos + max_distance, selected_width, target_width)
		} else {
			scale_pos = scale(selected_pos - pos, selected_pos - max_distance, selected_pos, target_pos, selected_pos)
			scale_width = scale(selected_pos - pos, selected_pos - max_distance, selected_pos, target_width, selected_width)
		}

		indicator.style.left = `${scale_pos}px`
		indicator.style.width = `${scale_width}px`
	}

	onMount(() => {
		const target = _keys_refs[selected]
		const middle_pos = target.offsetLeft + target.clientWidth / 2 - window.innerWidth / 2
		div.style.scrollSnapType = 'x mandatory'

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
	     on:click={() => select(i)}
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
		/*scroll-snap-type: x mandatory;*/
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
		transition: all 0.35s ease-in-out;
		position: relative;
	}

	.active {
		color: #5486ce;
		transition: all .35s ease-in-out;
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
		/*transition: all .35s ease-in-out;*/
	}

	.hidden {
		display: none;
	}
</style>