<template>
  <q-page class="flex">
    <div v-if="uploadedFiles.length === 0">
      <p>You haven't uploaded any files yet.</p>
    </div>
    <div v-else class="q-pa-md row items-start q-gutter-md" v-for="file in uploadedFiles" :key="file.cid">
      <q-card v-ripple @click="$router.replace('/view/' + file.cid + '/' + file.name.split('.')[0])"
        class="my-card bg-secondary text-white" style="height: 150px; width: 220px;">
        <q-card-section>
          <div class="text-subtitle2">{{ getTimeDifference(file.created) }}</div>
        </q-card-section>
        <q-separator dark />
        <q-card-actions style="padding: 15px;">
          <div class="text-subtitle1">
            <q-icon name="book" />
            {{ (file.name).split(".")[0] }}</div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { Web3Storage } from 'web3.storage'; // Import Web3Storage

export default defineComponent({
  name: 'ListFiles',
  data() {
    return {
      uploadedFiles: [],
    };
  },
  async mounted() {
    // Fetch files using the web3.storage token from the environment variable
    await this.fetchFiles();
  },
  methods: {
    async fetchFiles() {
      try {
        const accessToken = process.env.VUE_APP_WEB3_STORAGE_TOKEN;

        // Initialize the web3.storage client
        const storage = new Web3Storage({ token: accessToken });

        // List all files from your account
        const files = await storage.list();

        // Update the uploadedFiles data
        this.uploadedFiles = files.map((file) => ({
          name: file.name,
          cid: file.cid,
          created: file.created,
        }));
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    },
    getTimeDifference(createdTimestamp) {
      const currentDateTime = new Date();
      const parsedDate = new Date(createdTimestamp);

      if (!isNaN(parsedDate.getTime())) {
        return formatDistanceToNow(parsedDate, { addSuffix: true });
      } else {
        return 'Invalid Date';
      }
    },
  },
});
</script>
