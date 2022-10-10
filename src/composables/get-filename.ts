import { useGetResponseHeaders } from "@/composables/get-response-headers";

export const useGetFileName = (response: Response) => {
  const headers = useGetResponseHeaders(response);

  const contentDisposition = headers.get("content-disposition");

  return contentDisposition?.split("filename=")[1] as string;
};
