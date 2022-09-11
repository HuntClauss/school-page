<script lang="ts">

	import HamburgerMenu from "../compontent/HamburgerMenu.svelte";
	import InputBar from "../compontent/InputBar.svelte";
	import Carousel from "../compontent/Carousel.svelte";
	import {times, working_days} from '../const'
	import ExpandList from "../compontent/ExpandList.svelte";
	import {onMount} from "svelte";
	import {duties_accu} from "../store"

	let filter = ''
	let selected_index = default_selection()
	let _duties_ref = new Array(working_days.length)
	let div: HTMLElement
	let clicked = false
	let moving = false

	$: change_day(selected_index)

	function default_selection() {
		const curr_day = new Date().getDay()
		return (1 < curr_day && curr_day < 6) ? curr_day - 1 : 2
	}

	function change_day(index: number) {
		if (!_duties_ref[index] || moving) return
		div.scrollTo({left: _duties_ref[index].offsetLeft, behavior: 'smooth'})
	}

	onMount(async () => {
		div.scrollTo({left: _duties_ref[selected_index].offsetLeft, behavior: 'auto'})
		const resp = await fetch('/data/duties.json')
		$duties_accu = await resp.json()
	})

	const margin = 0
	function swipe_day(e: Event) {
		if (clicked) return
		const curr_pos = (e.target as HTMLElement).scrollLeft
		const middle = window.innerWidth / 2

		moving = false
		for (let i = 0; i < _duties_ref.length; i++) {
			const panel = _duties_ref[i]
			if (selected_index != i && boundCheck(curr_pos + middle, panel.offsetLeft, panel.clientWidth, margin)) {
					moving = true
					selected_index = i
			}
		}
	}

	function boundCheck(current: number, start: number, width: number, margin: number): boolean {
		return (current > start - margin && current < start + width + margin)
	}

</script>

<div class="wrapper">
	<div class="navigation">
		<HamburgerMenu></HamburgerMenu>
	</div>
	<div class="filter-wrapper">
		<InputBar bind:value={filter}/>
	</div>
	<div class="day-selector">
		<Carousel keys="{working_days}" bind:selected="{selected_index}" bind:clicked={clicked}/>
	</div>
	<div class="plan-wrapper" bind:this={div} on:scroll={swipe_day}>
		{#each Object.keys(working_days) as _, day}
			<div class="duties" bind:this={_duties_ref[day]}>
				{#each Object.keys(times) as _, time}
					<ExpandList dayKey={day} timeKey="{time}"/>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.plan-wrapper {
		display: flex;
		overflow-y: auto;
		scroll-snap-type: x mandatory;
	}

	.plan-wrapper::-webkit-scrollbar {
		display: none;
	}

	.duties {
		min-width: 100vw;
		scroll-snap-align: center;
		margin: 0 1rem;
		scroll-snap-stop: always;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.navigation {
		width: 100%;
		display: flex;
		justify-content: right;
		padding: 0.7rem;
		box-sizing: border-box;
	}

	.filter-wrapper {
		width: 100%;
		box-sizing: border-box;
		padding: 1rem;
		margin-bottom: 4rem;
	}

	.day-selector {
		display: flex;
	}

</style>