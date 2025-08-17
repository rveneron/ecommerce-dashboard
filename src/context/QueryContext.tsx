import { memo } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChildrenProps } from 'types/children-props';

const queryCache = new QueryCache();
const mutationCache = new MutationCache();

const config = {
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      networkMode: 'offlineFirst',
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
};
// @ts-ignore
const queryClient = new QueryClient(config);

const QueryProvider = ({ children }: ChildrenProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default memo(QueryProvider);
