import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "#/lib/query-keys";
import { apiRequest } from "#/lib/api-client";
import type {
  CreateSourceRequestBody,
  CreateSourceResponseBody,
  SourcesListResponseBody,
} from "#/types/api";

export function useSources() {
  return useQuery({
    queryKey: queryKeys.sources,
    queryFn: () =>
      apiRequest<SourcesListResponseBody>({
        path: "/sources",
        method: "GET",
      }),
  });
}

export function useCreateSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSourceRequestBody) =>
      apiRequest<CreateSourceResponseBody, CreateSourceRequestBody>({
        path: "/sources",
        method: "POST",
        body: payload,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.sources });
    },
  });
}

