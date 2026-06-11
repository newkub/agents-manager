import { createSignal, onCleanup, onMount } from 'solid-js';

interface User {
  id: string;
  name: string;
  color: string;
  cursor?: { line: number; column: number };
  isOnline: boolean;
}

export function useCollaboration() {
  const [users, setUsers] = createSignal<User[]>([
    {
      id: '1',
      name: 'You',
      color: '#58a6ff',
      cursor: { line: 0, column: 0 },
      isOnline: true,
    },
  ]);
  const [isConnected, setIsConnected] = createSignal(false);

  const connect = () => {
    setIsConnected(true);
    // Simulate other users joining
    setTimeout(() => {
      setUsers((prev) => [
        ...prev,
        {
          id: '2',
          name: 'Alice',
          color: '#3fb950',
          cursor: { line: 5, column: 10 },
          isOnline: true,
        },
      ]);
    }, 1000);
  };

  const disconnect = () => {
    setIsConnected(false);
    setUsers((prev) => prev.filter((u) => u.id === '1'));
  };

  const updateCursor = (line: number, column: number) => {
    setUsers((prev) => prev.map((u) => (u.id === '1' ? { ...u, cursor: { line, column } } : u)));
  };

  const simulateRemoteCursor = () => {
    setInterval(() => {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id !== '1' && u.isOnline) {
            const line = Math.floor(Math.random() * 50);
            const column = Math.floor(Math.random() * 80);
            return { ...u, cursor: { line, column } };
          }
          return u;
        })
      );
    }, 3000);
  };

  onMount(() => {
    simulateRemoteCursor();
  });

  onCleanup(() => {
    disconnect();
  });

  return {
    users,
    isConnected,
    connect,
    disconnect,
    updateCursor,
  };
}
