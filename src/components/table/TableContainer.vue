<template>
  <div class="scroll-table">
    <table
      :class="color"
      class="table table-hover table-bordered table-striped table-sm table-responsive table-responsive-md table-responsive-sm">
      <slot />
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface TableContainerProps {
  skin?: string;
}

const props = defineProps<TableContainerProps>();

const color = computed(
  () => props.skin ? `table-${props.skin}` : "table-success"
);
</script>

<style scoped>
.scroll-table {
  position: relative;
  min-height: 150px;
  overflow: auto;
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
  background: lightgray;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: dimgray;
}
</style>
