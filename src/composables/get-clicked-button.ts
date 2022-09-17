import { useGetFormElements } from "@/composables/get-form-elements";
import type { Ref } from "vue";
import { ref } from "vue";

export const useGetClickedButton = (form: HTMLFormElement) => {
  const buttons = useGetFormElements(form, "button").value;

  const buttonEls: Ref<HTMLButtonElement[]> = ref([]);

  for (let but = 0; but < buttons.length; but++) {
    const butt = buttons[but] as HTMLButtonElement;

    buttonEls.value.push(butt);
  }

  const clickedButton: Ref<HTMLButtonElement | undefined> = ref(
    buttonEls.value.find((value) => value.value === "true")
  );

  return clickedButton;
};
