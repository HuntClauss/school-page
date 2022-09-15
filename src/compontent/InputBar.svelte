<script lang="ts">
	import {duties_accu, filters} from "../store";

	export let value = ''
	let collapsed = true
	let options = []

	let suggestions
	$: suggestions = show_suggestions(value), $filters

	duties_accu.subscribe(v => {
		let result = new Set()
		Object.values(v).forEach(day => {
			Object.values(day).forEach(time => {
				Object.values(time).forEach(entry => {
					result.add(entry.place)
					result.add(entry.person)
				})
			})
		})
		options = [...result]
	})

	function show_suggestions(val: string) {
		if (!val) return []
		const parts = val.toLowerCase().split(' ')

		let result = []
		options.forEach((opt) => {
			if (result.length === 4) return

			if (!$filters.includes(opt) && parts.some(part => opt.toLowerCase().includes(part))) {
				result.push({value: opt, display: opt})
			}
		})

		result.forEach(res => {
			parts.forEach(part => {
				const start = res.display.toLowerCase().indexOf(part)
				const end = start + part.length
				res.display = res.display.substring(0, start) + `<span style="color: #000">${res.display.substring(start, end)}</span>` + res.display.substring(end)
			})
		})

		return result
	}

	function add_filter(name) {
		$filters = [...$filters, name]
	}
</script>

<div class="wrapper" >
	<input type="text" placeholder="Filtruj..." bind:value on:focus={_ => collapsed = false} on:blur={_ => collapsed = true}>
	<div class="suggestions" class:collapsed>
		{#each suggestions as item}
			<div class="item" on:click={() => add_filter(item.value)}>{@html item.display}</div>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		position: relative;
	}

	input {
		width: 100%;
		border: none;
		outline: none;
		border-radius: 6px;
		padding: 0.7rem;
		box-sizing: border-box;
		background-color: #F4F4F4;
	}

	.suggestions {
		position: absolute;
		max-height: 100vh;
		width: 100%;
		background-color: #F4F4F4;
		margin-top: 0.6rem;
		z-index: 999;
		overflow: hidden;
		transition: all .2s ease-in-out;
	}

	.item {
		border-bottom: 1px solid var(--background);
		padding: 0.5rem;
		color: #8E8E8E;
	}

	.item:last-child {
		border: none;
	}

	.collapsed {
		max-height: 0;
	}
</style>