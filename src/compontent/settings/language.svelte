<script lang="ts">

	import Icon from "../Icon.svelte";
	import {trans} from "../../store";
	import {language} from "../../store.js";
	import Topbar from "./Topbar.svelte";

	export let close
	let selected = $language
	const lang = $trans["settings_opts"]["language"]

	const options = [
		{flag: 'poland.svg', value: 'polski', display: 'Polski'},
		// {flag: 'english.svg', value: 'english', display: 'English'},
		// {flag: 'ukrainian.svg', value: 'ukrainian', display: 'український'},
	]

</script>

<div class="wrapper">
	<Topbar header="{lang.header}" description="{lang.description}" close="{close}" />
	<div class="languages">
		{#each options as opt}
			<div class="option">
				<input type="radio" bind:group={selected} name="lang" value="{opt.value}" id="{opt.value}"/>
				<label for="{opt.value}">
					<Icon name="flags/{opt.flag}" width="30px" height="30px"/>
					{opt.display}
				</label>
			</div>
		{/each}
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;
	}

	.option, label {
		display: flex;
		gap: 10px;
		align-items: center;
		width: 100%;
	}

	.option {
		margin-bottom: 15px;
	}
</style>