<script lang="ts">
	export let value = ''
</script>

<div>
	<input type="text" placeholder="Filtruj..." bind:value>
</div>

<style>

	input {
		width: 100%;
		border: none;
		outline: none;
		border-radius: 6px;
		padding: 0.7rem;
		box-sizing: border-box;
	}
</style>