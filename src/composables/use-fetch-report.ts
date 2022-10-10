import { BASE_URL } from "@/constants/base-url";
import { useTokenStore } from "@/stores/auth/token";
// import { useGetFileName } from "@/composables/get-filename";

export const useFetchReport = async (model: string) => {
  const tokenStore = useTokenStore();

  const response: Response = await fetch(`${BASE_URL}/reports/${model}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",
      Authorization: "Bearer " + tokenStore.getStoredToken(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load the report");
  }

  const blob = await response.blob();

  const file = window.URL.createObjectURL(blob);

  window.location.assign(file);

  // const filename = useGetFileName(response);
  //
  // const link: HTMLAnchorElement = document.createElement("a");
  // link.href = file;
  // link.setAttribute("download", filename);
  // document.body.appendChild(link);
  // link.click();

  setTimeout(() => {
    URL.revokeObjectURL(file);
  }, 300);

  return response;
};
