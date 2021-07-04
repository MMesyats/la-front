/* eslint-disable */
declare module "*.vue" {
  import Vue from "vue";
  export default Vue.component;
}

declare module "*.svg" {
  const filePath: string;
  export default filePath;
}
