<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-[600px] bg-white shadow-xl rounded p-12">
      <el-form
        label-position="top"
        ref="formRef"
        :model="dynamicValidateForm"
        label-width="120px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="email"
          label="Email"
          :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="dynamicValidateForm.email" />
        </el-form-item>
        <el-form-item
          :rules="[
            {
              required: true,
              message: 'Please input password',
              trigger: 'blur',
            },
          ]"
          label="Password"
          prop="password"
        >
          <el-input
            v-model="dynamicValidateForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { useUserRequest } from '@/common/api';
import { useAuthStore } from '@/stores/auth';
import { useMutation } from '@tanstack/vue-query';
import type { AuthLoginForm } from '../../common/types';
import router from '@/router';

const { POST_LOGIN } = useUserRequest();
const authStore = useAuthStore();
const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  password: string;
  email: string;
}>({
  password: '',
  email: '',
});

const {
  isPending,
  isError,
  isSuccess,
  data,
  mutate: mutateLogin,
} = useMutation({
  mutationKey: ['login'],
  mutationFn: (payload: AuthLoginForm) => POST_LOGIN(payload),
  onSuccess: async (data) => {
    console.log(data, '==d=ata, login');
    authStore.setAuthToken(data.accessToken, data.refreshToken);
    nextTick(() => router.push('/'));
  },
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      mutateLogin(dynamicValidateForm);
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
@/common/api/userRequest
