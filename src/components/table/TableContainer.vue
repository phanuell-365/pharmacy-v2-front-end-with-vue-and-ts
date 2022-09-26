<template>
  <div :class="tableSize">
    <table
      :class="color"
      class="table table-hover table-bordered table-striped table-sm table-responsive table-responsive-md table-responsive-sm rounded"
    >
      <slot />
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface TableContainerProps {
  skin?: string;
  large?: boolean;
}

const props = defineProps<TableContainerProps>();

const tableSize = computed(() =>
  props.large ? "scroll-table-lg" : "scroll-table-sm"
);

const color = computed(() =>
  props.skin ? `table-${props.skin}` : "table-success"
);
</script>

<style scoped>
.scroll-table-sm {
  position: relative;
  max-height: 150px;
  overflow: auto;
}

.scroll-table-lg {
  position: relative;
  max-height: 380px;
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
