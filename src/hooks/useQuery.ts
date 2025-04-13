// hooks/useApiQuery.ts
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";

interface QueryConfig<TData>
  extends Omit<UseQueryOptions<TData, AxiosError>, "queryKey" | "queryFn"> {
  url: string;
  params?: object;
}

export function useApiQuery<TData = any>({
  url,
  params,
  ...config
}: QueryConfig<TData>) {
  return useQuery<TData, AxiosError>({
    queryKey: [url, params],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { params });
      return data;
    },
    ...config,
  });
}
