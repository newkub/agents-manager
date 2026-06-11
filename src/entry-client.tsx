import { render } from 'solid-js/web';

function SimplePage() {
  return (
    <div style="background: #1a1a2e; color: white; padding: 40px; height: 100vh;">
      <h1 style="font-size: 32px; margin-bottom: 20px;">Agent Manager</h1>
      <p style="font-size: 18px;">Simple test page - if you see this, rendering works</p>
      <div style="margin-top: 20px; padding: 20px; background: #16213e; border-radius: 8px;">
        <p>Status: Rendering successfully</p>
      </div>
    </div>
  );
}

render(() => <SimplePage />, document.getElementById('root') as HTMLElement);
