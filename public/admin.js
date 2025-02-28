import { postUsers, getUsers, deleteUser, updateUsers } from "./services/Q&Aservices.js";

const adminTable = document.getElementById("adminTable")

showAdminQA ()
async function showAdminQA() {
    adminTable.innerHTML = ""
    let getAdminQA = await getUsers("questions")

    let thAdminCon = document.createElement("th")
    let thQA = document.createElement("th")
    let thName = document.createElement("th")
    let thDate = document.createElement("th")
    let thHour = document.createElement("th")
    let thAnswer = document.createElement("th")


    thAdminCon.textContent = "Admin Console"
    thQA.textContent = "Question"
    thName.textContent = "Student"
    thDate.textContent = "Date"
    thHour.textContent = "Hour"
    thAnswer.textContent = "Answer"


    adminTable.appendChild(thAdminCon)
    adminTable.appendChild(thQA)
    adminTable.appendChild(thName)
    adminTable.appendChild(thDate)
    adminTable.appendChild(thHour)
    adminTable.appendChild(thAnswer)

    let showAnswer = await getUsers("replies")

    getAdminQA.forEach( question => {

        let trQA = document.createElement("tr")
        
        let AdminEdit = document.createElement("button")
        let AdminDelete = document.createElement("button")
        let AdminReply = document.createElement("button")
        let tdQuestion = document.createElement("td")
        let tdName = document.createElement("td")
        let tdDate = document.createElement("td")
        let tdHour = document.createElement("td")
        
        trQA.classList.add("trQA");
        AdminEdit.classList.add("adminBtns");
        AdminDelete.classList.add("adminBtns");
        AdminReply.classList.add("adminBtns");
        tdQuestion.classList.add("tdQuestion");
        tdName.classList.add("tdName");
        tdDate.classList.add("tdDate");
        tdHour.classList.add("tdHour");


        let date = new Date()
    
        AdminEdit.textContent = "Edit"
        AdminDelete.textContent = "Delete"
        AdminReply.textContent = "Reply"
        tdQuestion.textContent = question.questions
        tdName.textContent = question.Username
        tdDate.textContent = date.getDate()+ "/" +date.getMonth()+ "/" +date.getFullYear()
        tdHour.textContent = new Date().toLocaleTimeString()
    
        trQA.appendChild(AdminEdit);
        trQA.appendChild(AdminDelete);
        trQA.appendChild(AdminReply);
        trQA.appendChild(tdQuestion);
        trQA.appendChild(tdName);
        trQA.appendChild(tdDate);
        trQA.appendChild(tdHour);

        showAnswer.forEach((answer)=>{
            let tdAnswer = document.createElement("td")
            tdAnswer.classList.add("tdAnswer");
            trQA.appendChild(tdAnswer);
            tdAnswer.textContent = answer.reply
            
        })

        adminTable.appendChild(trQA)    

        AdminEdit.addEventListener("click", async function () {
                const { value: text } = await Swal.fire({
                input: "textarea",
                inputLabel: "Edit question",
                inputValue: question.questions,
                inputPlaceholder: "Type your message here...",
                showCancelButton: true,
              });

              if (text) {
                await updateUsers({"questions":text},"questions" ,question.id);
                Swal.fire("Updated successfully!", "", "success");
                showAdminQA()
                
              }
        })

        AdminDelete.addEventListener("click", async function () {
                deleteUser("questions", question.id)
                await showAdminQA ()
        })
        AdminReply.addEventListener("click", async function () {
            const { value: text } = await Swal.fire({
                input: "textarea",
                inputLabel: "Send your reply",
                inputPlaceholder: "Type your message here...",
                showCancelButton: true,
              });

              if (text) {
                await postUsers({"reply":text},"replies");
                Swal.fire("Updated successfully!", "", "success");
                showAdminQA()
                
              }       
        })

    });  
    
}



  