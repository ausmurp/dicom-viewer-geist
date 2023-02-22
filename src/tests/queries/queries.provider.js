/**
 * All providers for the queries hooks should be here.
 * Reference: https://github.com/TkDodo/testing-react-query.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const QueriesProvider = ({ children }) => {
  // ✅ creates a new QueryClient for each test

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // No retry for tests.
        retry: false
      }
    }
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
