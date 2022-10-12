import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { SignUp, Login, VerifyNotice, ForgotPasswordSL, ForgotPasswordCM, ForgotPasswordUP, NotFound, Userprofile, Dashboard, Landing, AdminDashboard } from '../pages';


const BaseRoute = () => {
    return (
        <Routes>
            {/*Public routes*/}
            <Route path="/forgotPassword" element={<ForgotPasswordSL/>} />
            <Route path="/forgotPassword/resend" element={<ForgotPasswordCM/>} />
            <Route path="/forgotPassword/update/:id" element={<ForgotPasswordUP/>} />
            <Route path="/" element={<Landing/>} />
            <Route path="/register" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/verify-notice/:id" element={<VerifyNotice/>} />
            
            {/*Protected Routes*/}
            <Route element={<ProtectedRoute/>}>
                <Route path="/userprofile/:id" element={<Userprofile/>} />
                <Route path='/admin/dashboard' element={<AdminDashboard/>} />
                <Route path="/dashboard/:id" element={<Dashboard/>} />
            </Route>

            {/*Catch Errors*/}
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
};

export default BaseRoute;