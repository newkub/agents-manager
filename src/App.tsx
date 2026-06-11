import MainLayout from '@components/MainLayout';
import Sidebar from '@components/Sidebar';
import { Router, Route } from '@solidjs/router';

// Pages
import FilesPage from './pages/FilesPage';
import SkillsPage from './pages/SkillsPage';
import WorkflowsPage from './pages/WorkflowsPage';
import SettingsPage from './pages/SettingsPage';

// AI Registry Pages
import AIRegistryHome from './pages/ai-registry/Home';
import ModelsPage from './pages/ai-registry/ModelsPage';
import ModelDetail from './pages/ai-registry/ModelDetail';
import AgentsPage from './pages/ai-registry/AgentsPage';
import PromptsPage from './pages/ai-registry/PromptsPage';
import DatasetsPage from './pages/ai-registry/DatasetsPage';
import ComparePage from './pages/ai-registry/ComparePage';

export default function App() {
  return (
    <Router>
      <div class="flex h-screen bg-bg-primary text-text-primary">
        <Sidebar />
        <MainLayout>
          <Route path="/" component={FilesPage} />
          <Route path="/skills" component={SkillsPage} />
          <Route path="/workflows" component={WorkflowsPage} />
          <Route path="/settings" component={SettingsPage} />

          {/* AI Registry Routes */}
          <Route path="/ai-registry" component={AIRegistryHome} />
          <Route path="/ai-registry/models" component={ModelsPage} />
          <Route path="/ai-registry/models/:id" component={ModelDetail} />
          <Route path="/ai-registry/agents" component={AgentsPage} />
          <Route path="/ai-registry/prompts" component={PromptsPage} />
          <Route path="/ai-registry/datasets" component={DatasetsPage} />
          <Route path="/ai-registry/compare" component={ComparePage} />
        </MainLayout>
      </div>
    </Router>
  );
}
