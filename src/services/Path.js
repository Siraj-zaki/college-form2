export const baseUrl = 'https://eightbottleserver.herokuapp.com/v1/'

export const Path = {
    login: baseUrl + 'login/user', 
    facebookLogin: baseUrl + 'fbLogin', 
    googleLogin: baseUrl + 'googleLogin', 
    registration: baseUrl + 'user',
    sendEmail: baseUrl + 'email/verification/',
    checkEmail: baseUrl + 'checkEmail/',
    setNewPassword: baseUrl + 'forgotPassword',

    getUser: baseUrl + 'user',
    getAllUser: baseUrl + 'user',
    editUser: baseUrl + 'user',
  
    sendFriendRequest:baseUrl+'addFriend_req',
    getFriendRequest:baseUrl+'getUserFriendRequests/',
    acceptRequest:baseUrl+'addFriend',
    deleteRequest:baseUrl+'deleteFreindRequest/',
    getFriend:baseUrl+'getUserFriends/',


}

