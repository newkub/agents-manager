import { createSignal, onCleanup, onMount } from 'solid-js';

interface AgentStatus {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'error' | 'completed';
  lastUpdate: string;
}

export function useAgentStatus() {
  const [agents, setAgents] = createSignal<AgentStatus[]>([
    {
      id: '1',
      name: 'Code Generator',
      status: 'idle',
      lastUpdate: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'File Analyzer',
      status: 'idle',
      lastUpdate: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Test Runner',
      status: 'idle',
      lastUpdate: new Date().toISOString(),
    },
  ]);

  const updateAgentStatus = (id: string, status: AgentStatus['status']) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, status, lastUpdate: new Date().toISOString() } : agent
      )
    );
  };

  const simulateAgentActivity = () => {
    const statuses: AgentStatus['status'][] = ['idle', 'running', 'error', 'completed'];
    setInterval(() => {
      const randomAgent = agents()[Math.floor(Math.random() * agents().length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      updateAgentStatus(randomAgent.id, randomStatus);
    }, 5000);
  };

  onMount(() => {
    simulateAgentActivity();
  });

  return {
    agents,
    updateAgentStatus,
  };
}
