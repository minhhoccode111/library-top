"use strict";

const formCtn = document.querySelector(".form-container");
const formWrapper = document.querySelector(".form-wrapper");
const plusBtn = document.querySelector(".plus-button");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const totalInput = document.querySelector(".total-pages");
const completedInput = document.querySelector(".completed-pages");
const cancelBtn = document.querySelector(".cancel");
const addBtn = document.querySelector(".add");
const haveReadBtn = document.querySelector(".switch");

plusBtn.onclick = () => formCtn.classList.remove("none");
cancelBtn.onclick = () => formCtn.classList.add("none");
formCtn.onclick = () => formCtn.classList.add("none"); // return when we clicked outside the popup form
formWrapper.onclick = (e) => e.stopPropagation(); //stopPropagation so that the formCtn don't receive click event when we click formwrapper
haveReadBtn.onclick = () => (completedInput.value = totalInput.value);
addBtn.onclick = (e) => e.preventDefault();
