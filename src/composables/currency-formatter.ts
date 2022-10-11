import { ref } from "vue";

export const useCurrencyFormatter = (arg: number) => {
  const formatter = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KSH",
  });

  return ref(formatter.format(arg));
};
