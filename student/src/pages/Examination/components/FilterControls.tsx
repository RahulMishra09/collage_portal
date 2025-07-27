import type { FC } from 'react';
import { Filter, ArrowUpDown, RefreshCw } from 'lucide-react';
import type { FilterControlsProps } from '../models';

const FilterControls: FC<FilterControlsProps> = ({
  onTypeChange,
  onSortDirectionChange,
  onRefresh,
  sortDirection,
  isLoading,
  examTypes,
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full flex-wrap">
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <Filter className="text-black dark:text-white" />
      <select
        className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-white-400 bg-white dark:bg-black text-black dark:text-white"
        onChange={e => onTypeChange(e.target.value)}
      >
        <option value="All">All Types</option>
        {examTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
    <button
      onClick={onSortDirectionChange}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-black dark:text-white w-full sm:w-auto"
    >
      <ArrowUpDown className="w-4 h-4" />
      {sortDirection === 'asc' ? 'Earliest First' : 'Latest First'}
    </button>
    <button
      onClick={onRefresh}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-black dark:text-white disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
    >
      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      Refresh
    </button>
  </div>
);

export default FilterControls; 