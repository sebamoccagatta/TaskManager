
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import TaskCreate from './components/TaskCreate.tsx';
import TaskEdit from './components/TaskEdit.tsx';
import TaskItem from './components/TaskItem.tsx';
import MainLayout from './layouts/MainLayout.tsx';

const root = document.getElementById('root');
createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<App />} />
        <Route path='/newTask' element={<TaskCreate />} />
        <Route path='/editTask/:id' element={<TaskEdit />} />
        <Route path='/task/:id' element={<TaskItem />} />
        <Route path='/deleteTask/:id' element={<App />} />
        <Route path='*' element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
