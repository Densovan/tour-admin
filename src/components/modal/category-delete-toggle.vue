<template>
  <div>
    <el-dialog
      v-model="toggleDelete"
      title="Category"
      width="500"
      style="border-radius: 10px"
    >
      <span>Are you sure to delete this category?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            :disabled="isPending"
            @click="categoriesStore.setToggleDelete(false)"
            >Cancel</el-button
          >
          <el-button
            :loading="isPending"
            :disabled="isPending"
            type="primary"
            @click="mutate(getCurrentPontId)"
          >
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useCategoryStore } from '@/stores/category.store';
import { CategoryUpdate, ICategory } from '@/common/types';
import { useMutation } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { categoryApi } from '@/common';
import { ElMessage } from 'element-plus';
const emit = defineEmits(['refetch']);
const categoriesStore = useCategoryStore();
const { toggleDelete, getCurrentPontId } = storeToRefs(categoriesStore);
const centerDialogVisible = ref(false);
const { DELETE_CATEGORY } = categoryApi();
const { isPending, mutate, isSuccess } = useMutation({
  mutationKey: ['deleteCategory'],
  mutationFn: (id: string) => DELETE_CATEGORY(id),
  // onMutate: async () => {
  //   categoriesStore.setToggleDelete(false);
  //   // emit('refetch');
  // },
  onError: () => {
    categoriesStore.setToggleDelete(true);
  },
  onSuccess: async () => {
    if (isSuccess) {
      ElMessage({
        message: 'Delete successfully',
        type: 'success',
      });
      emit('refetch');
      categoriesStore.setToggleDelete(false);
    }
  },
  onSettled: () => {
    categoriesStore.setToggleDelete(false);
  },
});
</script>
