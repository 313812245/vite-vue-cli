/// <reference types="vite/client" />
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly VUE_APP_CURRENTMODE: string;
  readonly VUE_APP_PARTNERNAME: string;
  readonly VUE_APP_BASEURL: string;
  readonly VUE_APP_DATACENTER_URL: string;
  readonly VUE_APP_DOMAIN_NAME: string;
  readonly VUE_APP_DOWNLOAD: string;
  readonly VUE_APP_ISSAAS: number;
  readonly VUE_APP_SHOWLOGO: number;
  readonly VUE_APP_SHOWSMSCODE: number;
  readonly VUE_APP_SHOW_EMAIL_LOGIN: number;

  readonly VUE_IS_DEVELOPMENT: number;
  readonly VUE_APP_OSS_REGION: string;
  readonly VUE_APP_OSS_ACCESSKEYID: string;
  readonly VUE_APP_OSS_ACCESSKEYSECRET: string;
  readonly VUE_APP_OSS_BUCKET: string;
  readonly VUE_APP_OSS_PARTNER: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
