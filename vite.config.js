import { defineConfig } from 'vite';

// The page is one self-contained HTML file on purpose:
// it must still open as file://index.html with no server running,
// and publish to an Artifact in a single call with no build step.
// Vite is here only as a dev server that auto-reloads on save.
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,   // fail loudly instead of silently moving to 5174
    open: false,
  },
});
