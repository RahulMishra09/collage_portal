import React from 'react';
import { Calendar, Clock, FileText, Upload, Eye, Award, AlertCircle } from 'lucide-react';
import type { Assignment } from '../types';

interface AssignmentCardProps {
  assignment: Assignment;
  onView: () => void;
  onSubmit: () => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onView,
  onSubmit
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      case 'graded': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'submitted': return <Upload className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'graded': return <Award className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const isOverdue = () => {
    return new Date() > new Date(assignment.dueDate) && assignment.status !== 'submitted' && assignment.status !== 'graded';
  };

  const canSubmit = () => {
    return assignment.status === 'pending' || assignment.status === 'draft' || 
           (assignment.allowLateSubmission && assignment.status === 'overdue');
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    const diff = dueDate.getTime() - now.getTime();

    if (diff <= 0) return 'Overdue';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} day${days !== 1 ? 's' : ''} remaining`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} remaining`;
    return 'Due soon';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {assignment.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {assignment.courseName}
            </p>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
            {getStatusIcon(assignment.status)}
            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
          </span>
        </div>

        {/* Time Remaining */}
        <div className={`mb-4 p-2 rounded-lg text-sm ${
          isOverdue() 
            ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' 
            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
        }`}>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {getTimeRemaining()}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {assignment.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            Due: {formatDate(assignment.dueDate)}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <FileText className="w-4 h-4 mr-2" />
            Max Score: {assignment.maxScore} points
          </div>
          {assignment.submissionCount > 0 && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Upload className="w-4 h-4 mr-2" />
              Submissions: {assignment.submissionCount}
            </div>
          )}
        </div>

        {/* Score Display */}
        {assignment.status === 'graded' && assignment.score !== undefined && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800 dark:text-green-400">
                Score Received
              </span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {assignment.score}/{assignment.maxScore}
              </span>
            </div>
            {assignment.feedback && (
              <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                {assignment.feedback}
              </p>
            )}
          </div>
        )}

        {/* Submitted Files */}
        {assignment.attachments && assignment.attachments.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Submitted Files:</h4>
            <div className="space-y-1">
              {assignment.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded p-2">
                  <span>{file.name}</span>
                  <span>{(file.size / (1024 * 1024)).toFixed(1)}MB</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onView}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          {canSubmit() && (
            <button
              onClick={onSubmit}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              {assignment.submittedDate ? 'Resubmit' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;