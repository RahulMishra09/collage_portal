import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useStudentFeedback } from '../hooks/useStudentFeedback';

const RatingSelect = ({ name, value, onChange }: { name: string; value: number; onChange: (value: string, name: string) => void }) => (
  <Select onValueChange={val => onChange(val, name)} value={value.toString()}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select rating" />
    </SelectTrigger>
    <SelectContent>
      {[1, 2, 3, 4, 5].map(num => (
        <SelectItem key={num} value={num.toString()}>
          {num} - {num === 1 ? 'Poor' : num === 5 ? 'Excellent' : ''}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default function StudentFeedbackPage() {
  const { user } = useAuth();
  const {
    isSubmitting,
    feedback,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
  } = useStudentFeedback(user);

  if (!feedback) {
    return <div>Loading feedback form...</div>;
  }

  return (
    <Card className="max-w-full mt-3 mx-auto">
      <CardHeader>
        <CardTitle>Student Feedback Form {'>>'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal & Course Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Personal & Course Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={feedback.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" value={feedback.email} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name / Subject</Label>
                <Input id="courseName" name="courseName" value={feedback.courseName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructorName">Instructor Name</Label>
                <Input id="instructorName" name="instructorName" value={feedback.instructorName} onChange={handleInputChange} required />
              </div>
            </div>
          </section>

          {/* Learning Experience */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Learning Experience</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Overall Learning Experience (1-5)</Label>
                <RatingSelect name="overallExperience" value={feedback.overallExperience} onChange={handleSelectChange} />
              </div>
              <div className="space-y-2">
                <Label>Course Engagement (1-5)</Label>
                <RatingSelect name="courseEngagement" value={feedback.courseEngagement} onChange={handleSelectChange} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="objectivesClear" checked={feedback.objectivesClear} onCheckedChange={checked => handleCheckboxChange(!!checked, 'objectivesClear')} />
                <Label htmlFor="objectivesClear">Objectives were clear</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="classParticipation" checked={feedback.classParticipation} onCheckedChange={checked => handleCheckboxChange(!!checked, 'classParticipation')} />
                <Label htmlFor="classParticipation">Class participation encouraged</Label>
              </div>
            </div>
          </section>

          {/* Instructor Feedback */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Instructor Feedback</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Instructor Rating (1-5)</Label>
                <RatingSelect name="instructorRating" value={feedback.instructorRating} onChange={handleSelectChange} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="instructorFeedback" checked={feedback.instructorFeedback} onCheckedChange={checked => handleCheckboxChange(!!checked, 'instructorFeedback')} />
                <Label htmlFor="instructorFeedback">Instructor provided helpful feedback</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="instructorApproachable" checked={feedback.instructorApproachable} onCheckedChange={checked => handleCheckboxChange(!!checked, 'instructorApproachable')} />
                <Label htmlFor="instructorApproachable">Instructor was approachable</Label>
              </div>
            </div>
          </section>

          {/* Course Materials & Assignments */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Course Materials & Assignments</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="materialsHelpful" checked={feedback.materialsHelpful} onCheckedChange={checked => handleCheckboxChange(!!checked, 'materialsHelpful')} />
                <Label htmlFor="materialsHelpful">Course materials were helpful</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="assignmentsUseful" checked={feedback.assignmentsUseful} onCheckedChange={checked => handleCheckboxChange(!!checked, 'assignmentsUseful')} />
                <Label htmlFor="assignmentsUseful">Assignments were useful</Label>
              </div>
              <div className="space-y-2">
                <Label>Resources Rating (1-5)</Label>
                <RatingSelect name="resourcesRating" value={feedback.resourcesRating} onChange={handleSelectChange} />
              </div>
            </div>
          </section>

          {/* Classroom Environment */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Classroom Environment</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="comfortableAtmosphere" checked={feedback.comfortableAtmosphere} onCheckedChange={checked => handleCheckboxChange(!!checked, 'comfortableAtmosphere')} />
                <Label htmlFor="comfortableAtmosphere">Comfortable classroom atmosphere</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="groupActivities" checked={feedback.groupActivities} onCheckedChange={checked => handleCheckboxChange(!!checked, 'groupActivities')} />
                <Label htmlFor="groupActivities">Group activities were encouraged</Label>
              </div>
            </div>
          </section>

          {/* Open Feedback */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Open Feedback</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bestAspect">Best aspect of the course</Label>
                <Textarea id="bestAspect" name="bestAspect" value={feedback.bestAspect} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="improvements">Suggestions for improvement</Label>
                <Textarea id="improvements" name="improvements" value={feedback.improvements} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalComments">Additional comments</Label>
                <Textarea id="additionalComments" name="additionalComments" value={feedback.additionalComments} onChange={handleInputChange} />
              </div>
            </div>
          </section>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 