<script lang="ts">

import DutyPage from "./page/DutyPage.svelte";
import {navbar} from "./store.js";
import HamburgerMenu from "./compontent/HamburgerMenu.svelte";
import {createHistory, Route, Router} from "svelte-navigator";
import createHashSource from "./hashrouter";
import SettingsPage from "./page/SettingsPage.svelte";


// @ts-ignore
const hash = createHistory(createHashSource());

</script>

<div class="container">
	<div class="navigation">
		<HamburgerMenu />
	</div>
	<div class="content" class:minimize={$navbar} on:click={_ => $navbar = false}>
		<Router history="{hash}">
			<Route path="/duties" primary="{false}"><DutyPage/></Route>
			<Route path="/settings" primary="{false}"><SettingsPage/></Route>
		</Router>
	</div>
</div>


<style>
	.container {
		overflow: hidden;
		height: 100vh;
		background-color: #c1c1c1;
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
	}

	.minimize {
		scale: 0.8;
		translate: min(65%, 300px) 0;
		border-radius: 20px;
		-webkit-box-shadow: -2px 11px 29px -9px rgba(0,0,0,0.75);
		-moz-box-shadow: -2px 11px 29px -9px rgba(0,0,0,0.75);
		box-shadow: -2px 11px 29px -9px rgba(0,0,0,0.75);
	}

</style>