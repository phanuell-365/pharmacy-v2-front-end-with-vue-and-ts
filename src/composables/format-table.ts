import { ref } from "vue";

export const useFormatTable = (table: object[]) => {
  const newTable = ref(
    table.map((value) => {
      const keys = Object.keys(value);
      // keys
    })
  );
};
