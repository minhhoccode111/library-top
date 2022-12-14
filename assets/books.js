"use strict";
console.log("hello world from books.js");

const formContainerEdit = document.querySelector(".edit-form-container");
const haveReadButtonEdit = document.querySelector(".switchOnEditing");
const addButtonEdit = document.querySelector(".addOnEditing");
const cancelButtonEdit = document.querySelector(".cancelOnEditing");
const titleInputEdit = document.querySelector(".titleOnEditing");
const authorInputEdit = document.querySelector(".authorOnEditing");
const totalInputEdit = document.querySelector(".total-pagesOnEditing");
const completedInputEdit = document.querySelector(".completed-pagesOnEditing");
const warnTextEdit = document.querySelector(".warnOnEditing");
const optionsDiv = document.querySelector(".options");
const editButton = document.querySelector(".button.green-bg.button-edit");
const removeButton = document.querySelector(".button-remove");

editButton.onclick = () => formContainerEdit.classList.remove("none");
cancelButtonEdit.onclick = () => formContainerEdit.classList.add("none");
