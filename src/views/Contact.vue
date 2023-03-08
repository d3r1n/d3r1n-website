<template>
    <div class="page-widget contact-page" :class="{ light: theme.theme, dark: !theme.theme }">
        <Navbar />

        <div class="content">
            <div class="header">
                <h1>Contact</h1>
                <p>Feel free to contact me.</p>
            </div>

            <div class="links">
                <div class="link">
                    <a href="https://linkedin.com/in/d3r1n" v-html="ilinkedin" target="_blank "></a>
                </div>

                <div class="link">
                    <a href="https://github.com/d3r1n" v-html="igithub" target="_blank "></a>
                </div>

                <div class="link">
                    <a href="https://open.spotify.com/user/derin9999" v-html="ispotify" target="_blank "></a>
                </div>

                <div class="link">
                    <a href="https://signal.me/#p/+905306353896" v-html="isignal" target="_blank "></a>
                </div>

                <div class="link">
                    <a href="mailto:me@d3r1n.com" v-html="igmail" target="_blank "></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Svg Icons
import ilinkedin from "@/assets/svg/linkedin.svg?raw";
import igithub from "@/assets/svg/github.svg?raw";
import isignal from "@/assets/svg/signal.svg?raw";
import ispotify from "@/assets/svg/spotify.svg?raw";
import igmail from "@/assets/svg/gmail.svg?raw";

import button_click from "@/assets/audio/button-click.mp3";

import { onMounted } from "vue";
import Navbar from "@/components/TheNavbar.vue";

import { useTheme } from "@/store/theme";

const theme = useTheme();

function play_button_click() {
    const audio = new Audio(button_click);
    audio.play();
}

onMounted(() => {
    const buttons = document.querySelectorAll(".content .link");

    buttons.forEach((button) => {
        button.addEventListener("click", play_button_click);
    });
});
</script>

<style lang="scss">
.contact-page {
    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-bottom: 2rem;
            opacity: 0.5;
            text-align: center;

            h1 {
                font-size: 2.5rem;
                font-weight: 600;
                margin: 0 0 1rem 0;
            }

            p {
                font-size: 1.2rem;
                font-weight: 300;
                margin: 0;
            }
        }

        .links {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 2rem;

            .link {
                a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 5rem;
                    height: 5rem;
                    border-radius: 10px;
                    transition: all 0.2s ease-in-out;

                    svg {
                        width: 3rem;
                        height: 3rem;
                        transition: stroke 0.2s ease-in-out;
                    }

                    &:hover {
                        transform: scale(1.1) translateY(-5px);
                    }
                }
            }
        }
    }

    &.light {
        background-color: $light-background;

        .header {
            color: $light-foreground;
        }

        .link {
            a {
                background-color: $light-secondary;
                box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.2);

                svg {
                    fill: $light-foreground;
                }
            }
        }
    }

    &.dark {
        background-color: $dark-background;

        .header {
            color: $dark-foreground;
        }

        .link {
            a {
                background-color: $dark-secondary;
                box-shadow: 0 0 0.5rem 0.1rem rgba(255, 255, 255, 0.2);

                svg {
                    fill: $dark-foreground;
                }
            }
        }
    }

    @media screen and (max-width: 1000px) {
        .content {
            position: relative;
            top: unset;
            left: unset;
            transform: unset;
            margin-bottom: 30px;
        }

        .content .links {
            flex-direction: column;
        }
    }
}
</style>
