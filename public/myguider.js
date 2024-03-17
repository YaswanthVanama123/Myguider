
let section1 = document.getElementById('section1');
let section5 = document.getElementById('section5');

// Define the display1 function
function display1() {
    window.location.href = '/';
}

// Define the display2 function
function display2(){
    window.location.href = '/user/signin';
}

// Define the display5 function
function display5() {
    window.location.href = '/business/signup';
}

// Define the display3 function
function display3(){
    window.location.href = '/business/signin';
}

// Define the display4 function
function display4(){
    window.location.href = '/user/signup';
}


// Attach click event listener to elements triggering display1
let backButton = document.getElementById('backButton');
backButton.addEventListener('click', display1);















// user SignUp 


//section 4 User SignUp 
let userSignUpUserName = document.getElementById("userSignUpUserName");
let userSignUpPassword = document.getElementById("userSignUpPassword");
let userSignUpConfirmPassword = document.getElementById("userSignUpConfirmPassword");
let userCreateButton = document.getElementById("userCreateButton");
let invalidUserSignUp = document.getElementById("invalidUserSignUp");




let userSignUpopenEyePassword = document.getElementById("userSignUpopenEyePassword");
let userSignUpcloseEyePassword = document.getElementById("userSignUpcloseEyePassword");
let userSignUpopenEyeConfirmPassword = document.getElementById("userSignUpopenEyeConfirmPassword");
let userSignUpcloseEyeConfirmPassword = document.getElementById("userSignUpcloseEyeConfirmPassword");


let userSignUpPasswordToUser = document.getElementById("userSignUpPasswordToUser");
let userSignUpCoPasswordToUser = document.getElementById("userSignUpCoPasswordToUser");



let emailVerifiedStatus1 = false;



//email verification



let sendOtpButton = document.getElementById("sendOtpButton");
let userSignUpemailIcon = document.getElementById("userSignUpemailIcon");
let userSignUpCheckIcon = document.getElementById("userSignUpCheckIcon");
let userSignUpWrongCheckIcon = document.getElementById("userSignUpWrongCheckIcon");


function otpGenerator1() {
console.log("hi")
const email = document.getElementById('userSignUpUserName');
const otpverify1 = document.getElementsByClassName('otpverify1')[0];

// Generating random number as OTP;
let otp_val = Math.floor(Math.random() * 10000);

let emailbody = `
    <h1>My Guider user Sign Up</h1><br>
    <h2>Your OTP is </h2>${otp_val}
`;

Email.send({
    SecureToken: "75ff0a1b-f9e3-40f1-96b8-451f81ec6a84",
    To: email.value,
    From: "vanamayaswanth321@gmail.com",
    Subject: "This is for user SignUp email verification",
    Body: emailbody
}).then(
    message => {
        if (message === "OK") {
            alert("OTP sent to your email " + email.value);

            // now making otp input visible
            otpverify1.style.display = "block";
            const otp_inp1 = document.getElementById('otp_inp1');
            const otp_btn1 = document.getElementById('otp-btn1');

            otp_btn1.addEventListener('click', (event) => {
                event.preventDefault();
                const enteredOTP = parseInt(otp_inp1.value);
                if (enteredOTP === otp_val) {
                    alert("Email address verified...");
                    alert("Email address Verified");
                    userSignUpemailIcon.classList.add("d-none");
                    userSignUpCheckIcon.classList.remove("d-none");
                    userSignUpWrongCheckIcon.classList.add("d-none");
                    userSignUpCheckIcon.style.backgroundColor = "green";
                    otpverify1.style.display = "none";
                    emailVerifiedStatus1 = true;
                } else {
                    alert("Invalid OTP");
                    userSignUpemailIcon.classList.add("d-none");
                    userSignUpCheckIcon.classList.add("d-none");
                    userSignUpWrongCheckIcon.classList.remove("d-none");
                    userSignUpWrongCheckIcon.style.backgroundColor = "red";
                    otpverify1.style.display = "block";
                    emailVerifiedStatus1 = false;
                }
            });
        }
    }
);
}






sendOtpButton.addEventListener("click", otpGenerator1);





function uSignUpConfirmPasswordToText1() {
userSignUpopenEyeConfirmPassword.classList.toggle("d-none");
userSignUpcloseEyeConfirmPassword.classList.toggle("d-none");
if (userSignUpopenEyeConfirmPassword.classList.contains("d-none")) {
    userSignUpConfirmPassword.type = "text";
} else {
    userSignUpConfirmPassword.type = "password";
}
}

userSignUpCoPasswordToUser.addEventListener("click", uSignUpConfirmPasswordToText1);

function uSignUpPasswordToText() {
userSignUpopenEyePassword.classList.toggle("d-none");
userSignUpcloseEyePassword.classList.toggle("d-none");
if (userSignUpopenEyePassword.classList.contains("d-none")) {
    userSignUpPassword.type = "text";
} else {
    userSignUpPassword.type = "password";
}
}

userSignUpPasswordToUser.addEventListener("click", uSignUpPasswordToText);




// Attach event listener to the create button
userCreateButton.addEventListener("click", (event) => {
event.preventDefault(); // Prevent default form submission behavior
// Check if email is verified and password fields match
if (emailVerifiedStatus1 && userSignUpPassword.value === userSignUpConfirmPassword.value) {
    // Make AJAX request to backend to signup user
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/user/signup");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert("User signed up successfully!");
            } else if (xhr.status === 400) {
                alert("Email already exists.");
            } else {
                alert("Error signing up user. Please try again later.");
            }
        }
    };
    // Prepare data to send in request body
    const data = {
        email: userSignUpUserName.value,
        password: userSignUpPassword.value
    };
    // Send data as JSON string
    xhr.send(JSON.stringify(data));
} 
else if(emailVerifiedStatus1 === false){
    invalidUserSignUp.textContent = "Verify the email before Signup";   
}
else if(userSignUpPassword.value !== userSignUpConfirmPassword.value){
    invalidUserSignUp.textContent = "Password and confirm password must be same";
}
else {
    // If email is not verified or passwords don't match, show error message
    invalidUserSignUp.textContent = "Invalid email verification or passwords don't match.";
}
});


// user login section 2

let userLoginUserName = document.getElementById("userLoginUserName");
let userLoginPassword = document.getElementById("userLoginPassword");
let userLoginButton = document.getElementById("userLoginButton");
let userLoginEye = document.getElementById("userLoginEye");
let userLoginOpenEye = document.getElementById("userLoginOpenEye");
let userLoginCloseEye = document.getElementById("userLoginCloseEye");
let invalidUserLogin = document.getElementById("invalidUserLogin");
const loginForm = document.getElementById("loginForm");
        
                loginForm.addEventListener("submit", async (event) => {
                event.preventDefault(); // Prevent default form submission behavior
        
                const username = document.getElementById("userLoginUserName").value;
                const password = document.getElementById("userLoginPassword").value;
        
                try {
                    const response = await fetch("/user/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ username, password })
                    });
        
                    if (response.ok) {
                        alert("User logged in successfully!");
                        window.location.href = "/dashboard"; // Redirect to the dashboard page
                    } else if (response.status === 401) {
                        document.getElementById("invalidUserLogin").textContent = "Invalid username or password.";
                    } else {
                        throw new Error("Error logging in user.");
                    }
                } catch (error) {
                    console.error("Error logging in user:", error.message);
                    alert("Error logging in user. Please try again later.");
                }
            });
        
// toggle password to text changing function
        
        function userLoginPasswordToText() {
            userLoginOpenEye.classList.toggle("d-none");
            userLoginCloseEye.classList.toggle("d-none");
            if (userLoginOpenEye.classList.contains("d-none")) {
                userLoginPassword.type = "text";
        
            } else {
                userLoginPassword.type = "password";
            }
        }
        
        userLoginEye.addEventListener("click", userLoginPasswordToText);


// business signup 


let businessSignUpUsername = document.getElementById("businessSignUpUsername");
let businessSignUpPassword = document.getElementById("businessSignUpPassword");
let businessSignUpConfirmPassword = document.getElementById("businessSignUpConfirmPassword");
let businessCreateButton = document.getElementById("BusinessCreateAccount");
let invalidBusinessSignUp = document.getElementById("invalidBusinessSignUp");




let businessSignUpopenEyePassword = document.getElementById("businessSignUpopenEyePassword");
let businessSignUpcloseEyePassword = document.getElementById("businessSignUpcloseEyePassword");
let businessSignUpopenEyeConfirmPassword = document.getElementById("businessUpopenEyeConfirmPassword");
let businessSignUpcloseEyeConfirmPassword = document.getElementById("businessSignUpcloseEyeConfirmPassword");


let businessSignUpPasswordToUser = document.getElementById("businessSignUpPasswordToUser");
let businessSignUpCoPasswordToUser = document.getElementById("businessSignUpCoPasswordToUser");



let emailVerifiedStatus = false;



//email verification



let sendOtpButton1 = document.getElementById("sendOtpButton1");
let BusinessSignUpemailIcon = document.getElementById("BusinessSignUpemailIcon");
let businessSignUpCheckIcon = document.getElementById("businessSignUpCheckIcon");
let businessSignUpwrongCheckIcon = document.getElementById("businessSignUpwrongCheckIcon");


function otpGenerator() {
const email = document.getElementById('businessSignUpUsername');
const otpverify = document.getElementsByClassName('otpverify')[0];

// Generating random number as OTP;
let otp_val = Math.floor(Math.random() * 10000);

let emailbody = `
    <h1>My Guider business Sign Up</h1> <br>
    <h2>Your OTP is </h2>${otp_val}
`;

Email.send({
    SecureToken: "75ff0a1b-f9e3-40f1-96b8-451f81ec6a84",
    To: email.value,
    From: "vanamayaswanth321@gmail.com",
    Subject: "This is for business SignUp email verification",
    Body: emailbody
}).then(
    message => {
        if (message === "OK") {
            alert("OTP sent to your email " + email.value);

            // now making otp input visible
            otpverify.style.display = "block";
            const otp_inp = document.getElementById('otp_inp');
            const otp_btn = document.getElementById('otp-btn');

            otp_btn.addEventListener('click', (event) => {
                event.preventDefault();
                const enteredOTP = parseInt(otp_inp.value);
                if (enteredOTP === otp_val) {
                    alert("Email address verified...");
                    BusinessSignUpemailIcon.classList.add("d-none");
                    businessSignUpCheckIcon.classList.remove("d-none");
                    businessSignUpwrongCheckIcon.classList.add("d-none");
                    businessSignUpCheckIcon.style.backgroundColor = "green";
                    otpverify.style.display = "none";
                    emailVerifiedStatus = true;
                } else {
                    alert("Invalid OTP");
                    BusinessSignUpemailIcon.classList.add("d-none");
                    businessSignUpCheckIcon.classList.add("d-none");
                    businessSignUpwrongCheckIcon.classList.remove("d-none");
                    businessSignUpwrongCheckIcon.style.backgroundColor = "red";
                    otpverify.style.display = "block";
                    emailVerifiedStatus = false;
                }
            });
        }
    }
);
}






sendOtpButton1.addEventListener("click", otpGenerator);


function businessSignUpConfirmPasswordToText() {
businessSignUpopenEyeConfirmPassword.classList.toggle("d-none");
businessSignUpcloseEyeConfirmPassword.classList.toggle("d-none");
if (businessSignUpopenEyeConfirmPassword.classList.contains("d-none")) {
    businessSignUpConfirmPassword.type = "text";
} else {
    businessSignUpConfirmPassword.type = "password";
}
}

businessSignUpCoPasswordToUser.addEventListener("click", businessSignUpConfirmPasswordToText);

function businessSignUpPasswordToText() {
businessSignUpopenEyePassword.classList.toggle("d-none");
businessSignUpcloseEyePassword.classList.toggle("d-none");
if (businessSignUpopenEyePassword.classList.contains("d-none")) {
    businessSignUpPassword.type = "text";
} else {
    businessSignUpPassword.type = "password";
}
}

businessSignUpPasswordToUser.addEventListener("click", businessSignUpPasswordToText);

// Attach event listener to the create button
businessCreateButton.addEventListener("click", async (event) => {
event.preventDefault(); // Prevent default form submission behavior

// Check if email is verified and password fields match
if (emailVerifiedStatus && businessSignUpPassword.value === businessSignUpConfirmPassword.value) {
    try {
        // Make fetch request to backend to sign up user
        const response = await fetch("/business/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: businessSignUpUsername.value,
                password: businessSignUpPassword.value
            })
        });

        if (response.ok) {
            // Business signed up successfully
            alert("Business signed up successfully!");
            // Redirect business to login page or dashboard
            window.location.href = "/business/service";
        } else if (response.status === 400) {
            // Email already exists in database
            alert("Email already exists.");
        } else {
            // Error signing up business
            alert("Error signing up business. Please try again later.");
        }
    } catch (error) {
        console.error("Error signing up business:", error.message);
        alert("Error signing up business. Please try again later.");
    }
} else {
    // If email is not verified or passwords don't match, show error message
    invalidBusinessSignUp.textContent = "Invalid email verification or passwords don't match.";
}
});






// business login 


let businessLoginUserName = document.getElementById("businessLoginUserName");
let businessLoginPassword = document.getElementById("businessLoginPassword");
let businessLoginButton = document.getElementById("businessLoginButton");
let invalidBusiness = document.getElementById("invalidBusiness");

let businessLoginEyeOpen = document.getElementById("businessLoginEyeOpen");
let businessLoginEyeClose = document.getElementById("businessLoginEyeClose");

let businessLoginPasswordToUser = document.getElementById("businessLoginPasswordToUser");


function passwordToText() {
businessLoginEyeOpen.classList.toggle("d-none");
businessLoginEyeClose.classList.toggle("d-none");
if (businessLoginEyeClose.classList.contains('d-none')) {
    businessLoginPassword.type = "password";
} else {
    businessLoginPassword.type = "text";
}
}

businessLoginPasswordToUser.addEventListener("click", passwordToText);


businessLoginButton.addEventListener("click", async (event) => {
event.preventDefault(); // Prevent default form submission behavior

try {
    // Make fetch request to backend to log in business
    const response = await fetch("/business/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: businessLoginUserName.value,
            password: businessLoginPassword.value
        })
    });

    if (response.ok) {
        // Business login successful
        alert("Login successful!");
        // Redirect business to dashboard or desired page
        window.location.href = "/business/service";
    } else if (response.status === 401) {
        // Incorrect password
        invalidBusiness.textContent = "Incorrect password. Please enter the correct password.";
    } else if (response.status === 404) {
        // Username not found
        invalidBusiness.textContent = "No account found. Please sign up.";
    } else {
        // Error logging in business
        invalidBusiness.textContent = "Error logging in. Please try again later.";
    }
} catch (error) {
    console.error("Error logging in:", error.message);
    invalidBusiness.textContent = "Error logging in. Please try again later.";
}
});


// section 7 skilled workers 




let field1 = document.getElementById("field1");
let field2 = document.getElementById("field2");
let field3 = document.getElementById("field3");
let field4 = document.getElementById("field4");
let field5 = document.getElementById("field5");
let field6 = document.getElementById("field6");
let field7 = document.getElementById("citySearchSkilled1");
let field8 = document.getElementById("roadSearchInput");
let field9 = document.getElementById("field9");
let field10 = document.getElementById("searchInputOccupationReg");

     const formRegCityAll = document.getElementById("formRegCityAll");
     const nextBtn = document.getElementById("nextBtn");
     const backBtn = document.getElementById("backBtn");
     const allInput = formRegCityAll.querySelectorAll(".first input");
 
     nextBtn.addEventListener("click", (event) => {
         event.preventDefault();
         let allInputsFilled = true;
         allInput.forEach((input) => {
             if (input.value === "") {
                 allInputsFilled = false;
             }
         });
 
         if (allInputsFilled) {
             formRegCityAll.classList.add("secActive");
         } else {
             formRegCityAll.classList.remove("secActive");
         }
     });
 
     backBtn.addEventListener("click", (event) =>
         formRegCityAll.classList.remove("secActive")
     );


     // city search 

const citySearchSkilled1 = document.getElementById('citySearchSkilled1');
const citySuggestionsListSkilled1 = document.getElementById('citySuggestionsListSkilled1');

let currentPlaceSkilled1 = {};

function handleCitySuggestionClickSkilled1(place) {
 console.log('Selected City:', place);

 let citySkilled1 = place.address.city || place.address.name;

 citySearchSkilled1.value = citySkilled1;

 currentPlaceSkilled1 = {
     name: place.display_name,
     pincodeSkilled1: place.address.postcode
 };

 let areaSkilled1 = place.display_place;
 let streetSkilled1 = place.address.road;
 let pincodeSkilled1 = place.address.postcode;

 console.log(citySkilled1);
 console.log(areaSkilled1);
 console.log(streetSkilled1);
 console.log(pincodeSkilled1);

 citySuggestionsListSkilled1.innerHTML = '';
}

function debounceCitySkilled1(func, delay) {
 let timeoutIdSkilled1;
 return function() {
     clearTimeout(timeoutIdSkilled1);
     timeoutIdSkilled1 = setTimeout(func, delay);
 };
}

function handleCityInputSkilled1() {
 const searchTermSkilled1 = citySearchSkilled1.value.trim();
 if (searchTermSkilled1.length >= 2) {

     const apiUrl = `https://us1.locationiq.com/v1/autocomplete.php?key=pk.8bbe50a42004401570a4c08ad0e05f89&q=${searchTermSkilled1}`;

     fetch(apiUrl)
         .then(response => response.json())
         .then(data => {

             citySuggestionsListSkilled1.innerHTML = '';

             data.forEach(place => {
                 const li = document.createElement('li');
                 li.textContent = place.display_name;
                 li.addEventListener('click', () => handleCitySuggestionClickSkilled1(place));
                 citySuggestionsListSkilled1.appendChild(li);
             });

             citySuggestionsListSkilled1.style.display = 'block';
         })
         .catch(error => console.error('Error getting city suggestions:', error));
 } else {
     citySuggestionsListSkilled1.style.display = 'none';
 }
}

citySuggestionsListSkilled1.style.display = 'none';

citySearchSkilled1.addEventListener('input', debounceCitySkilled1(handleCityInputSkilled1, 300));

document.addEventListener('click', (event) => {
 if (event.target !== citySearchSkilled1 && event.target !== citySuggestionsListSkilled1) {
     citySuggestionsListSkilled1.style.display = 'none';
 }
});

// Road search

const roadSearchInput = document.getElementById('roadSearchInput');
const roadSearchSuggestionsList = document.getElementById('roadSearchSuggestions');

let currentPlaceSkilled11 = {};

function handleRoadSuggestionClick(place) {
 console.log('Selected Road:', place);

 let areaSkilled1 = place.display_place;

 roadSearchInput.value = areaSkilled1;

 currentPlaceSkilled11 = {
     name: place.display_name,
     pincodeSkilled1: place.address.postcode
 };

 let city = place.address.city || place.address.name;
 let streetSkilled1 = place.address.road;
 let pincodeSkilled1 = place.address.postcode;

 console.log(city);
 console.log(areaSkilled1);
 console.log(streetSkilled1);
 console.log(pincodeSkilled1);

 roadSearchSuggestionsList.innerHTML = '';
}

function debounceRoad(func, delay) {
 let timeoutIdSkilled1;
 return function() {
     clearTimeout(timeoutIdSkilled1);
     timeoutIdSkilled1 = setTimeout(func, delay);
 };
}

function handleRoadInput() {
 const searchTermSkilled1 = roadSearchInput.value.trim();
 if (searchTermSkilled1.length >= 2) {

     const apiUrl = `https://us1.locationiq.com/v1/autocomplete.php?key=pk.8bbe50a42004401570a4c08ad0e05f89&q=${searchTermSkilled1}`;

     fetch(apiUrl)
         .then(response => response.json())
         .then(data => {

             roadSearchSuggestionsList.innerHTML = '';

             data.forEach(place => {
                 const li = document.createElement('li');
                 li.textContent = place.display_name;
                 li.addEventListener('click', () => handleRoadSuggestionClick(place));
                 roadSearchSuggestionsList.appendChild(li);
             });

             roadSearchSuggestionsList.style.display = 'block';
         })
         .catch(error => console.error('Error getting road suggestions:', error));
 } else {
     roadSearchSuggestionsList.style.display = 'none';
 }
}

roadSearchSuggestionsList.style.display = 'none';

roadSearchInput.addEventListener('input', debounceRoad(handleRoadInput, 300));

document.addEventListener('click', (event) => {
 if (event.target !== roadSearchInput && event.target !== roadSearchSuggestionsList) {
     roadSearchSuggestionsList.style.display = 'none';
 }
});







//occupation search

const arrayOccupationReg = ["electrician", "plumber", "bike mechanic", "car mechanic", "painter", "ac mechanic", "bike and car mechanic", "driver", "welder", "auto mechanic", "daily-wage-worker", "carpenter", "saloon", "bathroom cleaning", "house cleaning", "motor repairing", "TV reparing", "Inverter reparing", "washing machine reparing", "laptop reparing", "phone reparing", "clock reparing", "tailor", "tiler", "beautician", 'cheff'];
const searchInputOccupationReg = document.getElementById("searchInputOccupationReg");
const suggestionsContainerOccupationReg = document.getElementById("suggestionsContainerOccupationReg");

document.addEventListener('click', function(event) {
 const clickedSuggestion = event.target.closest('.suggestion-itemOccupationReg');
 if (clickedSuggestion) {
     searchInputOccupationReg.value = clickedSuggestion.textContent;
     suggestionsContainerOccupationReg.style.display = 'none';
 } else if (!event.target.closest('#searchInputOccupationReg') && !event.target.closest('#suggestionsContainerOccupationReg')) {
     suggestionsContainerOccupationReg.style.display = 'none';
 }
});

function handleOccupationSuggestionClick(suggestion) {
 searchInputOccupationReg.value = suggestion;
 suggestionsContainerOccupationReg.style.display = 'none';
}

function updateOccupationSuggestions(filteredSuggestions) {
 if (filteredSuggestions.length > 0) {
     const suggestionList = filteredSuggestions.map(suggestion => `<div class="suggestion-itemOccupationReg" onclick="handleOccupationSuggestionClick('${suggestion}')">${suggestion}</div>`).join('');
     suggestionsContainerOccupationReg.innerHTML = suggestionList;
     suggestionsContainerOccupationReg.style.display = 'block';
 } else {
     suggestionsContainerOccupationReg.style.display = 'none';
 }
}

function showSuggestionsOccupationReg() {
 const inputValue = searchInputOccupationReg.value.toLowerCase();
 const filteredSuggestions = arrayOccupationReg.filter(suggestion => suggestion.toLowerCase().includes(inputValue));
 updateOccupationSuggestions(filteredSuggestions);
}



document.getElementById('submitBtn').addEventListener('click', async (event) => {
 event.preventDefault(); // Prevent default form submission behavior
 
 // Retrieve form data
 const email = document.getElementById("field1").value;
 const name = document.getElementById("field2").value;
 const age = document.getElementById("field3").value;
 const gender = document.getElementById("field4").value;
 const phonenumber = document.getElementById("field5").value;
 const state = document.getElementById("field6").value;
 const city = document.getElementById("citySearchSkilled1").value;
 const area = document.getElementById("roadSearchInput").value;
 const pincode = document.getElementById("field9").value;
 const occupation = document.getElementById("searchInputOccupationReg").value;

 try {
     const response = await fetch('http://localhost:4000/business/skilledworkers/registration', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             email,
             name,
             age,
             gender,
             phonenumber,
             state,
             city,
             area,
             pincode,
             occupation
         })
     });

     if (response.ok) {
         // Data sent successfully
         alert('Skilled worker registered successfully!');
         // Redirect or perform any other action as needed
     } else {
         // Error handling
         alert('Error registering skilled worker. Please try again later.');
     }
 } catch (error) {
     console.error('Error registering skilled worker:', error.message);
     alert('Error registering skilled worker. Please try again later.');
 }
});



let buttonPartTimeHelpPara = document.getElementById("buttonPartTimeHelpPara");
buttonPartTimeHelpPara.textContent = "hi";

let buttonSkillHelpPara = document.getElementById("buttonSkillHelpPara");


buttonSkillHelpPara.textContent = "Its working Priya";


