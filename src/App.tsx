import { RevenuePage } from './pages'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Layout } from './components';
import { MantineTheme } from './styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider theme={MantineTheme}>
        {/* <Notifications /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/revenue" />}  />
          <Route
            path="/dashboard"
            element={
              <Layout />
            }
          >
            <Route path="revenue" element={<RevenuePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
