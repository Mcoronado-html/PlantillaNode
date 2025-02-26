import { postUsers, getUsers, deleteUser, updateUsers } from "./services/Q&Aservices.js";

const enterQA = document.getElementById("enterQA")
const inputQA = document.getElementById("inputQA")
const tableQA = document.getElementById("tableQA")

showQuestions()

enterQA.addEventListener("click", async function() {
    let questions = {
        "questions" : inputQA.value, 
        "Username" : localStorage.getItem("userName")
    }
    if (questions) {
            Swal.fire({
                title: 'Success!',
                text: 'Question submitted',
                icon: 'success',
                confirmButtonText: 'OK'
            })
    }
    await postUsers ( questions, "questions")
    showQuestions()    
})

async function showQuestions() {
    let getQA = await getUsers ("questions") 
    tableQA.innerHTML = ""
    getQA.forEach( question => {
    
    let thQA = document.createElement("th")
    let thName = document.createElement("th")
    let thDate = document.createElement("th")
    let thHour = document.createElement("th")

    thQA.textContent = "Questions"
    thName.textContent = "Name"
    thDate.textContent = "Date"
    thHour.textContent = "Hour"

    tableQA.appendChild(thQA)
    

    let trQA = document.createElement("tr")
    let tdQuestion = document.createElement("td")
    let tdName = document.createElement("td")
    let tdHour = document.createElement("td")

    trQA.setAttribute("class", "trQA")
    tdQuestion.setAttribute("class", "tdHourtdQuestion")
    tdName.setAttribute("class", "tdName")
    tdHour.setAttribute("class", "tdHour")

    tdQuestion.textContent = question.questions
    tdName.textContent = question.Username
    tdHour.textContent = new Date().toLocaleTimeString()

    trQA.appendChild(tdQuestion);
    trQA.appendChild(tdName);
    trQA.appendChild(tdHour);
    
    tableQA.appendChild(trQA)    
    });


}