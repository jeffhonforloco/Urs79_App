import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Dismiss loading screen after React mounts
requestAnimationFrame(() => {
  const ls = document.getElementById('loading-screen');
  if (ls) {
    ls.style.opacity = '0';
    ls.style.visibility = 'hidden';
    setTimeout(() => ls.remove(), 600);
  }
});
