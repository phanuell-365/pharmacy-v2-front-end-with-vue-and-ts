<template>
  <div
    :id="`modal${name}`"
    ref="deleteModalRef"
    aria-hidden="true"
    class="modal fade modal-alert py-5"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    role="dialog"
    tabindex="-1"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow w-75 m-auto">
        <div class="modal-body p-4 text-center">
          <h5 class="mb-0">{{ exposedProps?.secondaryHeader }}</h5>
          <p class="mb-0">{{ exposedProps?.primaryHeader }}</p>
        </div>
        <div class="modal-footer flex-nowrap p-0">
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { onMounted, onUnmounted, ref } from "vue";
import { Modal } from "bootstrap";

interface DeleteModalProps {
  name: string;
}

defineProps<DeleteModalProps>();

const deleteModalRef: Ref<HTMLDivElement | null> = ref(null);

const deleteModal: Ref<Modal | null> = ref(null);

interface ExposedModalProps {
  secondaryHeader: string;
  primaryHeader: string;
}

const emit = defineEmits(["on-hidden-bs-modal"]);

onMounted(() => {
  if (deleteModalRef.value) deleteModal.value = new Modal(deleteModalRef.value);
  deleteModalRef.value?.addEventListener("hidden.bs.modal", () => {
    emit("on-hidden-bs-modal");
  });
});

onUnmounted(() => {
  deleteModalRef.value?.removeEventListener("hidden.bs.modal", () => {
    console.log("the hidden bs toast event");
  });
});

const exposedProps: Ref<ExposedModalProps | null> = ref(null);

defineExpose({
  setUpModal: (payload: ExposedModalProps) => (exposedProps.value = payload),
  showModal: () => deleteModal.value?.show(),
  hideModal: () => deleteModal.value?.hide(),
});
</script>

<style scoped></style>
