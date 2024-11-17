/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly TAURI_HOST: string;
    // more env variables...
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
