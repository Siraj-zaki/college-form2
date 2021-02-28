
import { Path } from './Path'


const loginUser = async (email, pass) => {

    let getData = []; let err = '';

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', pass);

    let req = new Request(Path.login, { body: formData, method: 'POST' })


    await fetch(req)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert("Login", err.message); getData = false })

    if (getData?.success === 'false' || getData?.message === 'Auth failed') {
        alert("Login", getData.message); getData = false
    }

    return getData

}
const socialLogin = async (socialID, type) => {

    let getData = [];
    let path;

    let formData = new FormData();

    if (type === 'facebook') {
        formData.append('fbID', socialID);
        path = Path.facebookLogin
    }
    else {
        formData.append('GID', socialID);
        path = Path.googleLogin
    }

    let req = new Request(path, { body: formData, method: 'POST' })


    await fetch(req)
        .then(res => res.json())
        .then(dat => { getData = dat })
        .catch(err => { alert("Login", err.message); getData = false })

    if (getData?.success === 'false' || getData?.message === 'Auth failed') {
        alert("Login", getData.message + ' Try another options.'); getData = false
    }

    return getData

}
const registerUser = async (user) => {
    let err = ''; let getData = []

    var formdata = new FormData();
    formdata.append("avatar", user.avatar);
    formdata.append("name", user.name);
    formdata.append("email", user.email);
    formdata.append("password", user.password);
    formdata.append("gender", "Choose gender");
    formdata.append("dob", "Choose year");
    formdata.append("height", "Choose height");
    formdata.append("weight", "Choose weight");
    formdata.append("unit", "US");
    formdata.append("notification", true);
    formdata.append("type", "user");
    formdata.append("loggedType", user.loggedType);

    if (user.loggedType === 'facebook') {
        formdata.append("fbID", user.password);
        formdata.append("GID", "");
    }
    else if (user.loggedType === 'google') {
        formdata.append("GID", user.password);
        formdata.append("fbID", "");
    }
    else {
        formdata.append("GID", '');
        formdata.append("fbID", '');
    }


    var req = { method: 'POST', body: formdata, };

    await fetch(Path.registration, req)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert("Register", err.message); getData = false })

    if (getData?.success === 'false') {
        alert("Register", getData.message); getData = false
    }

    return getData


}

const checkEmail = async (email) => {
    //console.log('runn')
    let getData = []; let err = '';

    let req = new Request(Path.checkEmail + email)

    await fetch(req)
        .then(res => res.json())
        .then(res => getData = res)
        .catch(err => err = err)

    if (err === '') { return getData }
    else { return err }

}
const sendEmail = async (email, num) => {
    //console.log('runn')
    let getData = []; let err = '';

    let req = new Request(Path.sendEmail + email + '/' + num)

    await fetch(req)
        .then(res => res.json())
        .then(res => getData = res)
        .catch(err => err = err)

    if (err === '') { return getData }
    else { return { message: error } }

}

const setNewPassword = async (email, pass) => {
    //console.log('runn')
    let getData = []; let err = '';

    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", pass);

    let req = new Request(Path.setNewPassword, { body: formdata, method: 'POST' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert("New Password", err.message); getData = false })

    if (getData?.success === 'false') {
        alert("New Password", getData.message); getData = false
    }
    return getData

}

const editUser = async (user) => {
    //console.log('runn')
    let getData = []; let err = '';
    // let h = new Headers();
    // h.append('Authorization', token)
    var formdata = new FormData();
    formdata.append("userId", user.userId);
    formdata.append("clientId", user.clientId);
    formdata.append("avatar", user.avatar);
    formdata.append("name", user.name);
    formdata.append("email", user.email);
    formdata.append("password", user.password);
    formdata.append("gender", user.gender);
    formdata.append("dob", user.dob);
    formdata.append("height", user.height);
    formdata.append("weight", user.weight);
    formdata.append("unit", user.unit);
    formdata.append("notification", user.notification);
    formdata.append("type", "user");
    formdata.append("loggedType", user.loggedType);
    formdata.append("fbID", user.fbID);
    formdata.append("GID", user.GID);
    let req = new Request(Path.editUser + '/' + user.userId, { body: formdata, method: 'put' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; console.log(dat) })
        .catch(err => { alert("User", err.message); getData = false })

    console.log('edit->', getData)
    if (getData?.success === 'false') {
        alert("User", getData.message); getData = false
    }

    return getData
}


const addFriend = async (token, senderID, receiverID) => {
    //console.log('runn')
    let getData = []; let err = '';
    let h = new Headers();
    h.append('Authorization', token)
    var formdata = new FormData();
    formdata.append("recieverID", receiverID);
    formdata.append("senderID", senderID);

    let req = new Request(Path.sendFriendRequest, { headers: h, body: formdata, method: 'post' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert("Friend", err.message); getData = false })

    console.log('add friend->', getData)
    if (getData?.success === 'false') {
        alert("Friend", getData.message); getData = false
    }

    return getData
}
const getFriendRequest = async (token, uid) => {
    //console.log('runn')
    let getData = []; let err = '';
    let h = new Headers();
    h.append('Authorization', token)
    let req = new Request(Path.getFriendRequest + uid, { headers: h, method: 'get' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert("Friend", err.message); getData = false })

    if (getData?.success === 'false') {
        alert("Friend", getData.message); getData = false
    }
    console.log('request:' + getData.result.length)
    return getData
}
const getFriends = async (token, uid) => {
    //console.log('runn')
    let getData = []; let err = '';
    let h = new Headers();
    h.append('Authorization', token)
    let req = new Request(Path.getFriend + uid, { headers: h, method: 'GET' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert("Friend", err.message); getData = false })

    // console.log(Platform.Version + ' get friend->', getData)
    if (getData?.success === 'false') {
        alert("Friend", getData.message); getData = false
    }

    return getData
}
const acceptRequest = async (token, uid, rid) => {
    //console.log('runn')
    let getData = []; let err = '';
    let h = new Headers();
    h.append('Authorization', token)
    var formdata = new FormData();
    formdata.append("userID", uid);
    formdata.append("friendID", rid);

    let req = new Request(Path.acceptRequest, { headers: h, body: formdata, method: 'POST' })
    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert("Friend", err.message); getData = false })

    console.log(Platform.Version + ' accept friend->', getData)
    if (getData?.success === 'false') {
        alert("Friend", getData.message); getData = false
    }

    return getData
}
const deleteFriendRequest = async (token, rid) => {
    //console.log('runn')
    let getData = []; let err = '';
    let h = new Headers();
    h.append('Authorization', token)
    let req = new Request(Path.deleteRequest + rid, { headers: h, method: 'delete' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert("Friend", err.message); getData = false })

    console.log(Platform.Version + ' delete friend->', getData)
    if (getData?.success === 'false') {
        alert("Friend", getData.message); getData = false
    }

    return getData
}





export default {
    loginUser, socialLogin, registerUser, checkEmail, sendEmail, setNewPassword, editUser,

    getFriends, addFriend, acceptRequest, getFriendRequest, deleteFriendRequest,

}
