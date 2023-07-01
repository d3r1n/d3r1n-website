/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_DC_ID: string
    VITE_GH_USERNAME: string
    VITE_SP_CLIENT_ID: string
    VITE_SP_CLIENT_SECRET: string
    VITE_SP_REFRESH_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
