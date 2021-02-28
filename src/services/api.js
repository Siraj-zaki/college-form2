
import { Path } from './Path'



const loginUser = async (email, pass) => {

    let getData = [];

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




















const getAllUsers = async (token) => {
    //console.log('runn')
    let getData = []; let err = '';

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    let req = new Request(Path.getAllUsers, { headers: myHeaders, method: 'GET' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    console.log('allusers->', getData)
    return getData

}
const addUser = async (token, user) => {
    //console.log('runn')
    let getData = []; let err = '';
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var formdata = new FormData();
    formdata.append("name", user.name);
    formdata.append("inCode", user.inCde);
    formdata.append("password", user.password);
    formdata.append("userName", user.userName);
    formdata.append("phone", user.phone);
    formdata.append("gender", user.gender);
    formdata.append("type", "user");
    formdata.append("avatar", user.avatar);
    formdata.append("isActive", "1");
    formdata.append("email", user.email);


    let req = new Request(Path.addUser, { method: 'POST', headers: myHeaders, body: formdata, })

    await fetch(req,)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    console.log('addUser->', getData)
    return getData

}

const deleteUser = async (token, uid) => {
    //console.log('runn')
    let getData = [];
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    let req = new Request(Path.deleteUser + uid, { method: 'DELETE', headers: myHeaders, })

    await fetch(req,)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    console.log('deleteUser->', getData)
    return getData

}




const getClass = async (token,) => {
    //console.log('runn')
    let getData = []; let err = '';
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    let req = new Request(Path.getClass, { method: 'GET', headers: myHeaders, })

    await fetch(req,)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    console.log('getClass->', getData)
    return getData

}
const getStudent = async (token,) => {
    //console.log('runn')
    let getData = []; let err = '';
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    let req = new Request(Path.getStudent, { method: 'GET', headers: myHeaders, })

    await fetch(req,)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    console.log('getStudent->', getData)
    return getData

}


const addClass = async (token, c) => {
    //console.log('runn')
    let getData = []; let err = '';
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var formdata = new FormData();
    formdata.append("className", c.className);
    formdata.append("noOfSemester", c.noOfSemester);
    formdata.append("fee", c.fee);
    formdata.append("dated", c.dated);

    let req = new Request(Path.addClass, { method: 'POST', headers: myHeaders, body: formdata, })

    await fetch(req,)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    console.log('addClass->', getData)
    return getData

}
const addStudent = async (token, student) => {
    //console.log('runn')
    let getData = [];  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var formdata = new FormData();
    formdata.append("firstName", student.firstName)
    formdata.append("lastName", student.lastName)
    formdata.append("dateoOfBirth", student.dateoOfBirth)
    formdata.append("placeOfbirth", student.placeOfbirth)
    formdata.append("contact", student.contact)
    formdata.append("bloodGroup", student.bloodGroup)
    formdata.append("studentCnic", student.studentCnic)
    formdata.append("phoneNo", student.phoneNo)
    formdata.append("gender", student.gender)
    formdata.append("email", student.email)
    formdata.append("mobileNo1", student.mobileNo1)
    formdata.append("fax", student.fax)
    formdata.append("fee", student.fee)
    formdata.append("fatherCnic", student.fatherCnic)
    formdata.append("fatherName", student.fatherName)
    formdata.append("motherName", student.motherName)
    formdata.append("address", student.address)
    formdata.append("description", student.description)
    formdata.append("classID", student.classID)
    formdata.append("avatar", student.avatar)
    formdata.append("rollNo", student.rollNo)

    let req = new Request(Path.addStudent, { method: 'POST', headers: myHeaders, body: formdata, })

    await fetch(req,)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    console.log('addStudent->', getData)
    return getData

}






export default {
    loginUser, registerUser, checkEmail, sendEmail, setNewPassword, editUser,

    getAllUsers, addUser, deleteUser,

    getClass, addClass,

    getStudent, addStudent,

}
