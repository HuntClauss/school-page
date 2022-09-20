<script lang="ts">

import {navbar} from "../store.js";
</script>

<div class="hamburger-menu" class:active={$navbar} on:click={_ => $navbar = !$navbar}>
	<div class="hamburger-line"></div>
	<div class="hamburger-line"></div>
	<div class="hamburger-line"></div>
</div>

<nav class:active={$navbar}>
	<a href="#/" on:click={_ => $navbar = false}>Strona Główna</a>
	<a href="#/plan" on:click={_ => $navbar = false}>Plany Nauczycieli</a>
	<a href="#/duties" on:click={_ => $navbar = false}>Plan Dyżurów</a>
	<a href="#/settings" on:click={_ => $navbar = false}>Ustawienia</a>
</nav>

<style lang="scss">
	.hamburger-menu {
		cursor: pointer;
		pointer-events: all;
		width: fit-content;
		position: relative;
		left: 5px;
		top: 5px;
		padding: 0.5rem;
		z-index: 999999;

		&.active > * {
			&:nth-child(1) {
				rotate: 45deg;
				translate: 0 12px;
			}

			&:nth-child(2) {
				opacity: 0;
			}

			&:nth-child(3) {
				rotate: -45deg;
				translate: 0 -12px;
			}
		}
	}

	.hamburger-line {
		content: '';
		width: 35px;
		height: 4px;
		border-radius: 30px;
		background-color: var(--hamburger-color);
		margin: 0.5rem;
		transition: all .2s ease-in-out;
	}

	nav {
		position: absolute;
		top: 0;
		left: 20px;
		font-size: 20px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	a {
		color: unset;
		text-decoration: none;
		width: 100%;
		overflow: hidden;
		display: block;
		white-space: nowrap;
		margin: 1rem 0;
		padding: 1rem 0;
		cursor: pointer;
	}
</style>