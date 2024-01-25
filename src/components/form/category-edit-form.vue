<template>
  <div>
    <el-dialog
      v-model="toggleEdit"
      title="Add new category"
      width="500"
      style="border-radius: 10px"
    >
      <el-form :model="currentPointForm" label-position="top" ref="formRef">
        <el-form-item
          prop="name"
          label="Category"
          :rules="[
            {
              required: true,
              message: 'Please input category title',
              trigger: 'blur',
            },
          ]"
        >
          <el-input size="large" v-model.trim="currentPointForm.name" />
        </el-form-item>
        <el-form-item
          prop="logo"
          label="Icon"
          :rules="[
            {
              required: true,
              message: 'Please input category icon',
              trigger: 'blur',
            },
          ]"
        >
          <el-upload
            name="image"
            list-type="picture"
            ref="upload"
            class="upload-demo"
            action="#"
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :auto-upload="false"
            v-model="currentPointForm.logo"
          >
            <template #trigger>
              <el-button type="info">select file</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button
            :loading="isPending"
            type="primary"
            @click="submitForm(formRef)"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { categoryApi, iconUploadApi } from "@/common/api";
import { CategoryUpdate, ICategory } from "@/common/types";
import { useMutation } from "@tanstack/vue-query";
import type { UploadProps, UploadRawFile, UploadUserFile } from "element-plus";
import {
  ElMessage,
  type FormInstance,
  genFileId,
  UploadInstance,
} from "element-plus";
import { computed, reactive, ref, watch } from "vue";
import { useCategoryStore } from "@/stores";
import { storeToRefs } from "pinia";

const newForm = ref({});
//store import
const categoryStore = useCategoryStore();
const { toggleEdit, currentPointForm, getCurrentPontId } =
  storeToRefs(categoryStore);

//api imoport
const { UPDATE_CATEGORY } = categoryApi();
const { ICON_UPLOAD } = iconUploadApi();
const emit = defineEmits(["refetch"]);
const upload = ref<UploadInstance>();
const formRef = ref<FormInstance>();

watch(
  () => currentPointForm.value,
  (val) => {
    newForm.value["logo"] = currentPointForm.value.logo;
    newForm.value["name"] = currentPointForm.value.name;
  }
  // { deep: true }
);

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
  console.log(upload.value);
};

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
  // if (uploadFiles.length > 0) {
  //   currentPointForm.logo = uploadFiles[0].raw;
  // }
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const formData = new FormData();
      // formData.append("image", currentPointForm.logo);
      const data: any = await ICON_UPLOAD(formData);
      mutate({ ...currentPointForm.value });
      formEl.resetFields();
      // currentPointForm.logo = "";
      upload.value?.clearFiles();
      categoryStore.setToggleCreate(false);
      emit("refetch");

      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const { isPending, mutate } = useMutation({
  mutationKey: ["create-category"],
  mutationFn: (payload: CategoryUpdate) =>
    UPDATE_CATEGORY(getCurrentPontId.value, payload),
  onSuccess: async (data: ICategory | any) => {
    ElMessage({
      message: data?.message,
      type: "success",
    });
    categoryStore.setToggleEdit(false);
    categoryStore.setCurrentPointedId("");
    emit("refetch");
  },
});
</script>

<style lang="scss" scoped></style>
