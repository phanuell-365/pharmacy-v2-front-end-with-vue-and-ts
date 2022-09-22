<template>
  <div
    ref="actionModalRef" :aria-labelledby="ariaLabelledBy" aria-hidden="true"
    class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <div :id="ariaLabelledBy" class="modal-header p-2 border-bottom-0">
            <FontAwesome :icon-name="WARNING_ICON" class="mx-3 fa-2x text-warning" />
            <p class="fs-5 mb-0 text-dark">{{ exposedProps.title }}</p>
          </div>
          <button aria-label="Close" class="btn-close text-end mx-2"
                  data-bs-dismiss="modal" type="button"></button>
        </div>
        <div class="modal-body border-bottom-0">
          <slot name="modal-body" />
        </div>
        <div class="modal-footer border-top-0">
          <slot name="modal-buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FontAwesome from "@/components/icons/FontAwesome.vue";
import { WARNING_ICON } from "@/constants/icons";
import type { Ref } from "vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Modal } from "bootstrap";

interface ActionModalProps {
  centered?: boolean;
  danger?: boolean;
}

const props = defineProps<ActionModalProps>();

const actionModalRef: Ref<HTMLDivElement | null> = ref(null);

const ariaLabelledBy = computed(() => `staticBackdropLabel`);

interface SetUpModalProps {
  title: string;
}

const exposedProps: Ref<SetUpModalProps> = ref({ title: "" });

const actionModal: Ref<Modal | null> = ref(null);

defineExpose({
  setUpModal: (payload: SetUpModalProps) => {
    exposedProps.value.title = payload.title;
  },
  showModal: () => actionModal.value?.show(),
  hideModal: () => actionModal.value?.hide(),
  setFocus: (inputEl: HTMLInputElement | null) => {
    actionModalRef.value?.addEventListener("shown.bs.modal", function() {
      inputEl?.focus();
    });
  }
});


const emit = defineEmits(["on-hidden-bs-modal"]);

onMounted(
  () => {
    if (actionModalRef.value)
      actionModal.value = new Modal(actionModalRef.value);

    emit("on-hidden-bs-modal");
  }
);

onUnmounted(
  () => {
    actionModalRef.value?.removeEventListener("shown.bs.modal", function() {
    });
  }
);
</script>

<style scoped>

</style>
