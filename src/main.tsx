import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Di dalam fungsi render utama kamu:
function MainApp() {
  return (
    <>
      <App /> 
      {/* Tambahkan dua baris ini di paling bawah sebelum penutup tag fragment */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MainApp />
  </BrowserRouter>,
)
