export const useGetResponseHeaders = (response: Response) => {
  return new Map(response.headers.entries());
};
