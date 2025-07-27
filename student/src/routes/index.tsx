// src/routes/index.tsx
import type { FC } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import DashboardPage from '@/pages/Dashboard';
import TimetablePage from '@/pages/TimeTable';
import StudentFeedback from '@/pages/StudentFeedback';
import ExaminationsPage from '@/pages/Examination';
import GradePage from '@/pages/Grade';
import FinancePage from '../pages/Finance';
import OpenElective from '@/pages/Registration/OpenElective';
import MakeUp from '@/pages/Registration/MakeUp';
import ReRegistration from '@/pages/Registration/ReRegistration';
import SemesterCourse from '@/pages/Registration/SemesterCourse';
import BridgeCourse from '@/pages/Registration/BridgeCourse';
import ResourcesPage from '@/pages/Resources';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import MainLayout from '@/layouts/MainLayout';
import {useAuth} from '@/contexts/AuthContext';
import React, { lazy } from 'react';
import ProfilePage from '@/pages/Profile';
import AttendanceDetailed from '@/pages/Attendance';
import NOCRequestPage from '@/pages/NOC/components/noc-request-page';
import AssignmentSubmission from '@/pages/AssignmentSubmission';

const MentorMenteePage = lazy(() => import("@/pages/MentorMentee"));

const AppRoutes: FC = () => {
    const {isAuthenticated} = useAuth();

    return (
        <Routes>
            {/* Auth routes - no layout */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login/>}/>
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/"/> : <Signup/>}/>

            {/* Protected routes - with layout */}
            <Route
                element={
                    isAuthenticated ? (
                        <MainLayout/>
                    ) : (
                        <Navigate to="/login"/>
                    )
                }
            >
                <Route path="/" element={<DashboardPage/>}/>
                <Route path="/timetable" element={<TimetablePage/>}/>
                {/* <Route path="/timetable" element={<TimetablePage/>}/> */}
                <Route path="/feedback" element={<StudentFeedback/>}/>
                <Route path="/mentor-mentee" element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <MentorMenteePage />
                    </React.Suspense>
                }/>
                <Route path="/make-up" element={<MakeUp/>}/>
                <Route path="/rereg" element={<ReRegistration/>}/>
                <Route path="/sem-reg" element={<SemesterCourse/>}/>
                <Route path="/bridgecourses" element={<BridgeCourse/>}/>
                <Route path="/openelective" element={<OpenElective/>}/>
                <Route path="/examinations" element={<ExaminationsPage/>}/>
                <Route path="/finance" element={<FinancePage/>}/>
                <Route path="/resources" element={<ResourcesPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/attendance" element={<AttendanceDetailed/>}/>

                <Route path="/grade" element={<GradePage/>}/>
                <Route path="/noc" element={<NOCRequestPage/>}/>
                <Route path="/assignment-submission" element={<AssignmentSubmission/>}/>


                <Route path="*" element={<Navigate to="/"/>}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;