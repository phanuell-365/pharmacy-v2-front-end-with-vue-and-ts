<template>
  <div class="dp-dropdown">
    <!--    <button class="drpbtn" @click="onClickHandler">Dropdown</button>-->
    <input id="myInput" v-model="filter" class="form-control shadow-sm" placeholder="Search ..." type="text"
           @focusin="onFocusInHandler" @focusout="onFocusOutHandler">
    <div id="myDropdown" :class="{show}" class="dp-dropdown-content">
      <template v-if="filter.length <= 0">
        <a v-if="isLoading" class="fs-6">
          <i class="fas fa-spinner fa-pulse px-2"></i>
          <!--        <span aria-hidden="true" class="spinner-border" role="status"></span>-->
          <span class="px-2">Loading...</span>
        </a>
      </template>
      <template v-else>
        <a v-for="item in dropdownItems" :key="item" :href="`#${item}`"
           class="d-flex justify-content-between align-items-center">{{ startCase(item) }}
          <button class="btn btn-light border-0">+</button>
        </a>
        <a v-if="isLoading" class="fs-6">
          <i class="fas fa-spinner fa-pulse px-2"></i>
          <!--        <span aria-hidden="true" class="spinner-border" role="status"></span>-->
          <span class="px-2">Loading...</span>
        </a></template>
    </div>
    <!--    <FontAwesome :icon-name="SPINNER" class="text-success" />-->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import startCase from "lodash/startCase";

const filter = ref("");

const dropdownItems = ref([
  "Home", "About", "Base", "Blog", "Support", "Tools", "Contact", "Custom", "Main"
]);

const tempDropdownItems = ref([...dropdownItems.value.sort()]);

watch(filter, () => {
  isLoading.value = true;
  dropdownItems.value = tempDropdownItems.value.filter(value => value.toLowerCase().includes(filter.value.toLowerCase()));
  setInterval(() => isLoading.value = false, 2000);
});


const show = ref(false);

const onClickHandler = () => {
  show.value = !show.value;
};

const onFocusInHandler = () => {
  show.value = true;
};

const onFocusOutHandler = () => {
  show.value = false;
};

const isLoading = ref(true);

</script>

<style scoped>
.drpbtn {
  background-color: #04aa6d;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.drpbtn:hover, .drpbtn:focus {
  background-color: #3e8e41;
}

#myInput {
  box-sizing: border-box;
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  /*padding: 14px 20px 12px 45px;*/
  /*border: none;/*
  /*border-bottom: 1px solid #ddd;/*
}

#myInput:focus {
  /*outline: 3px solid #dddddd;*/
  outline: 3px solid var(--bs-success-rgb);
}

.dp-dropdown {
  position: relative;
  display: inline-block;
}

.dp-dropdown-content {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  width: 100%;
  /*min-width: 230px;*/
  border: 1px solid #dddddd;
  z-index: 1;
  max-height: 200px;
  overflow: auto;
  overflow-x: hidden;
}

.dp-dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dp-dropdown-content a:hover {
  background-color: #f1f1f1;
  color: #00bd7e;
  transform: translateX(5px);
  transition: all 0.2s ease-in;
}

.show {
  display: block;
}

/*.show:focus {
  display: none;
}*/

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /*box-shadow: inset 0 0 5px gray;*/
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #00bd7e;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2c3e50;
}

</style>
