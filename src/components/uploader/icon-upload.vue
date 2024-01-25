<template>
  <el-upload
    name="image"
    list-type="picture"
    ref="upload"
    class="upload-demo"
    action="#"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :on-change="handleChange"
    v-model="file"
  >
    <template #trigger>
      <el-button type="info">{{ buttonText }}</el-button>
    </template>
  </el-upload>
</template>

<script setup>
import { ref } from 'vue';

const file = ref(null);

const handleExceed = (files) => {
  $refs.upload.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  $refs.upload.handleStart(file);
};

const handleChange = (uploadFile, uploadFiles) => {
  if (uploadFiles.length > 0) {
    file.value = uploadFiles[0].raw;
  }
};

const props = defineProps(['buttonText', 'uploadUrl', 'formData', 'onSuccess', 'onError']);
</script>
