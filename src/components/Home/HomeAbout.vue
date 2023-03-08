<template>
    <div class="home-about" :class="{ light: theme.theme, dark: !theme.theme }">
        <p>
            Merhaba, my name is <b>Derin Önder Eren</b>! I'm a self-taught
            developer from Istanbul/Turkey. I'm currently a highschool student.
            I'm interested in every aspect of computer science, electronics,
            science and body building. To be honest, I'm a bit of a nerd. I love
            to learn new things and I'm always trying to improve myself. I like
            reading and watching about everything but my favorites are sci-fi,
            psychology, history and self-improvement. I'm currently working as a
            <i><u>Full-stack Web and Web3 developer intern</u></i> at
            <b>AymarTech</b>.
        </p>
    </div>
</template>

<script setup lang="ts">
import { useTheme } from "@/store/theme";
const theme = useTheme();
</script>

<style lang="scss">
.home-about {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 15px;
    border-radius: 15px;

    font-size: 1.1em;
    line-height: 1.75;

    p {
        margin: 0;
    }

    &.light {
        color: $light-foreground;
        background: $light-secondary;
    }

    &.dark {
        color: $dark-foreground;
        background: $dark-secondary;
    }
}
</style>
