<script lang="ts">
	import {duties_accu, filters} from "../store";
	import Icon from "./Icon.svelte";

	export let value = ''
	let collapsed = true
	let options = []

	let suggestions
	$: suggestions = show_suggestions(value), $filters

	duties_accu.subscribe(v => {
		let persons = new Set()
		let places = new Set()
		Object.values(v).forEach(day => {
			Object.values(day).forEach(time => {
				Object.values(time).forEach(entry => {
					places.add(entry.place)
					persons.add(entry.person)
				})
			})
		})

		options = [
			...[...persons].map(v => {return {name: v, icon: 'person.svg'}}),
			...[...places].map(v => {return {name: v[0].toUpperCase() + v.slice(1), icon: 'place.svg'}})
		]
	})

	function show_suggestions(val: string) {
		if (!val) return []
		const parts = val.toLowerCase().split(' ').map(v => v.trim()).filter(v => v)

		let result = []

		options.forEach((opt) => {
			if (result.length === 5) return
			if ($filters.includes(opt.name)) return

			const condition = parts.every(part => opt.name.toLowerCase().includes(part)) // AND filter
			// const condition = parts.some(part => opt.name.toLowerCase().includes(part)) // OR filter

			if (condition)
				result.push({value: opt.name, display: opt.name, icon: opt.icon})
		})

		result.forEach(res => {
			parts.forEach(part => {
				const start = res.display.toLowerCase().indexOf(part)
				const end = start + part.length

				if (start === -1) return
				res.display = res.display.substring(0, start) + `#^$%${res.display.substring(start, end)}%$^#` + res.display.substring(end)
			})

			// #^$% - magic pattern symbolizing the beginning of the span tag
			// %$^# - magic pattern symbolizing the end of the span tag
			res.display = res.display.replaceAll('#^$%', `<span style="color: #000">`).replaceAll('%$^#', `</span>`)
		})

		return result
	}

	function add_filter(name: string) {
		value = ''
		$filters = [...$filters, name]
	}

	function remove_filter(name: string) {
		$filters = $filters.filter(v => v !== name)
	}
</script>

<div class="wrapper" >
	<input type="text" placeholder="Filtruj..." bind:value on:focus={_ => collapsed = false} on:blur={_ => collapsed = true}>
	<div class="filter-list">
		{#each $filters as filter}
			<div class="filter" on:click={_ => remove_filter(filter)}>
				<span>{filter}</span>
				<Icon name="x.svg" width="18px" height="18px"/>
			</div>
		{/each}
	</div>
	<div class="suggestions" class:collapsed>
		{#each suggestions as item}
			<div class="item" on:click={_ => add_filter(item.value)}>
				<div class="vertical-center">
					<Icon name="{item.icon}" width="18px" height="18px"/>
					<span class="space-left">{@html item.display}</span>
				</div>
				<Icon name="plus.svg" width="24px" height="24px"/>
			</div>
		{/each}
	</div>
</div>

<style>
	.filter-list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 0.4rem;
	}

	.filter {
		background-color: #84C4F2;
		padding: 0.2rem 0.3rem 0.2rem 0.5rem;
		margin: 0.3rem 0.2rem 0 0;
		border-radius: 15px;
		font-size: 12px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.filter span {
		margin-right: 4px;
	}

	.filter:hover span {
		text-decoration: line-through;
	}

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
		top: 2.65rem;
		z-index: 999;
		overflow: hidden;
		transition: all .2s ease-in-out;
	}

	.item {
		border-bottom: 1px solid var(--background);
		padding: 0.5rem;
		cursor: pointer;
		color: #8E8E8E;
		display: flex;
		justify-content: space-between;
	}

	.item:last-child {
		border: none;
	}

	.vertical-center {
		display: flex;
		align-items: center;
	}

	.space-left {
		margin-left: 8px;
	}

	.collapsed {
		max-height: 0;
	}
</style>