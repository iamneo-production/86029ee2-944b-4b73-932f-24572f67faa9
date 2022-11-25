import { myAxios } from "../urls";
import AuthHeader from "../auth/AuthHeader";

export const deleteInstitute=(instituteId)=>{
    return myAxios.delete(`/admin/deleteInstitute/${instituteId}`, {headers: AuthHeader()}).then(response=>response.data);
}

export const addInstitute=(data)=>{
    return myAxios.post('/admin/addInstitute', data, {headers :  AuthHeader()}).then((response)=>response.data);
}

export const editInstitute=(instituteId, data)=>{
    return myAxios.put(`/admin/editInstitute/${instituteId}`, data, {headers :  AuthHeader()}).then(response=>response.data);
}


export const deleteCourse=(courseId)=>{
    return myAxios.delete(`/admin/deleteCourse/${courseId}`, {headers : AuthHeader()}).then(response=>response.data);
}

export const addCourse=(course)=>{
    return myAxios.post(`/admin/addCourse`, course, {headers : AuthHeader()}).then(response=>response.data);
}

export const editCourse=(courseId, data)=>{
    return myAxios.put(`/admin/editCourse/${courseId}`, data, {headers : AuthHeader()}).then(response=>response.data);
}

export const getStudents=()=>{
    return myAxios.get('/admin/viewStudents', {headers : AuthHeader()}).then(response=>response.data);
}

export const addStudent=(data)=>{
    return myAxios.post('admin/addStudent', data, {headers : AuthHeader()}).then(response=>response.data);

}

export const deleteStudent=(studentId)=>{
    return myAxios.delete(`/admin/deleteStudent/${studentId}`, {headers :  AuthHeader()}).then(response=>response.data);
}

export const editStudent=(studentId, data)=>{
    return myAxios.put(`/admin/editStudent/${studentId}`, data, {headers :  AuthHeader()}).then(response=>response.data);
}

export const searchStudent=(key)=>{
    return myAxios.get(`/admin/students/${key}`, {headers :  AuthHeader()}).then((response)=>response.data);
}

export const getApplications=()=>{
    return myAxios.get("/admin/viewApplications", {headers : AuthHeader()}).then((response)=>response.data);
}
