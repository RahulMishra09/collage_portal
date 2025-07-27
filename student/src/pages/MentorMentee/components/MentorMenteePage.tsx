import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';
import { useMentorMenteeForm } from '../hooks/useMentorMenteeForm';
import type { Rating } from '../models';

const RatingSelect = ({ name, value, onChange }: { name: string; value: Rating; onChange: (value: string, name: string) => void }) => (
  <Select onValueChange={value => onChange(value, name)} value={value.toString()}>
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

const MentorMenteePage = () => {
  const {
    formData,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
  } = useMentorMenteeForm();

  return (
    <>
      <Card className="max-w-full mt-3 mx-auto">
        <CardHeader>
          <CardTitle>Mentor-Mentee Interaction Form {'>>'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Student Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enrollmentNumber">Enrollment Number</Label>
                  <Input id="enrollmentNumber" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mentorName">Mentor Name</Label>
                  <Input id="mentorName" name="mentorName" value={formData.mentorName} onChange={handleInputChange} required />
                </div>
              </div>
            </section>
            {/* Academic Progress */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Academic Progress</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentCGPA">Current CGPA</Label>
                  <Input id="currentCGPA" name="currentCGPA" value={formData.currentCGPA} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendancePercentage">Attendance Percentage</Label>
                  <Input id="attendancePercentage" name="attendancePercentage" value={formData.attendancePercentage} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicDifficulties">Academic Difficulties (if any)</Label>
                  <Textarea id="academicDifficulties" name="academicDifficulties" value={formData.academicDifficulties} onChange={handleInputChange} className="h-24" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicStrengths">Academic Strengths</Label>
                  <Textarea id="academicStrengths" name="academicStrengths" value={formData.academicStrengths} onChange={handleInputChange} className="h-24" />
                </div>
              </div>
            </section>
            {/* Mentorship Experience */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Mentorship Experience</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Overall Mentorship Experience (1-5)</Label>
                  <RatingSelect name="mentorshipRating" value={formData.mentorshipRating} onChange={handleSelectChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meetingFrequency">Mentor Meeting Frequency</Label>
                  <Select onValueChange={value => handleSelectChange(value, 'meetingFrequency')} value={formData.meetingFrequency}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Biweekly">Biweekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Rarely">Rarely</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="meetingHelpful" checked={formData.meetingHelpful} onCheckedChange={checked => handleCheckboxChange(checked as boolean, 'meetingHelpful')} />
                  <Label htmlFor="meetingHelpful">Mentor meetings are helpful and productive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="mentorAccessible" checked={formData.mentorAccessible} onCheckedChange={checked => handleCheckboxChange(checked as boolean, 'mentorAccessible')} />
                  <Label htmlFor="mentorAccessible">Mentor is accessible when needed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="careerGuidance" checked={formData.careerGuidance} onCheckedChange={checked => handleCheckboxChange(checked as boolean, 'careerGuidance')} />
                  <Label htmlFor="careerGuidance">Received career guidance from mentor</Label>
                </div>
              </div>
            </section>
            {/* Personal Development */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Development</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personalChallenges">Personal Challenges (if any)</Label>
                  <Textarea id="personalChallenges" name="personalChallenges" value={formData.personalChallenges} onChange={handleInputChange} className="h-24" />
                </div>
                <div className="space-y-2">
                  <Label>Current Stress Level (1-5)</Label>
                  <RatingSelect name="stressLevel" value={formData.stressLevel} onChange={handleSelectChange} />
                </div>
                <div className="space-y-2">
                  <Label>Work-Life Balance (1-5)</Label>
                  <RatingSelect name="workLifeBalance" value={formData.workLifeBalance} onChange={handleSelectChange} />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="extracurricularParticipation" checked={formData.extracurricularParticipation} onCheckedChange={checked => handleCheckboxChange(checked as boolean, 'extracurricularParticipation')} />
                  <Label htmlFor="extracurricularParticipation">Participating in extracurricular activities</Label>
                </div>
              </div>
            </section>
            {/* Goals & Planning */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Goals & Planning</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shortTermGoals">Short-term Academic/Career Goals</Label>
                  <Textarea id="shortTermGoals" name="shortTermGoals" value={formData.shortTermGoals} onChange={handleInputChange} className="h-24" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longTermGoals">Long-term Career Goals</Label>
                  <Textarea id="longTermGoals" name="longTermGoals" value={formData.longTermGoals} onChange={handleInputChange} className="h-24" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skillsToImprove">Skills You'd Like to Improve</Label>
                  <Textarea id="skillsToImprove" name="skillsToImprove" value={formData.skillsToImprove} onChange={handleInputChange} className="h-24" />
                </div>
              </div>
            </section>
            {/* Support Systems */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Support Systems</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="mentorSupport" checked={formData.mentorSupport} onCheckedChange={checked => handleCheckboxChange(checked as boolean, 'mentorSupport')} />
                  <Label htmlFor="mentorSupport">Receiving adequate support from mentor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="peerSupport" checked={formData.peerSupport} onCheckedChange={checked => handleCheckboxChange(checked as boolean, 'peerSupport')} />
                  <Label htmlFor="peerSupport">Have a supportive peer group</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="familySupport" checked={formData.familySupport} onCheckedChange={checked => handleCheckboxChange(checked as boolean, 'familySupport')} />
                  <Label htmlFor="familySupport">Have family support</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalSupportNeeded">Additional Support Needed</Label>
                  <Textarea id="additionalSupportNeeded" name="additionalSupportNeeded" value={formData.additionalSupportNeeded} onChange={handleInputChange} className="h-24" />
                </div>
              </div>
            </section>
            {/* Additional Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Additional Information</h2>
              <div className="space-y-2">
                <Label htmlFor="additionalComments">Any other comments or concerns</Label>
                <Textarea id="additionalComments" name="additionalComments" value={formData.additionalComments} onChange={handleInputChange} className="h-24" />
              </div>
            </section>
            <Button type="submit" className="w-full bg-ManipalAccent text-white hover:bg-ManipalAccent/80 transition-colors" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
};

export default MentorMenteePage; 