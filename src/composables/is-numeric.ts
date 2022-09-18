import { ref } from "vue";

export const useIsNumeric = (value: string) => {
  return ref(/^\d+$/.test(value));
};
