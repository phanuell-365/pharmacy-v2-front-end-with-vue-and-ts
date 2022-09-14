import { ref } from "vue";

export const useGetFormElement = (
  form: HTMLFormElement,
  formElTypeName: string,
  formElName: string
) => {
  const formElements = ref(form.getElementsByTagName(formElTypeName));

  return ref(formElements.value?.namedItem(formElName));
};
