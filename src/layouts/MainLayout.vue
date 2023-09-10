<template>
   <q-dialog v-model="upload" persistent>
    <q-card class="flex flex-center" style="padding-right: 30px; padding-left: 30px; 
    padding-top: 25px;  padding-bottom: 25px; gap:10px;">

      <q-img size="md" src="/src/assets/upload.svg" style="width: 50%;" />
      <div class="text-h6 center" style="text-align: center;">Upload Books/ Research Papers/ Articles to Library</div>
      
      <input type="file" ref="fileInput" style="display: none" @change="uploadFile">
      <q-btn color="grey" size="30px" icon="upload_file" round @click="$refs.fileInput.click()" />
    </q-card>
  </q-dialog>

  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon name="book" color="green" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            DLib
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
          <q-input name="search" dense outlined square v-model="search" placeholder="Enter CID/filename here" class="bg-white col" />
          <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated 
          @click="$router.replace('/view/' + search)"/>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn @click="upload = true"  size="lg" round dense flat color="grey-8" icon="upload_file" v-if="$q.screen.gt.sm">
            <q-tooltip>Add a pdf</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" :to="link.to" v-ripple clickable>
            <q-item-section avatar :top="link.to">
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section> 
          </q-item>

         

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold text-uppercase">
            Contribute or Deploy 
          </q-item-label>

          <q-item v-for="link in links3" :key="link.text" :to="link.to" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

         

          <q-item v-for="link in links4" :key="link.text" :to="link.to" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-lg" />

          <div class="q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons1"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons2"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { fabYoutube } from '@quasar/extras/fontawesome-v6'
import { client } from 'src/functions/web3storage.js';
import { useQuasar } from 'quasar'

export default {
  name: 'MyLayout',

  setup () {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const search = ref('')

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      fabYoutube,

      leftDrawerOpen,
      search,
      toggleLeftDrawer,

      upload: ref(false),
      showNotif () {
        $q.notify({
          message: 'Upload Successful',
          color: 'green'
        })
      },

      links1: [
        { icon: 'home', text: 'Home' , to: '/' },
        { icon: 'upload', text: 'Upload', to: '/upload' },
      ], 
      links3: [
        { icon: 'code', text: 'Github', to: '' },
        { icon: 'key', text: 'W3Storage', to: "" },
      ],
      links4: [
    
      ],
      buttons1: [
      
      ],
      buttons2: [
       
      ]
    }
  },
  methods: {
    async uploadFile() {
      try {
        const fileInput = this.$refs.fileInput;
        const file = fileInput.files[0];
        if (!file) {
          return;
        }

        // Set the name of the file to be the original filename with extension
        const filename = file.name;

        // Upload the file to web3.storage
        const cid = await client.put([file], { name: filename });

        // You can now use the CID (Content Identifier) to retrieve the file later
        console.log(`File uploaded with CID: ${cid}`);
        this.showNotif();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
  },
}
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>