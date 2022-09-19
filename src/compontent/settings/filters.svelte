<script lang="ts">

	import {trans} from "../../store";
	import Topbar from "./Topbar.svelte";
	import InputBar from "../InputBar.svelte";
	import {default_filters} from "../../store.js";

	export let close
	const lang = $trans["settings_opts"]["filters"]

</script>

<div class="wrapper">
	<Topbar header="{lang.header}" description="{lang.description}" close="{close}" />
	<InputBar bind:activeFilters={$default_filters} />
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;
	}
</style>