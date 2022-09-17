import { ref } from "vue";

export const useGetFormElements = (
  form: HTMLFormElement,
  formElTagName: string
) => {
  return ref(form.getElementsByTagName(formElTagName));
};
