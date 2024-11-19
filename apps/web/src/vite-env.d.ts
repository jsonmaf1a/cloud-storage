/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly APP_PORT: string;

    readonly API_URL: string;
    readonly API_PORT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
