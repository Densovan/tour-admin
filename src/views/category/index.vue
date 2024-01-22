<template>
  <el-button type="primary" button @click="dialogFormVisible = true"
    >Add
  </el-button>
  <!-- {{ JSON.stringify(tableData) }} -->
  <br />
  <el-dialog
    v-model="dialogFormVisible"
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
      <!-- <el-form-item
        prop="logo"
        label="Icon"
        :rules="[
          {
            required: true,
            message: 'Please input category icon',
            trigger: 'blur',
          },
        ]"
      > -->
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
      >
        <template #trigger>
          <el-button type="info">select file</el-button>
        </template>
        <!-- <el-button class="ml-3" type="success" @click="submitUpload">
            upload to server
          </el-button> -->
      </el-upload>
      <!-- </el-form-item> -->
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
  <!-- <div v-if="isLoadingQuery">Loading...</div> -->
  <div v-if="isErrorQuery">Error loading data.</div>
  <el-table
    v-loading="isLoadingQuery"
    size="large"
    :data="filterTableData"
    style="width: 100%"
  >
    <!-- <el-table-column label="Name" prop="logo" /> -->
    <el-table-column label="Name" prop="name" />
    <el-table-column label="Date" prop="createdAt" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="large" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
interface User {
  date: string;
  name: string;
  address: string;
}
import { computed, ref, reactive } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { CategoryCreate, ICategory } from "@/common/types";
import { categoryApi } from "@/common/api";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import type { UploadFile } from "element-plus";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import axios from "axios";

const upload = ref<UploadInstance>();

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

const { CREATE_CATEGORY, CATEGORIES } = categoryApi();
const formRef = ref<FormInstance>();
const dialogFormVisible = ref(false);
const dynamicValidateForm = reactive<{
  name: string;
  logo: any | null;
}>({
  name: "",
  logo: null,
});

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
    ElMessage({
      message: data?.message,
      type: "success",
    });
  },
});

const {
  isFetching,
  refetch,
  isError: isErrorQuery,
  isLoading: isLoadingQuery,
  data: dataTable,
} = useQuery({
  queryKey: ["categories"],
  queryFn: () => CATEGORIES({}),

  // onSuccess: (res: any) => {
  //   console.log(res);
  // },
  // onError: (error: any) => {},
  // onSettled: () => {},
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const formData = new FormData();
      formData.append("image", dynamicValidateForm.logo);
      axios.post("http://localhost:4000/upload", formData).then((res) => {
        mutateCreateCategory({ ...dynamicValidateForm, logo: res.data.link });
        refetch();
        formEl.resetFields();
        dialogFormVisible.value = false;
      });
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const search = ref("");
const filterTableData = computed(() =>
  tableData.value?.items?.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData = computed(() => dataTable.value);
console.log(tableData.value, "-==tablecat");
</script>
