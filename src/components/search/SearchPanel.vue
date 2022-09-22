<template>
  <form autocomplete="off">
    <div class="dropdown">
      <InputContainer
        :input-id="`search${startCase(label)}`"
        :input-label="label"
        :invalid-feedback="searchTextErrorMessage"
      >
        <input
          id="searchInput"
          v-model="searchText"
          :name="name"
          :placeholder="`Find by ${name} name ... `"
          autocomplete="off"
          class="form-control shadow-sm"
          type="text"
          @focusin="onFocusInHandler"
          @focusout="onFocusOutHandler"
        />
      </InputContainer>
      <div
        id="searchDropdown"
        :class="{ show }"
        class="search-dropdown rounded"
      >
        <span
          v-for="item in filterArr"
          :key="item.id"
          class="p-2 text-muted"
          @click="onClickHandler(item)"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import startCase from "lodash/startCase";
import InputContainer from "@/components/form/InputContainer.vue";
import { ref, watch } from "vue";
import { useField } from "vee-validate";

interface SearchPairs {
  name: string;
  id: string;
}

interface SearchPanelProps {
  label: string;
  name: string;
  filterArray: SearchPairs[];
}

const props = defineProps<SearchPanelProps>();

// const searchText = ref("");

const searchTextValidation = (value: string) => {
  if (!value) {
    return "Please enter a value to search";
  }

  return true;
};

const {
  value: searchText,
  errorMessage: searchTextErrorMessage,
  meta: searchTextMeta,
} = useField("searchText", searchTextValidation);

const filterArr = ref(props.filterArray);
const filterArrayClone = ref([...props.filterArray.sort()]);

watch(searchText, (value) => {
  filterArr.value = filterArrayClone.value.filter((value1) =>
    value1.name.toLowerCase().includes(value.toLowerCase())
  );
});

const show = ref(false);

const onFocusInHandler = () => {
  show.value = true;
};

const onFocusOutHandler = () => {
  setTimeout(() => (show.value = false), 100);
};

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{ (e: "on-found-item", item: SearchPairs): void }>();

const onClickHandler = (item: SearchPairs) => {
  emit("on-found-item", item);
  searchText.value = item.name;
};

defineExpose({
  clear: () => {
    searchText.value = "";
  },
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

.dropdown {
  position: relative;
  display: inline-block;
}

.search-dropdown {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  width: 250px;
  /*display: inline-block;*/
  /*min-width: 230px;*/
  border: 1px solid #dddddd;
  z-index: 10;
  max-height: 150px;
  overflow: auto;
  overflow-x: hidden;
}

.search-dropdown span {
  /*color: black;
  padding: 12px 16px;*/
  display: block;
}

.search-dropdown span:hover {
  background-color: #f1f1f1;
  transform: translateX(5px);
  transition: all 0.2s ease-out;
}

.show {
  display: block;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /*box-shadow: inset 0 0 5px gray;*/
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--bs-secondary);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--bs-dark);
}
</style>
