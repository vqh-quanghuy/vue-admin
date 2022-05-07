<template>
  <label class="btn btn-outline-secondary" type="button">
    Upload<input type="file" hidden @change="UPLOAD($event.target.files)" />
  </label>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "ImageUpload",
  emits: ['file-uploaded'],
  setup(_: any, context: any) {
    const UPLOAD = async (files: FileList) => {
      let file = files.item(0) || '{}';

      let formData = new FormData;
      formData.append('image', file);
      let response = await axios.post('upload', formData);
      context.emit('file-uploaded', response.data.url)
    }

    return {
      UPLOAD,
    }
  },
}
</script>