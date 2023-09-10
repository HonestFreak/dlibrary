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

export default defineComponent({
  name: 'ListFiles',
  data() {
    return {
      uploadedFiles: [
        {
          "name": "build-a-javascript-framework.pdf",
          "cid": "bafybeifskqyn3a7qcbrygko7ovld7t7lrzjewrolmdjhrovfhknuftuega",
          "created": "9/1/2023, 10:30:00 PM",
        },
        {
          "name": "introduction to programming.pdf",
          "cid": "bafkreifzjut3te2nhyekklss27nh3k72ysco7y32koao5eei66wof36n5e",
          "created": "9/2/2023, 3:45:00 PM",
        }
      ],
    };
  },
  methods: {
    getTimeDifference(createdTimestamp) {
      const currentDateTime = new Date();
      const parsedDate = new Date(createdTimestamp);
      
      if (!isNaN(parsedDate.getTime())) {
        return formatDistanceToNow(parsedDate, { addSuffix: true });
      } else {
        return "Invalid Date";
      }
    },
  },
});
</script>
