import { postUsers, getUsers, deleteUser, updateUsers } from "./services/Q&Aservices.js";

const adminTable = document.getElementById("adminTable")

showAdminQA ()
async function showAdminQA() {

    let getAdminQA = await getUsers("questions")

    let thQA = document.createElement("th")
    let thName = document.createElement("th")
    let thDate = document.createElement("th")
    let thHour = document.createElement("th")

    thQA.textContent = "Questions"
    thName.textContent = "Student"
    thDate.textContent = "Date"
    thHour.textContent = "Hour"

    adminTable.appendChild(thQA)
    adminTable.appendChild(thName)
    adminTable.appendChild(thDate)
    adminTable.appendChild(thHour)

    getAdminQA.forEach( question => {

        let trQA = document.createElement("tr")
        let tdQuestion = document.createElement("td")
        let tdName = document.createElement("td")
        let tdDate = document.createElement("td")
        let tdHour = document.createElement("td")
    
        trQA.classList.add("trQA");
        tdQuestion.classList.add("tdQuestion");
        tdName.classList.add("tdName");
        tdDate.classList.add("tdDate");
        tdHour.classList.add("tdHour");

        let date = new Date()
    
        tdQuestion.textContent = question.questions
        tdName.textContent = question.Username
        tdDate.textContent = date.getDate()+ "/" +date.getMonth()+ "/" +date.getFullYear()
        tdHour.textContent = new Date().toLocaleTimeString()
    
        trQA.appendChild(tdQuestion);
        trQA.appendChild(tdName);
        trQA.appendChild(tdDate);
        trQA.appendChild(tdHour);
        
        adminTable.appendChild(trQA)    
        });
    
}