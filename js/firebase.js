// ========================================
// IMPORT FIREBASE
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ========================================
// FIREBASE CONFIG
// ========================================

const firebaseConfig = {

    apiKey: "AIzaSyBGA2EWzfYDmpf1LjI97a5sIexe0lOkxgs",

    authDomain: "shalenammapride-fb590.firebaseapp.com",

    projectId: "shalenammapride-fb590",

    storageBucket: "shalenammapride-fb590.firebasestorage.app",

    messagingSenderId: "511780175950",

    appId: "1:511780175950:web:fa3d09184cbf6cb8f5831f",

    measurementId: "G-6VN8H9FZLL"

};


// ========================================
// INITIALIZE FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);


// ========================================
// INITIALIZE FIRESTORE
// ========================================

const db = getFirestore(app);

console.log("Firestore Connected ✅");


// ========================================
// REGISTER USER FUNCTION
// ========================================

window.registerUser = async function () {

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    const passwordMessage =
    document.getElementById("passwordMessage");


    passwordMessage.innerHTML = "";


    // EMPTY CHECK

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill all fields ❌");

        return;

    }


    // PASSWORD LENGTH CHECK

    if (password.length < 8) {

        passwordMessage.innerHTML =
        "Password must contain minimum 8 characters ❌";

        return;

    }


    // PASSWORD MATCH CHECK

    if (password !== confirmPassword) {

        passwordMessage.innerHTML =
        "Passwords do not match ❌";

        return;

    }


    try {

        // SAVE USER DATA

        await addDoc(collection(db, "users"), {

            name: name,
            email: email,
            password: password

        });

        alert("User Registered Successfully ✅");

        console.log("User Data Saved");


        // CLEAR INPUTS

        document.getElementById("name").value = "";

        document.getElementById("email").value = "";

        document.getElementById("password").value = "";

        document.getElementById("confirmPassword").value = "";

        passwordMessage.innerHTML = "";


        // REDIRECT TO DASHBOARD

        window.location.href = "index.html";

    }

    catch (error) {

        console.log(error);

        alert("Registration Failed ❌");

    }

};


// ========================================
// LOGIN USER FUNCTION
// ========================================

window.loginUser = async function () {

    const email =
    document.getElementById("loginEmail").value;

    const password =
    document.getElementById("loginPassword").value;


    try {

        const querySnapshot =
        await getDocs(collection(db, "users"));

        let userFound = false;


        querySnapshot.forEach((doc) => {

            const userData = doc.data();

            if (
                userData.email === email &&
                userData.password === password
            ) {

                userFound = true;

            }

        });


        if (userFound) {

            alert("Login Successful ✅");

            console.log("User Logged In");

            // REDIRECT TO DASHBOARD

            window.location.href = "index.html";

        }

        else {

            alert("Invalid Email or Password ❌");

        }

    }

    catch (error) {

        console.log(error);

        alert("Login Failed ❌");

    }

};


// ========================================
// FEEDBACK FUNCTION
// ========================================

window.submitFeedback = function () {

    const name =
    document.getElementById("feedbackName").value;

    const email =
    document.getElementById("feedbackEmail").value;

    const message =
    document.getElementById("feedbackMessage").value;


    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        alert("Please fill all fields ❌");

        return;

    }


    alert("Feedback Submitted Successfully ✅");


    // CLEAR FORM

    document.getElementById("feedbackName").value = "";

    document.getElementById("feedbackEmail").value = "";

    document.getElementById("feedbackMessage").value = "";

};