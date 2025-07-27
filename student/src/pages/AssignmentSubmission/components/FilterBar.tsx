import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { AssignmentFilter, Subject } from '../../types';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: AssignmentFilter;
  onFiltersChange: (filters: AssignmentFilter) => void;
  subjects: Subject[];
  onRefresh: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  subjects,
  onRefresh
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <select
          value={filters.subject}
          onChange={(e) => onFiltersChange({ ...filters, subject: e.target.value })}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject.code} value={subject.code}>
              {subject.code} - {subject.name}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="submitted">Submitted</option>
          <option value="overdue">Overdue</option>
          <option value="graded">Graded</option>
        </select>

        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
