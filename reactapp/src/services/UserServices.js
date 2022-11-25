
import AuthHeader from "../auth/AuthHeader";
import { myAxios } from "../urls";

export const signup=(user)=>{
    return myAxios.post('/auth/signup', user).then((response)=>response.data)
}

export const login=(user)=>{
    return myAxios.post('/auth/login', user).then((response)=>response.data);
}

export const getInstitutes=()=>{
    return myAxios.get('/user/viewInstitutes', {headers : AuthHeader()}).then((response)=>response.data);
}

export const searchInstitute=(key)=>{
    return myAxios.get(`/user/institutes/${key}`, {headers : AuthHeader() }).then((response)=>response.data);
}

export const searchCourse=(key)=>{
    return myAxios.get(`/user/courses/${key}`, {headers : AuthHeader() }).then((response)=>response.data);
}

export const enrollCourse=(data)=>{
    return myAxios.put('/user/addAdmission', data, {headers : AuthHeader() }).then((response)=>response.data);
}

export const mycourses=(data)=>{
    return myAxios.post('/user/viewAdmission', data, {headers :  AuthHeader() }).then((response)=>response.data);
}

export const getCourses=()=>{
    return myAxios.get("/user/viewCourses", {headers :  AuthHeader() }).then(response=>response.data);
}

export const deleteAdmission=(enrollId)=>{
    return myAxios.delete(`user/deleteAdmission/${enrollId}`, {headers :  AuthHeader() }).then(response=>response.data);
}

export const editAdmission=(enrollId, data)=>{
    return myAxios.put(`user/editAdmission/${enrollId}`,data, {headers :  AuthHeader() }).then(response=>response.data);
}

export const recordFeedback=(data)=>{
    return myAxios.post('user/postFeedback', data,  {headers :  AuthHeader() }).then(response=>response.data);
}
