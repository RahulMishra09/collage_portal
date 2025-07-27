import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Calendar, BookOpen, GraduationCap, Users, Building, UserCircle, MapPin, Check, X } from 'lucide-react';
import ProfileField from './ProfileField';
import InfoCard from './InfoCard';
import { useProfile } from '../hooks/useProfile';

export default function ProfilePage() {
  const {
    profile,
    loading,
    editingPhone,
    editingEmail,
    phoneValue,
    emailValue,
    setEditingPhone,
    setEditingEmail,
    setPhoneValue,
    setEmailValue,
    handleSavePhone,
    handleSaveEmail,
    handleCancelPhone,
    handleCancelEmail,
  } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading profile information...</p>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Profile data unavailable.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with avatar, name and registration */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4 border-2 border-muted shadow-md">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profile.name} />
            <AvatarFallback className="bg-black dark:bg-white text-white dark:text-black text-xl font-bold">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-muted-foreground mt-1">{profile.registrationNumber}</p>
        </div>

        {/* Main profile card */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            {/* Profile information grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-6">
                <ProfileField icon={<GraduationCap className="h-5 w-5 text-black dark:text-white" />} label="Program" value={profile.program} />
                <ProfileField icon={<BookOpen className="h-5 w-5 text-black dark:text-white" />} label="Branch" value={profile.branch} />
                <ProfileField icon={<Calendar className="h-5 w-5 text-black dark:text-white" />} label="Year" value={profile.year} />
                <ProfileField icon={<Calendar className="h-5 w-5 text-black dark:text-white" />} label="Semester" value={profile.semester} />
                <ProfileField icon={<UserCircle className="h-5 w-5 text-black dark:text-white" />} label="Gender" value={profile.gender} />
              </div>
              <div className="space-y-6">
                {/* Editable Phone Field */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Phone className="h-5 w-5 text-black dark:text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    {editingPhone ? (
                      <div className="mt-1 space-y-2">
                        <Input value={phoneValue} onChange={e => setPhoneValue(e.target.value)} className="h-8" />
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={handleSavePhone}>
                            <Check className="h-3.5 w-3.5 mr-1" /> Save
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={handleCancelPhone}>
                            <X className="h-3.5 w-3.5 mr-1" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{profile.phone}</p>
                        <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={() => setEditingPhone(true)}>
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {/* Editable Email Field */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Mail className="h-5 w-5 text-black dark:text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    {editingEmail ? (
                      <div className="mt-1 space-y-2">
                        <Input type="email" value={emailValue} onChange={e => setEmailValue(e.target.value)} className="h-8" />
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={handleSaveEmail}>
                            <Check className="h-3.5 w-3.5 mr-1" /> Save
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={handleCancelEmail}>
                            <X className="h-3.5 w-3.5 mr-1" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{profile.email}</p>
                        <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={() => setEditingEmail(true)}>
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <ProfileField icon={<Users className="h-5 w-5 text-black dark:text-white" />} label="Class Coordinator" value={profile.classCoordinator} />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Additional info card */}
        <Card className="mt-6 border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="h-5 w-5 text-black dark:text-white" />
              <h3 className="text-lg font-semibold">Academic Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard label="Current CGPA" value={profile.cgpa} icon={<GraduationCap className="h-5 w-5" />} />
              <InfoCard label="Attendance" value={profile.attendance} icon={<Users className="h-5 w-5" />} />
              <InfoCard label="Campus" value={profile.campus} icon={<MapPin className="h-5 w-5" />} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 