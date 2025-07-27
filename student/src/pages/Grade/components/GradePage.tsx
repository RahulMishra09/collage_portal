import { Card } from '@/components/ui/card';
import { useGrade } from '../hooks/useGrade';

const GradePage = () => {
  const {
    selectedSemester,
    setSelectedSemester,
    showSemesterDropdown,
    setShowSemesterDropdown,
    loading,
    courseData,
    error,
    semesters,
  } = useGrade();

  return (
    <Card className="p-3 mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button
            onClick={() => setShowSemesterDropdown(!showSemesterDropdown)}
            className="border-2 px-4 py-2 rounded-md"
          >
            Semester: {selectedSemester}
          </button>
          {showSemesterDropdown && (
            <div className="absolute mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-md">
              {semesters.map((sem) => (
                <div
                  key={sem}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedSemester === sem ? 'font-semibold bg-yellow-200 dark:bg-gray-700' : ''
                  }`}
                  onClick={() => {
                    setSelectedSemester(sem);
                    setShowSemesterDropdown(false);
                  }}
                >
                  {sem}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => window.print()}
          className=" border-2 border-ManipalAccent text-ManipalAccent px-4 py-1 rounded-md"
        >
          Print
        </button>
      </div>
      {error && (
        <p className="text-red-600 dark:text-red-400 text-center mb-4 p-3 bg-red-100 dark:bg-red-900 rounded-md">
          {error}
        </p>
      )}
      {loading ? (
        <p className="text-center text-zinc-800 dark:text-slate-300">Loading grades...</p>
      ) : (
        <div className="overflow-x-auto bg-slate-50">
          <table className="w-full text-sm border-collapse ">
            <thead>
              <tr className=" dark:bg-neutral-950">
                <th className="py-2 px-2">S.No</th>
                <th className="py-2 px-2 text-left">Course</th>
                <th className="py-2 px-2">MTE</th>
                <th className="py-2 px-2">Assignment</th>
                <th className="py-2 px-2">Quiz</th>
                <th className="py-2 px-2">MOOC Course</th>
                <th className="py-2 px-2">ETE</th>
                <th className="py-2 px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(courseData) && courseData.map((course, index) => (
                <tr key={course.id} className={index % 2 === 0 ? ' dark:bg-zinc-900' : ' dark:bg-stone-950'}>
                  <td className="py-2 px-2 text-center">{index + 1}</td>
                  <td className="py-2 px-2">{course.name} ({course.code})</td>
                  <td className="py-2 px-2 text-center">{course.mte}</td>
                  <td className="py-2 px-2 text-center">{course.assignment}</td>
                  <td className="py-2 px-2 text-center">{course.quiz}</td>
                  <td className="py-2 px-2 text-center">{course.moocCourse}</td>
                  <td className="py-2 px-2 text-center">{course.ete}</td>
                  <td className="py-2 px-2 text-center font-semibold">{course.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default GradePage; 