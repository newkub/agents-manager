import { Router } from '@solidjs/router';
import MainLayout from './components/MainLayout';

export default function App() {
  return (
    <div class="flex h-screen bg-bg-primary text-text-primary">
      <Router>
        <MainLayout />
      </Router>
    </div>
  );
}
