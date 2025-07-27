// src/pages/AssignmentSubmission/components/AssignmentSubmissionPage.tsx
import React, { useState } from 'react';
import { CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, RefreshCw, SortAsc, SortDesc, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import AssignmentCard from './AssignmentCard';
import AssignmentSubmissionModal from './AssignmentSubmissionModal';
import { useAssignments } from '../hooks/useAssignments';
import { useAssignmentFilters } from '../hooks/useAssignmentFilter';
import { useAssignmentSubmission } from '../hooks/useAssignmentSubmission';
import type { Assignment } from '../types';

const AssignmentSubmissionPage: React.FC = () => {
  const { 
    assignments, 
    subjects, 
    constants, 
    loading, 
    error, 
    usingFallback, 
    loadAllData 
  } = useAssignments();
  
  const {
    searchTerm,
    statusFilter,
    subjectFilter,
    sortBy,
    sortDirection,
    setSearchTerm,
    setStatusFilter,
    setSubjectFilter,
    setSortBy,
    setSortDirection,
    filteredAndSortedAssignments,
    resetFilters
  } = useAssignmentFilters(assignments);
  
  const { submitAssignmentFiles } = useAssignmentSubmission();
  
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    // You can implement a view modal here
  };

  const handleSubmitAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissionModal(true);
  };

  const handleSubmissionSuccess = () => {
    setShowSubmissionModal(false);
    setSelectedAssignment(null);
    loadAllData(); // Refresh the assignments list
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const statusOptions = constants?.statusOptions || [
    { value: "all", label: "All Assignments" },
    { value: "pending", label: "Pending" },
    { value: "submitted", label: "Submitted" },
    { value: "graded", label: "Graded" },
    { value: "overdue", label: "Overdue" },
    { value: "draft", label: "Draft" }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CardTitle>Assignment Submission {'>>'}</CardTitle>
            {usingFallback && (
              <Badge variant="outline" className="flex items-center gap-1">
                <WifiOff className="w-3 h-3" />
                Offline Mode
              </Badge>
            )}
            {!usingFallback && !loading && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                Online
              </Badge>
            )}
          </div>
          
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-yellow-800 text-sm font-medium">Data Source Notice</p>
                <p className="text-yellow-700 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Subject Filter */}
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort and Actions */}
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={(value: 'dueDate' | 'status' | 'title') => setSortBy(value)}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" onClick={toggleSortDirection}>
              {sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetFilters} size="sm">
              Clear Filters
            </Button>
            <Button variant="outline" onClick={loadAllData} disabled={loading} size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredAndSortedAssignments.length} of {assignments.length} assignments
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading assignments...</p>
          </div>
        )}

        {/* Assignments Grid */}
        {!loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onView={() => handleViewAssignment(assignment)}
                onSubmit={() => handleSubmitAssignment(assignment)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAndSortedAssignments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No assignments found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm || statusFilter !== 'all' || subjectFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'You have no assignments at the moment.'}
            </p>
            {(searchTerm || statusFilter !== 'all' || subjectFilter !== 'all') && (
              <Button variant="outline" onClick={resetFilters} className="mt-4">
                Clear All Filters
              </Button>
            )}
          </div>
        )}

        {/* Data Source Info */}
        {!loading && assignments.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            {usingFallback ? (
              <p className="flex items-center justify-center gap-2">
                <WifiOff className="w-4 h-4" />
                Data loaded from local files - some features may be limited
              </p>
            ) : (
              <p className="flex items-center justify-center gap-2">
                <Wifi className="w-4 h-4" />
                Connected to server - all features available
              </p>
            )}
          </div>
        )}

        {/* Submission Modal */}
        {selectedAssignment && (
          <AssignmentSubmissionModal
            assignment={selectedAssignment}
            isOpen={showSubmissionModal}
            onClose={() => setShowSubmissionModal(false)}
            onSubmissionSuccess={handleSubmissionSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AssignmentSubmissionPage;