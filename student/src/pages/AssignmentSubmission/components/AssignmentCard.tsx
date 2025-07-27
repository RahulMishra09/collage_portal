import React from 'react';
import { Calendar, Clock, FileText, Upload, Eye, Award, Download } from 'lucide-react';
import { getStatusColor, getTimeRemaining, formatDate, calculateGradePercentage, getGradeColor } from '../../utils';
import type { Assignment } from '../../types';

interface AssignmentCardProps {
  assignment: Assignment;
  onViewDetails: () => void;
  onSubmit: () => void;
  onDownloadFile?: (fileId: string, fileName: string) => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onViewDetails,
  onSubmit,
  onDownloadFile
}) => {
  const timeRemaining = getTimeRemaining(assignment.dueDate, assignment.dueTime);
  const isOverdue = timeRemaining === 'Overdue';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'submitted': return <FileText className="w-4 h-4" />;
      case 'overdue': return <Clock className="w-4 h-4" />;
      case 'graded': return <Award className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
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
              {assignment.subjectName} ({assignment.subject})
            </p>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
            {getStatusIcon(assignment.status)}
            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
          </span>
        </div>

        {/* Time Remaining */}
        <div className={`mb-4 p-2 rounded-lg text-sm ${
          isOverdue 
            ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' 
            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
        }`}>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {timeRemaining}
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
            Due: {formatDate(assignment.dueDate)} at {assignment.dueTime}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <FileText className="w-4 h-4 mr-2" />
            Max Marks: {assignment.maxMarks}
          </div>
        </div>

        {/* Grade */}
        {assignment.status === 'graded' && assignment.grade !== undefined && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800 dark:text-green-400">
                Grade Received
              </span>
              <span className={`text-lg font-bold ${getGradeColor(calculateGradePercentage(assignment.grade, assignment.maxMarks))}`}>
                {assignment.grade}/{assignment.maxMarks} ({calculateGradePercentage(assignment.grade, assignment.maxMarks)}%)
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
        {assignment.submittedFiles && assignment.submittedFiles.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Submitted Files:</h4>
            <div className="space-y-1">
              {assignment.submittedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded p-2">
                  <span>{file.name}</span>
                  <div className="flex items-center gap-2">
                    <span>{file.size}</span>
                    {file.downloadUrl && file.id && onDownloadFile && (
                      <button
                        onClick={() => onDownloadFile(file.id!, file.name)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onViewDetails}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          {assignment.status === 'pending' && (
            <button
              onClick={onSubmit}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
