const userList=JSON.parse(localStorage.getItem("users")) || [];
const signUpForm=document.querySelector('.signup_form');
const loginForm=document.querySelector('.login_form');
showLogin();

function showSignUp(){
    loginForm.style.display="none";
    signUpForm.style.display="block";
}
function showLogin(){
    signUpForm.style.display="none";
    loginForm.style.display="block";
}

userList.forEach(user => {
    if (user.balance === undefined) {
        user.balance = 0;
    }
    if (!user.expenses) {
        user.expenses = [];
    }
});


localStorage.setItem("users", JSON.stringify(userList));


//SIGNUP

const signUpButton=document.querySelector("#signup_button");
const signUpName=document.querySelector("#set_user_name");
const signUpPassword=document.querySelector("#set_user_password");
signUpButton.addEventListener("click",function(event){
    event.preventDefault();
    const setUsername=signUpName.value.trim();
    const setPassword=signUpPassword.value;
    const confirmPassword=document.querySelector("#confirm_user_password").value;
    if(!setUsername||!setPassword||!confirmPassword){
        alert("Please fill out all the fields");
        return;
    }
    if (setPassword.length !== 4 || isNaN(setPassword)) {
        alert("Password must be a 4-digit number.");
        return;
    }
    if(setPassword!=confirmPassword){
        alert("Passwords do not match!");
        return;
    }
    if(userList.some(u => u.username == setUsername)){
        alert("Username already exists, try something different!");
        return;
    }
    userList.push({
        username:setUsername,
        password:setPassword,
        balance:0,
        expenses:[],
    })
    
    localStorage.setItem("users",JSON.stringify(userList));
    alert("Account created! You can login now");
    document.querySelector("#confirm_user_password").value = "";
    showLogin();
    signUpForm.reset();


});

//LOGIN
const loginButton=document.querySelector("#login_button");
loginButton.addEventListener("click",function(event){
    event.preventDefault();
    const loginName=document.querySelector("#user_name").value.trim();
    const loginPassword=document.querySelector("#user_password").value;
    if(!loginName || !loginPassword){
        alert("Please fill all the fields");
        return;
    }
    let user=userList.find(u => u.username===loginName && u.password===loginPassword );
    if(user){
        localStorage.setItem("currentUser",loginName);
        loginForm.reset();
        window.location.href="index.html";
        
    }
    else{
        alert("Invalid username or password!");
        loginForm.reset();
    }
})


