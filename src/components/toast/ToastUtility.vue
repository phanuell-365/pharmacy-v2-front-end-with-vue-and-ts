<template>
  <div
    ref="toastUtilityRef"
    :aria-live="ariaLive"
    :class="skinColorClasses"
    :data-bs-delay="exposedProps?.delay"
    :role="role"
    aria-atomic="true"
    class="toast align-items-center border-0"
  >
    <div class="d-flex">
      <div class="toast-body">
        <FontAwesome :icon-name="iconName" class="mx-2" />
        {{ exposedProps?.text }}
      </div>
      <button
        aria-label="Close"
        class="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        type="button"
      ></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FontAwesome from "../icons/FontAwesome.vue";
import type { Ref } from "vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  CONFIRM_SKIN,
  DANGER_SKIN,
  DEFAULT_SKIN,
  INFO_SKIN,
  OK_SKIN,
  SUCCESS_SKIN,
  WARNING_SKIN,
} from "@/constants/toasts";
import {
  BELL_ICON,
  CONFIRM_ICON,
  DANGER_ICON,
  INFO_ICON,
  OK_ICON,
  WARNING_ICON,
} from "@/constants/icons";
import { Toast } from "bootstrap";

const toastUtilityRef: Ref<HTMLDivElement | null> = ref(null);

const skinColorClasses: Ref<string | null> = ref(null);
const iconName: Ref<string | null> = ref(null);

interface SkinProp {
  skin: string;
}

const props = defineProps<SkinProp>();

const utilityToast: Ref<Toast | null> = ref(null);

onMounted(() => {
  if (toastUtilityRef.value)
    utilityToast.value = new Toast(toastUtilityRef.value);
});

interface LiveToastProps {
  name: string;
  text: string;
  delay: number;
}

const exposedProps: Ref<LiveToastProps | undefined> = ref();

defineExpose({
  setupToast: (value: LiveToastProps) => {
    exposedProps.value = value;
  },
  show: () => utilityToast.value?.show(),
});

switch (props.skin) {
  case "ok":
    iconName.value = OK_ICON;
    skinColorClasses.value = OK_SKIN;
    break;
  case "info":
    iconName.value = INFO_ICON;
    skinColorClasses.value = INFO_SKIN;
    break;
  case "success":
    iconName.value = BELL_ICON;
    skinColorClasses.value = SUCCESS_SKIN;
    break;
  case "confirm":
    iconName.value = CONFIRM_ICON;
    skinColorClasses.value = CONFIRM_SKIN;
    break;
  case "warning":
    iconName.value = WARNING_ICON;
    skinColorClasses.value = WARNING_SKIN;
    break;
  case "danger":
    iconName.value = DANGER_ICON;
    skinColorClasses.value = DANGER_SKIN;
    break;
  default:
    iconName.value = OK_ICON;
    skinColorClasses.value = DEFAULT_SKIN;
}

const role = computed(() => (props.skin !== "ok" ? "alert" : "status"));
const ariaLive = computed(() => (props.skin !== "ok" ? "assertive" : "polite"));

const emit = defineEmits(["on-hidden-bs-toast"]);

onMounted(() => {
  toastUtilityRef.value?.addEventListener("hidden.bs.toast", () => {
    emit("on-hidden-bs-toast");
  });
});

onUnmounted(() => {
  toastUtilityRef.value?.removeEventListener("hidden.bs.toast", () => {
    console.log("the hidden bs toast event");
  });
});
</script>

<style scoped></style>
