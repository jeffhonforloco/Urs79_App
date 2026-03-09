/**
 * React Query hook for Cloudflare Worker proxy requests
 */
import { useQuery, useMutation } from '@tanstack/react-query';
import { workerClient } from '@/lib/workerClient';

/** GET via Worker proxy with React Query caching */
export function useWorkerQuery<T>(
  key: string[],
  path: string,
  options?: {
    withAuth?: boolean;
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await workerClient.get<T>(path, {
        withAuth: options?.withAuth,
      });
      if (error) throw new Error(error);
      return data as T;
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 60_000,
  });
}

/** POST/PUT/DELETE via Worker proxy */
export function useWorkerMutation<TData, TBody = unknown>(
  path: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST',
  options?: { withAuth?: boolean }
) {
  return useMutation({
    mutationFn: async (body?: TBody) => {
      let result;
      if (method === 'DELETE') {
        result = await workerClient.delete<TData>(path, { withAuth: options?.withAuth });
      } else if (method === 'PUT') {
        result = await workerClient.put<TData>(path, body, { withAuth: options?.withAuth });
      } else {
        result = await workerClient.post<TData>(path, body, { withAuth: options?.withAuth });
      }
      if (result.error) throw new Error(result.error);
      return result.data as TData;
    },
  });
}
