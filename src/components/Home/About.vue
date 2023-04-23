<template>
    <div class="about font-fira-code" id="about">
        <div id="head" class="font-roboto-slab">About me</div>
        <p>
            I'm a self-taught developer from Istanbul/Turkey. I'm currently a
            highschool student, interested in every aspect of computer
            science, electronics, science and body building. To be honest, I'm a
            bit of a nerd. I love to learn new things and I always try to
            improve myself. I enjoy reading and watching about everything but my
            favorite topics are sci-fi, psychology, history and
            self-improvement. I'm currently working as a
            <span id="job-description">Full-stack Web and Web3 developer</span>
            at
            <a href="https://linkedin.com/company/aymartech" target="_blank" id="company">Aymar Tech</a>.
        </p>
    </div>
</template>

<style lang="scss">
.about {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;

    padding: 1rem;

    background-color: var(--mantle);
    outline: dashed 2px var(--overlay0);
    border-radius: 0.7rem;

    color: var(--text);

    #head {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        padding: 0;
    }

    p {
        font-size: 1.25rem;
        line-height: 1.5rem;
        margin: 0;
        padding: 0;
        color: var(--subtext0);
    }

    #job-description {
        color: var(--blue);
        font-weight: bold;
    }

    #company {
        color: var(--mauve);
        font-weight: bold;
        text-decoration: dashed underline;
    }
}
</style>
