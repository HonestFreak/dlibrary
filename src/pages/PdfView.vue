<template>
 
    <vue-pdf-app style="height: 100vh;" 
    :pdf=" 'https://' + routeName.split('/').at(-2) + '.ipfs.dweb.link/' + routeName.split('/').at(-1) +
     '.pdf'" :config="config" >
    </vue-pdf-app>

  </template>
  
  <script>
  import VuePdfApp from "vue3-pdf-app";
  import "vue3-pdf-app/dist/icons/main.css";
  import { useRoute } from 'vue-router'

  export default {
    setup() {
      const route = useRoute();
      const routeName = route.path.slice(1);
      
        return {
        routeName,
        config: {
        toolbar: {
          toolbarViewerRight: {
            openFile: false,
          }
        }
    }}},

    components: {
      VuePdfApp
    }}
  
  </script>