import AppRouter from '@/routers/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import toàn bộ solid icons
library.add(fas); // Thêm tất cả icon solid vào thư viện
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/stores/queryClient';
import AuthSyncProvider from './stores/AuthSyncProvider';



function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthSyncProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthSyncProvider>
    </QueryClientProvider>
  )
}

export default App
