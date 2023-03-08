<template>
    <div class="not-found-page" :class="{ light: theme.theme, dark: !theme.theme }">
        <Navbar />
        <div class="not-found-page-content">
            <span v-html="alert"></span>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <p>
                Try going back to the
                <router-link class="home-link" to="/">Home Page</router-link>.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/TheNavbar.vue";
import alert from "@/assets/svg/alert.svg?raw";

import { useTheme } from "@/store/theme";

import { onBeforeMount } from "vue";

const theme = useTheme();
</script>

<style lang="scss">
.not-found-page {
    display: flex;
    flex-direction: column;
    align-items: center;

    min-height: 100%;

    .navbar {
        justify-self: flex-start;
    }

    .not-found-page-content {
        justify-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        width: 90%;
        height: 90%;

        span {
            width: 100px;
            height: 100px;
            margin-bottom: 30px;

            svg {
                width: 100%;
                height: 100%;
            }
        }

        h1 {
            font-size: 120px;
            font-weight: 600;
            margin: 0;
            padding: 0;
            margin-bottom: 15px;
        }

        h2 {
            font-size: 40px;
            font-weight: 600;
            margin: 0;
            padding: 0;
            margin-bottom: 1.5em;
        }

        p {
            font-size: 24px;
            font-weight: 400;
            margin: 0;
            padding: 0;
            margin-bottom: 15px;
        }

        .home-link {
            color: $accent-pink;
            font-weight: 600;
            font-size: 24px;
            text-decoration: underline;

            &:hover,
            &:focus,
            &:active {
                color: inherit;
            }
        }
    }

    &.dark {
        background-color: $dark-background;

        .not-found-page-content {
            color: $dark-foreground;
        }
    }

    &.light {
        background-color: $light-background;

        .not-found-page-content {
            color: $light-foreground;
        }
    }

    @media (max-width: 1000px) {
        .not-found-page-content {
            span {
                width: 90px;
                height: 90px;
            }

            h1 {
                font-size: 100px;
            }

            h2 {
                font-size: 30px;
            }

            p {
                font-size: 20px;
            }

            .home-link {
                font-size: 20px;
            }
        }
    }
}
</style>
