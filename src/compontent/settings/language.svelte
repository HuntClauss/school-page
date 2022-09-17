<script lang="ts">

	import Icon from "../Icon.svelte";
	import {trans} from "../../store";
	import {language} from "../../store.js";

	export let close
	let selected = $language
	const lang = $trans["settings_opts"]["language"]

	const options = [
		{flag: 'poland.svg', value: 'polski', display: 'Polski'},
		{flag: 'english.svg', value: 'english', display: 'English'},
		{flag: 'ukrainian.svg', value: 'ukrainian', display: 'український'},
	]

</script>

<div class="wrapper">
	<div class="top-bar" on:click={close}>
		<Icon name="chevron-left.svg"/>
	</div>
	<div class="header">{lang.header}</div> <!-- get text based on selected language -->
	<div class="description">{lang.description}</div>
	<hr>
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

	.top-bar {
		width: fit-content;
		margin-bottom: 1rem;
	}

	.header {
		width: 100%;
		font-size: 30px;
	}

	.description {
		margin-top: 12px;
		margin-left: 5px;
		font-size: 14px;
		color: #5A5A5A;
	}

	.option, label {
		display: flex;
		gap: 10px;
		align-items: center;
		width: 100%;
	}

	.option {
		/*background-color: #ebeaeb;*/
		margin-bottom: 15px;
	}

	.radio {
		content: ''
	}
</style>