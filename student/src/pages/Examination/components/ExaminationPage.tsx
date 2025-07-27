import PageHeader from './PageHeader';
import SearchBar from './SearchBar';
import FilterControls from './FilterControls';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import ExamList from './ExamList';
import EmptyState from './EmptyState';
import InstructionsSection from './InstructionsSection';
import { useExamination } from '../hooks/useExamination';

const ExaminationPage = () => {
  const {
    exams,
    isLoading,
    error,
    sortDirection,
    examTypes,
    handleSearch,
    handleTypeChange,
    handleSortDirectionChange,
    handleRefresh,
  } = useExamination();

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <SearchBar onSearch={handleSearch} />
            <FilterControls
              onTypeChange={handleTypeChange}
              onSortDirectionChange={handleSortDirectionChange}
              onRefresh={handleRefresh}
              sortDirection={sortDirection}
              isLoading={isLoading}
              examTypes={examTypes}
            />
          </div>
          <ErrorMessage message={error} />
          <LoadingSpinner isLoading={isLoading} />
          <ExamList exams={exams} isLoading={isLoading} />
          <EmptyState isVisible={!isLoading && exams.length === 0} />
        </div>
      </div>
      <InstructionsSection />
    </div>
  );
};

export default ExaminationPage; 