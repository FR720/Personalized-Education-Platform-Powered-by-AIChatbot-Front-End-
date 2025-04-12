import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";

interface MutationConfig<TData, TVariables>
  extends Omit<
    UseMutationOptions<TData, AxiosError, TVariables>,
    "mutationFn"
  > {
  getUrl: (variables: TVariables) => string; // بدل url الثابت
  method?: "POST" | "PUT" | "DELETE" | "PATCH";
  invalidateQueries?: string[];
}

export function useApiMutation<TData = unknown, TVariables = any>({
  getUrl,
  method = "POST",
  invalidateQueries = [],
  ...config
}: MutationConfig<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      const url = getUrl(variables); // استخدم المتغيرات لتوليد الـ URL
      const { data } = await axiosInstance({
        url,
        method,
        data: variables,
      });
      return data;
    },
    onSuccess: (...args) => {
      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });

      if (config.onSuccess) {
        config.onSuccess(...args);
      }
    },
    ...config,
  });
}
