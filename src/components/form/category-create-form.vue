<template>
  <div>
    <el-dialog
      v-model="toggleCreate"
      title="Add new category"
      width="500"
      style="border-radius: 10px"
    >
      <el-form :model="dynamicValidateForm" label-position="top" ref="formRef">
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
          <el-input size="large" v-model="dynamicValidateForm.name" />
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
            :auto-upload="false"
            :on-change="handleChange"
            v-model="dynamicValidateForm.logo"
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
import { categoryApi } from "@/common/api";
import { CategoryCreate, ICategory } from "@/common/types";
import { useMutation } from "@tanstack/vue-query";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import type { UploadProps, UploadRawFile } from "element-plus";
import {
  ElMessage,
  type FormInstance,
  genFileId,
  UploadInstance,
} from "element-plus";
import { reactive, ref } from "vue";
import axios from "axios";
import { useCategoryStore } from "@/stores";
import { storeToRefs } from "pinia";

//store import
const categoryStore = useCategoryStore();
const { toggleCreate } = storeToRefs(categoryStore);

//api imoport
const { CREATE_CATEGORY } = categoryApi();
const emit = defineEmits(["refetch"]);

const upload = ref<UploadInstance>();
const dialogFormVisible = ref(false);
const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  name: string;
  logo: any | null;
}>({
  name: "",
  logo: "",
});

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
  console.log(upload.value);
};

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
  if (uploadFiles.length > 0) {
    dynamicValidateForm.logo = uploadFiles[0].raw;
  }
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const formData = new FormData();
      formData.append("image", dynamicValidateForm.logo);
      axios.post("http://localhost:4000/upload", formData).then((res) => {
        mutateCreateCategory({ ...dynamicValidateForm, logo: res.data.link });
        emit("refetch");
        formEl.resetFields();
        dynamicValidateForm.logo = "";
        upload.value?.clearFiles();
        categoryStore.setToggleCreate(false);
      });
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const {
  isPending,
  isError,
  isSuccess,
  data,
  mutate: mutateCreateCategory,
} = useMutation({
  mutationKey: ["create-category"],
  mutationFn: (payload: CategoryCreate) => CREATE_CATEGORY(payload),
  onError: (error, variables, context) => {
    console.log(`rolling back optimistic update with id `);
  },
  onSuccess: async (data: ICategory | any) => {
    emit("refetch");
    ElMessage({
      message: data?.message,
      type: "success",
    });
  },
});
</script>

<style lang="scss" scoped></style>
