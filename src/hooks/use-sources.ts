import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "#/lib/query-keys";
import { apiRequest } from "#/lib/api-client";
import type {
  CreateSourceRequestBody,
  CreateSourceResponseBody,
  SourcesListResponseBody,
} from "#/types/api";

const POLL_INTERVAL_MS = 2000;

export function useSources() {
  return useQuery({
    queryKey: queryKeys.sources,
    queryFn: () =>
      apiRequest<SourcesListResponseBody>({
        path: "/sources",
        method: "GET",
      }),
    refetchInterval: (query) =>
      query.state.data?.some((s) => s.status === "processing") ? POLL_INTERVAL_MS : false,
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

export function useRemoveSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sourceId: string) =>
      apiRequest<void>({
        path: `/sources/${sourceId}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.sources });
    },
  });
}

