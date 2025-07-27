import type { FC } from 'react';
import { Search } from 'lucide-react';
import type { SearchBarProps } from '../models';

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => (
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black dark:text-white" />
    <input
      type="text"
      placeholder="Search courses..."
      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-white-400 bg-white dark:bg-black text-black dark:text-white placeholder-black-500 dark:placeholder-white"
      onChange={e => onSearch(e.target.value)}
    />
  </div>
);

export default SearchBar; 