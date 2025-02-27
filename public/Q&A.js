import { postUsers, getUsers, deleteUser, updateUsers } from "./services/Q&Aservices.js";

const enterQA = document.getElementById("enterQA")
const inputQA = document.getElementById("inputQA")
const tableQA = document.getElementById("tableQA")
let date = new Date()

showQuestions()
enterQA.addEventListener("click", async function() {

    if (inputQA.value!="") {
        
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
    }else{
        Swal.fire({
            title: 'Denied!',
            text: 'Please sent a valid question',
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    }
})
async function showQuestions() {
    let getQA = await getUsers ("questions") 
    tableQA.innerHTML = ""

    let thQA = document.createElement("th")
    let thName = document.createElement("th")
    let thDate = document.createElement("th")
    let thHour = document.createElement("th")

    thQA.textContent = "Questions"
    thName.textContent = "Name"
    thDate.textContent = "Date"
    thHour.textContent = "Hour"

    tableQA.appendChild(thQA)
    tableQA.appendChild(thName)
    tableQA.appendChild(thDate)
    tableQA.appendChild(thHour)

    getQA.forEach( question => {

    let trQA = document.createElement("tr")
    let tdQuestion = document.createElement("td")
    let tdName = document.createElement("td")
    let tdDate = document.createElement("td")
    let tdHour = document.createElement("td")

    trQA.setAttribute("class", "trQA")
    tdQuestion.setAttribute("class", "tdQuestion")
    tdName.setAttribute("class", "tdName")
    tdDate.setAttribute("class", "tdDate")
    tdHour.setAttribute("class", "tdHour")

    tdQuestion.textContent = question.questions
    tdName.textContent = question.Username
    tdDate.textContent = date.getDate()+ "/" +date.getMonth()+ "/" +date.getFullYear()
    tdHour.textContent = new Date().toLocaleTimeString()

    trQA.appendChild(tdQuestion);
    trQA.appendChild(tdName);
    trQA.appendChild(tdDate);
    trQA.appendChild(tdHour);
    
    tableQA.appendChild(trQA)    
    });
}