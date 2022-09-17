<script lang="ts">

import DutyPage from "./page/DutyPage.svelte";
import {navbar} from "./store.js";
import HamburgerMenu from "./compontent/HamburgerMenu.svelte";

function test() {
	change = !change
}

let change = false

</script>

<div class="container">
	<div class="navigation">
		<HamburgerMenu />
	</div>
	<div class="content" class:minimize={$navbar} on:click={_ => $navbar = false}>
		<DutyPage/>
	</div>
</div>


<style>
	.container {
		overflow: hidden;
		height: 100vh;
		background-color: #c1c1c1;
		position: relative;
	}

	.navigation {
		position: absolute;
	}

	.content {
		display: flex;
		height: 100%;
		box-sizing: border-box;
		padding-top: 60px;
		flex-direction: column;
		overflow: hidden;
		background-color: var(--background);
		transition: all .5s ease-in-out;
		z-index: 999;
	}

	.minimize {
		scale: 0.8;
		translate: 65% 0;
	}

</style>