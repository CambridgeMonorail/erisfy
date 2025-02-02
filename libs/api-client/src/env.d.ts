
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_USE_MOCKS: string
  readonly VITE_REACT_APP_API_BASE_URL: string
  readonly VITE_REACT_APP_MY_API_KEY: string
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}