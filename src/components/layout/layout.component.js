import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { GeistProvider, CssBaseline, Page } from '@geist-ui/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './header.component';
import Footer from './footer.component';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function Layout({ children }) {
  const [theme, setTheme] = useState('system');

  const toggleTheme = () => {
    setTheme((last) =>
      last === 'system' ? 'dark' : last === 'dark' ? 'light' : last === 'light' ? 'system' : 'system'
    );
  };

  const queryClient = new QueryClient();

  return (
    <GeistProvider themeType={theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : prefersDark ? 'dark' : 'light'}>
      <CssBaseline />
      <Page>
        <QueryClientProvider client={queryClient}>
          <Header theme={theme} onToggleTheme={toggleTheme} />
          <Page.Content padding={1}>
            <Outlet />
          </Page.Content>
          <Footer>footer</Footer>
        </QueryClientProvider>
      </Page>
    </GeistProvider>
  );
}

export default Layout;
