/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_DISCORD_ID: string;
    VITE_GITHUB_USERNAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}