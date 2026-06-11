import MainLayout from '@components/MainLayout';
import Sidebar from '@components/Sidebar';
import { Router } from '@solidjs/router';

export default function App() {
  return (
    <Router>
      <div class="flex h-screen bg-bg-primary text-text-primary">
        <Sidebar />
        <MainLayout />
      </div>
    </Router>
  );
}
