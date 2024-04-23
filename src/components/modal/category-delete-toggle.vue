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
          <el-button @click="categoriesStore.setToggleDelete(false)"
            >Cancel</el-button
          >
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useCategoryStore } from '@/stores/category.store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const emit = defineEmits(['refetch']);
const categoriesStore = useCategoryStore();
const { toggleDelete } = storeToRefs(categoriesStore);

const centerDialogVisible = ref(false);
</script>
