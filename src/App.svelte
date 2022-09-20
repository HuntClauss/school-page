<script lang="ts">

import DutyPage from "./page/DutyPage.svelte";
import {navbar} from "./store.js";
import HamburgerMenu from "./compontent/Navigation.svelte";
import {createHistory, Route, Router} from "svelte-navigator";
import createHashSource from "./hashrouter";
import SettingsPage from "./page/SettingsPage.svelte";
import HomePage from "./page/HomePage.svelte";


// @ts-ignore
const hash = createHistory(createHashSource());

</script>

<div class="container">
	<div class="navigation">
		<HamburgerMenu />
	</div>
	<div class="content" class:minimize={$navbar} on:click={_ => $navbar = false}>
		<Router history="{hash}">
			<Route path="/" primary="{false}" component="{HomePage}" />
			<Route path="/duties" primary="{false}" component="{DutyPage}" />
			<Route path="/settings" primary="{false}" component="{SettingsPage}" />
		</Router>
	</div>
</div>


<style>
	.container {
		overflow: hidden;
		height: 100vh;
		background-color: var(--background-4);
	}

	.navigation {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.announcement {
		margin-right: 1rem;
		padding: 5px 13px;
		background-color: #5486ce;
		border-radius: 40px;
		font-size: 12px;
		color: #dfdfdf;
	}

	.content {
		display: flex;
		height: 100%;
		box-sizing: border-box;
		padding-top: 60px;
		flex-direction: column;
		overflow: hidden;
		background-color: var(--background-1);
		transition: all .4s cubic-bezier(0.32, 0.77, 0.62, 1);
		position: relative;
		z-index: 2;
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