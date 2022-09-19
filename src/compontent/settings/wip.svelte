<script lang="ts">

	import Topbar from "./Topbar.svelte";
	export let close


</script>

<div class="wrapper">
	<Topbar close="{close}"/>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;
	}
</style>