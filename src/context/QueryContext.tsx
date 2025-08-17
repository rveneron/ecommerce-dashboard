// @ts-nocheck
import { memo } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChildrenProps } from '@dfl/mui-react-common';

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

const queryClient = new QueryClient(config);

const QueryProvider = ({ children }: ChildrenProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position={'bottom-right'} />
    </QueryClientProvider>
  );
};

export default memo(QueryProvider);
