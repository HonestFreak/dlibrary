<template>
 
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Theme and File Format"
        icon="settings"
        :done="step > 1"
      >
        This platform is to upload books, exam papers, research papers, notes, articles and other
        documents related to academics. You can upload your own documents or view documents uploaded
        Please try to upload documents in PDF format.
      </q-step>

      <q-step
        :name="2"
        title="Naming"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
      >
        Try to name your document in a way that is easy to understand and search for. 
        For example, "Intro to Programming by XYZ 2023.pdf" is a better name than "CS101.pdf".
      </q-step>

      <q-step
        :name="4"
        title="Upload"
        icon="upload"
      >
        The document will be pinned to the IPFS network and will be available for viewing by anyone.
        You won't be able to delete the document once it is uploaded.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="step < 4" @click="( $refs.stepper.next() )" 
          color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step == 4" flat color="green" @click="upload = true" label="Upload" class="q-ml-sm" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
      </template>
 
    </q-stepper>
  </div>

  <q-dialog v-model="upload" persistent>
    <q-card class="flex flex-center" style="padding-right: 30px; padding-left: 30px; 
    padding-top: 25px;  padding-bottom: 25px; gap:10px;">

      <q-img size="md" src="/src/assets/upload.svg" style="width: 50%;" />
      <div class="text-h6 center" style="text-align: center;">Upload Books/ Research Papers/ Articles to Library</div>
      
      <input type="file" ref="fileInput" style="display: none" @change="uploadFile">
      <q-btn color="grey" size="30px" icon="upload_file" round @click="$refs.fileInput.click()" />
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { client } from 'src/functions/web3storage.js';
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const $q = useQuasar()
    return {
      upload: ref(false),
      step: ref(1),
      showNotif () {
        $q.notify({
          message: 'Upload Successful',
          color: 'green'
        })
      }
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
});
</script>
