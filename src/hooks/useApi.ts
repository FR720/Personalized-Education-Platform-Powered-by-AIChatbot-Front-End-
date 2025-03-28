import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { api, ApiResponse } from "../services/api";
import { AxiosError } from "axios";

// Example interfaces
interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

// Query Hooks till backend is ready
export const useUser = (
  userId: string,
  options?: UseQueryOptions<ApiResponse<User>, AxiosError>
) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.get<User>(`/users/${userId}`),
    ...options,
  });
};

export const useUsers = (
  options?: UseQueryOptions<ApiResponse<User[]>, AxiosError>
) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => api.get<User[]>("/users"),
    ...options,
  });
};

// Mutation Hooks
export const useCreateUser = (
  options?: UseMutationOptions<ApiResponse<User>, AxiosError, CreateUserData>
) => {
  return useMutation({
    mutationFn: (data: CreateUserData) => api.post<User>("/users", data),
    ...options,
  });
};

export const useUpdateUser = (
  options?: UseMutationOptions<
    ApiResponse<User>,
    AxiosError,
    { id: string; data: Partial<User> }
  >
) => {
  return useMutation({
    mutationFn: ({ id, data }) => api.put<User>(`/users/${id}`, data),
    ...options,
  });
};

export const useDeleteUser = (
  options?: UseMutationOptions<ApiResponse<void>, AxiosError, string>
) => {
  return useMutation({
    mutationFn: (id: string) => api.delete(`/users/${id}`),
    ...options,
  });
};
