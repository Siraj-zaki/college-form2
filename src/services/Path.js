export const baseUrl = 'https://collegearif.herokuapp.com/v1/'

export const Path = {
    
    login: baseUrl + 'login/user',

    facebookLogin: baseUrl + 'fbLogin',
    googleLogin: baseUrl + 'googleLogin',
    registration: baseUrl + 'user',
    sendEmail: baseUrl + 'email/verification/',
    checkEmail: baseUrl + 'checkEmail/',
    setNewPassword: baseUrl + 'forgotPassword',


    //app
    getAllUsers: baseUrl + 'user',
    getClass: baseUrl + 'class',
    getStudent: baseUrl + 'student',
    
    addUser: baseUrl + 'user',
    addClass: baseUrl + 'class',
    addStudent: baseUrl + 'student',
    
    deleteUser: baseUrl + 'user/',


}

