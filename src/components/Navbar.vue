<template>
    <div class="navbar font-roboto-slab" v-if="!isMobile">
        <router-link
            :to="{ name: 'index' }"
            class="nav-item"
            id="nav-icon"
            href=""
        >
            <TerminalIcon />
        </router-link>

        <span class="nav-sep small-seperator"></span>

        <router-link :to="{ name: 'index', hash: '#about' }" class="nav-item">
            About
        </router-link>

        <span class="nav-sep small-seperator"></span>
        
        <router-link :to="{ name: 'index', hash: '#projects' }" class="nav-item">
            Projects
        </router-link>

        <span class="nav-sep small-seperator"></span>
 
        <router-link :to="{ name: 'index', hash: '#other' }" class="nav-item">
            Other
        </router-link>

        <span class="nav-sep small-seperator"></span>
 
        <a href="https://dev.to/d3r1n" class="nav-item">Blog</a>

        <span class="nav-sep small-seperator"></span>
 
        <button class="nav-item" id="theme-toggle" @click="toggleTheme">
            <SunIcon v-if="!theme" />
            <MoonIcon v-else />
        </button>
    </div>

    <div class="navbar font-roboto-slab" v-else>
        <router-link
            :to="{ name: 'index' }"
            class="nav-item"
            id="nav-icon"
            href=""
        >
            <TerminalIcon />
        </router-link>

        <span class="nav-sep small-seperator"></span>
 
        <a href="https://dev.to/d3r1n" class="nav-item">Blog</a>

        <span class="nav-sep small-seperator"></span>

        <button class="nav-item" id="theme-toggle" @click="toggleTheme">
            <SunIcon v-if="!theme" />
            <MoonIcon v-else />
        </button>
    </div>
</template>

<script setup lang="ts">
import MoonIcon from "~/assets/icons/icon-moon.vue"
import SunIcon from "~/assets/icons/icon-sun.vue"
import TerminalIcon from "~/assets/icons/icon-terminal.vue"

import { useAppState } from "~/composables/app-state"
const { theme, toggleTheme, isMobile } = useAppState()
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.navbar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 0.5rem 1rem;

background: var(--crust);

    font-size: 18px;
    font-weight: 500;

    .nav-item {
        display: flex;
        align-items: center;
        justify-content: center;

        margin: 0 0.5rem;
        padding: 0.5rem 1rem;

        text-decoration: none;
        color: var(--text);
    }

    #nav-icon {
        svg {
            width: 24px;
            height: 24px;

            path {
                fill: var(--text);
            }
        }
    }

    #theme-toggle {
        svg {
            width: 24px;
            height: 24px;

            path {
                fill: var(--text);
            }
        }

        transition: fill 0.1s ease-in-out, transform 0.2s ease-in-out;

        &:hover {
            svg { path { fill: var(--subtext1) } };
            transform: scale(1.15);
        }

        &:active {
            svg { path { fill: var(--text) } };
            transform: scale(1.05);
        }
    }
}
</style>
