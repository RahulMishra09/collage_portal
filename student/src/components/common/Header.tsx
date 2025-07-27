import type { FC } from 'react';
import { memo } from 'react';
import { Bell, Moon, Sun, Menu } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = memo(({ toggleSidebar }) => (
  <div className="flex gap-5 items-center">
    {/* Hamburger Icon - only visible on mobile */}
    <button className="md:hidden" onClick={toggleSidebar}>
      <Menu size={28} />
    </button>

    {/* Search Bar */}
    <div className="flex items-center gap-2 w-full md:w-[850px]">
      <SearchBar placeholder="Search classes, events..." onSearch={() => {}} />
    </div>

    {/* Notification and Theme Toggle */}
    <Bell />
    <button
      className="p-2 rounded-full bg-white text-stone-900 dark:bg-stone-900 dark:text-white"
      onClick={toggleMode}
    >
      <Sun className="w-6 h-6 dark:hidden" />
      <Moon className="w-6 h-6 hidden dark:block" />
    </button>
  </div>
));

export default Header;

const toggleMode = () => {
  const root = document.documentElement;
  root.classList.toggle('dark');
};
