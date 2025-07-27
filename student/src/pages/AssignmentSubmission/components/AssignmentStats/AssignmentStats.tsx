import React from 'react';
import { BookOpen, Clock, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';
import type { AssignmentStats } from '../../types';

interface AssignmentStatsProps {
  stats: AssignmentStats;
}

const AssignmentStats: React.FC<AssignmentStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {[
        { icon: <BookOpen className="h-8 w-8 text-blue-600" />, label: 'Total', value: stats.total },
        { icon: <Clock className="h-8 w-8 text-orange-600" />, label: 'Pending', value: stats.pending },
        { icon: <CheckCircle className="h-8 w-8 text-green-600" />, label: 'Submitted', value: stats.submitted },
        { icon: <AlertCircle className="h-8 w-8 text-red-600" />, label: 'Overdue', value: stats.overdue },
        { icon: <TrendingUp className="h-8 w-8 text-purple-600" />, label: 'Avg Grade', value: `${stats.averageGrade}%` },
      ].map((stat, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            {stat.icon}
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignmentStats;
