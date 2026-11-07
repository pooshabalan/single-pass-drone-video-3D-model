import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

import AppShell from './components/layout/AppShell';

import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Upload from './pages/Upload';
import Reconstruction from './pages/Reconstruction';
import ModelViewer from './pages/ModelViewer';
import Map from './pages/Map';
import Measurements from './pages/Measurements';
import Export from './pages/Export';
import Settings from './pages/Settings';

export default function App() {
  // Initialize theme
  useTheme();

  return (
    <Router>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project" element={<Project />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/reconstruction" element={<Reconstruction />} />
          <Route path="/model" element={<ModelViewer />} />
          <Route path="/map" element={<Map />} />
          <Route path="/measurements" element={<Measurements />} />
          <Route path="/export" element={<Export />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
