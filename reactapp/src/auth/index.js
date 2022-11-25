
//isLoggedIN
export const isLoggedIn=()=>{
    let token = localStorage.getItem("userToken");
    if(token === null){
        return false;
    }
    return true;
};
//doLogin=> set to localStorage
export const doLogin=(data, next)=>{
    localStorage.setItem("userToken",JSON.stringify(data));
    next();
};

//doLogout
export const doLogout=(next)=>{
    localStorage.removeItem("userToken");
    next();
};

//get CurrentUser details
export const getCurrentUserDetails=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("userToken")).user;
    }
    return undefined;
};

// get token
export const getToken=()=>{
    if(isLoggedIn()){
        const tok = JSON.parse(localStorage.getItem("userToken")).token;
        return tok;
    }
    return null;
}