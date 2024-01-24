<template>
  <div class="flex items-center space-x-3 float-right">
    <el-button
      type="primary"
      button
      @click="categoryStore.setToggleCreate(true)"
    >
      <div class="flex space-x-1 items-center">
        <el-icon>
          <Icon icon="bxs:plus-circle" />
        </el-icon>
        <p>Add</p>
      </div>
    </el-button>
    <el-button type="primary" button @click="refetch()">
      <div class="flex space-x-1 items-center">
        <Icon width="20" icon="bx:cloud-download" />
        <p>Refetch</p>
      </div>
    </el-button>
  </div>
  <br />
  <category-create-form @refetch="refetch()" />
  <div>
    <el-table
      v-loading="isLoadingQuery || isFetching"
      size="large"
      :data="dataTable?.items"
      style="width: 100%; height: 700px"
    >
      <el-table-column label="icon" prop="logo">
        <template v-slot="{ row }">
          <img :src="row.logo" alt="icon" class="w-[40px] rounded-lg" />
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Date" prop="createdAt">
        <template v-slot="{ row }">{{
          dayjs(row.createdAt).format(" DD-MMM-YYYY HH:mm A")
        }}</template>
      </el-table-column>

      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="large"
            placeholder="Type to search"
          />
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
  </div>

  <br />
  <div class="float-right">
    <el-pagination
      v-if="dataTable"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="limit"
      :total="dataTable.meta?.totalItems"
      @size-change="handlePageSizeChange"
      @current-change="handlePageChange"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script lang="ts" setup>
interface User {
  date: string;
  name: string;
  address: string;
}
import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { categoryApi } from "@/common/api";
import { useCategoryStore } from "@/stores";
import { storeToRefs } from "pinia";
import "dayjs/locale/km";
import dayjs from "dayjs";
import { Icon } from "@iconify/vue";
//store import
const categoryStore = useCategoryStore();
const {} = storeToRefs(categoryStore);
//api import
const { CATEGORIES } = categoryApi();
const page = ref<any>(1);
const limit = ref(20);
const name = ref("");
const search = ref("");
const {
  isFetching,
  refetch,
  isError: isErrorQuery,
  isLoading: isLoadingQuery,
  data: dataTable,
} = useQuery({
  queryKey: ["categories", name, page, limit],
  queryFn: () =>
    CATEGORIES({
      page: page.value,
      limit: limit.value,
      name: name.value,
    }),

  // onSuccess: (res: any) => {
  //   console.log(res);
  // },
  // onError: (error: any) => {},
  // onSettled: () => {},
});

// const filterTableData = computed(() =>
//   tableData.value?.items?.filter(
//     (data) =>
//       !search.value ||
//       data.name.toLowerCase().includes(search.value.toLowerCase())
//   )
// );
// const filterTableData = computed(() =>
//   dataTable.value?.filter(
//     (data) =>
//       !search.value ||
//       data.name.toLowerCase().includes(search.value.toLowerCase())
//   )
// );
const handlePageSizeChange = (pageSize: number) => {
  limit.value = pageSize;
  refetch();
};

const handlePageChange = (currentPage: number) => {
  page.value = currentPage;
  refetch();
};
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

// const tableData = computed(() => dataTable.value);
</script>
<style scoped>
.el-table__inner-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 500px;
}
</style>
