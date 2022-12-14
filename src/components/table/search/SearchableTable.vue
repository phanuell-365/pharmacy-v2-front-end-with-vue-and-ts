<template>
  <section class="row">
    <div class="col-lg-12 col-md-12 py-2 my-1">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="dropdown">
            <input
              id="searchInput"
              v-model="searchText"
              :name="name"
              :placeholder="`Find by ${searchTerm} name ... `"
              autocomplete="off"
              class="form-control shadow-sm"
              type="text"
              @focusin="onFocusInHandler"
              @focusout="onFocusOutHandler"
            />
          </div>
        </div>
        <template v-if="userRoles?.includes(loggedInUserRole)">
          <div class="col-lg-6 col-md-6 text-end">
            <ButtonLink
              :href="`/${name}s/create`"
              :text="`Add ${name}`"
              action="add"
              class="btn-hover"
            />
          </div>
        </template>
      </div>
    </div>
    <div class="col-lg-12 col-md-12">
      <TableContainer large skin="light">
        <TableHead class="sticky-top">
          <PlainTableHeader :field-names="attributes" scope="col" />
          <template v-if="!noAction">
            <th class="action">Action</th>
          </template>
        </TableHead>
        <TableBody>
          <TableRow
            :col-count="attributes.length + 1"
            :null-comment="nullComment"
            :records="propRecords"
          >
            <template #default="{ record }">
              <PlainTableData :field-names="attributes" :record="record" />
              <template v-if="!noAction">
                <td class="text-center">
                  <slot :record-id="record.id" name="actions" />
                </td>
              </template>
            </template>
          </TableRow>
        </TableBody>
      </TableContainer>
    </div>
  </section>
</template>

<script lang="ts" setup>
import TableContainer from "@/components/table/TableContainer.vue";
import TableHead from "@/components/table/TableHead.vue";
import PlainTableHeader from "@/components/table/plain/TableHeader.vue";
import TableBody from "@/components/table/TableBody.vue";
import TableRow from "@/components/table/TableRow.vue";
import PlainTableData from "@/components/table/plain/TableData.vue";
import ButtonLink from "@/components/button/ButtonLink.vue";
import { Ref, ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";

interface SearchableTableProps {
  name: string;
  searchTerm: string;
  records: object[];
  attributes: string[];
  searchBy: string;
  nullComment?: string;
  // an array of user roles that can access the add button
  userRoles?: string[];
  // href: string;
  noAction?: boolean;
}

const props = defineProps<SearchableTableProps>();

const searchText: Ref<string> = ref("");

const show = ref(false);

const authStore = useAuthStore();

const loggedInUserRole: Ref<string | undefined> = ref(authStore.getUserRole());

const onFocusInHandler = () => {
  show.value = true;
};

const onFocusOutHandler = () => {
  setTimeout(() => (show.value = false), 100);
};

const filterValue: Ref<string> = ref(props.searchBy);

const propRecords = ref(props.records);
//
// // const recordsClone = ref(props.records);
// onUpdated(() => {
//   propRecords.value = props.records.filter((value1) => {
//     // if (value1) {
//     //   //@ts-ignore
//     //   const searchValue = value1[filterValue.value].toLowerCase();
//     //   return searchValue.includes(value.toLowerCase());
//     // }
//     return true;
//   });
// });

watch(searchText, (value) => {
  propRecords.value = props.records.filter((value1) => {
    if (value1) {
      //@ts-ignore
      const searchValue = value1[filterValue.value].toLowerCase() as string;
      return searchValue.includes(value.toLowerCase());
    }
    return true;
  });
});
</script>

<style scoped>
#searchInput {
  box-sizing: border-box;
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  width: 250px;
}

#searchInput:focus {
  outline: 3px solid #dddddd;
  /*outline: 3px solid var(--bs-light);*/
}

.btn-hover:hover {
  transform: translateY(-3px);
  /*box-shadow: var(--bs-card-box-shadow);*/
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in;
}

.btn-hover:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

.action {
  width: 150px;
}
</style>
