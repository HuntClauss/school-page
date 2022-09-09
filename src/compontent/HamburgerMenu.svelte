<script lang="ts">

	export let enabled = false

</script>

<div class="hamburger-menu">
	<div class="hamburger-line"></div>
	<div class="hamburger-line"></div>
	<div class="hamburger-line"></div>
</div>

<nav>
	<slot />
</nav>

<style>

	.hamburger-line {
		content: '';
		width: 35px;
		height: 4px;
		border-radius: 30px;
		background-color: #676767;
		margin: 0.5rem;
	}

	.hamburger-menu {
		cursor: pointer;
	}

</style>