import type { FC } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
// import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/common/Header';


const MainLayout: FC = () => {
  // const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col md:flex-row h-screen md:overflow-hidden relative">
      {/* Sidebar (Responsive) */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:w-80 md:flex-none
          h-screen md:h-full overflow-y-auto
        `}
      >
        <Sidebar onLinkClick={closeSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen md:h-full overflow-y-auto md:p-8 p-6 md:ml-0">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
