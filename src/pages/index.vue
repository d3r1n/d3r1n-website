<template>
    <div :class="theme ? 'light' : 'dark'" class="index-page">
            <Navbar />

            <div class="content">
                <Profile />
                <div class="width-align"> <!-- This is for alignment of about + presence and projects -->
                    <div class="row-align">
                        <Presence />
                        <About />
                    </div>
                    <Projects />
                    <TopMusic />
                </div>
            </div>

            <Footer />    
    </div>
</template>

<script setup>
import Projects from "~/components/Home/Projects.vue";
import About from "~/components/Home/About.vue";
import Presence from "~/components/Home/Presence.vue";
import Profile from "~/components/Home/Profile.vue";
import { useAppState } from "~/composables/app-state"
import TopMusic from "~/components/Home/TopMusic.vue";
const { theme } = useAppState()
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.index-page {
    background: var(--base); // theme

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    min-height: 100vh;

    gap: 30px;

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        width: 90%;
        max-width: 1500px;

        gap: 2rem;

        .width-align {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            width: 100%;
            gap: 2rem;

            .row-align {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 2rem;

                width: 100%;

                .presence, .about {
                    width: 50%;
                }
            }

            .projects {
                width: 100%;
            }
        }
    }

    @media screen and (max-width: $breakpoint-mobile) {
        .content {
            .profile {
                flex-direction: column;

                #avatar img {
                    width: 200px;
                    height: 200px;
                }

                .info {
                    align-items: center;
                    gap: 1rem;

                    .name {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                }
            }

            .width-align .row-align {
                flex-direction: column;
                gap: 2rem;

                .presence, .about {
                    width: 100%;
                }

                .presence img {
                    width: 60%;
                    height: 60%;
                }
            }

            .projects {
                grid-template-columns: 1fr;
            }

            .top-music {
                flex-direction: column;

                .top-container {
                    width: 100%;
                }
            }
        }

        .footer {
            height: auto;
            flex-direction: column;
            gap: 1rem;

            .footer-sep {
                display: none;
            }
        }
    }
}

</style>