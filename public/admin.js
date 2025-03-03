// Importamos las funciones necesarias para interactuar con la base de datos
import { postUsers, getUsers, deleteUser, updateUsers } from "./services/Q&Aservices.js";

// Seleccionamos el elemento donde se mostrarán las preguntas y respuestas
const adminTable = document.getElementById("adminTable");

// Llamamos a la función para mostrar las preguntas
showAdminQA();

async function showAdminQA() {
    adminTable.innerHTML = ""; // Limpiamos la tabla antes de llenarla con nuevos datos

    // Obtenemos todas las preguntas de la base de datos
    let getAdminQA = await getUsers("questions");

    // Creamos los encabezados de la tabla
    let thAdminCon = document.createElement("th");
    let thQA = document.createElement("th");
    let thName = document.createElement("th");
    let thDate = document.createElement("th");
    let thHour = document.createElement("th");
    let thAnswer = document.createElement("th");

    // Establecemos el texto de los encabezados
    thAdminCon.textContent = "Admin Console";
    thQA.textContent = "Question";
    thName.textContent = "Student";
    thDate.textContent = "Date";
    thHour.textContent = "Hour";
    thAnswer.textContent = "Answer";

    // Añadimos los encabezados a la tabla
    adminTable.appendChild(thAdminCon);
    adminTable.appendChild(thQA);
    adminTable.appendChild(thName);
    adminTable.appendChild(thDate);
    adminTable.appendChild(thHour);
    adminTable.appendChild(thAnswer);

    // Obtenemos todas las respuestas de la base de datos
    let showAnswer = await getUsers("replies");

    // Recorremos todas las preguntas y las mostramos
    getAdminQA.forEach(question => {
        // Creamos una nueva fila para cada pregunta
        let trQA = document.createElement("tr");
        
        // Creamos los botones de Editar, Eliminar y Responder
        let AdminEdit = document.createElement("button");
        let AdminDelete = document.createElement("button");
        let AdminReply = document.createElement("button");

        // Creamos las celdas para mostrar los datos de cada pregunta
        let tdQuestion = document.createElement("td");
        let tdName = document.createElement("td");
        let tdDate = document.createElement("td");
        let tdHour = document.createElement("td");

        // Añadimos clases CSS para dar estilo a los elementos
        trQA.classList.add("trQA");
        AdminEdit.classList.add("adminBtns");
        AdminDelete.classList.add("adminBtns");
        AdminReply.classList.add("adminBtns");
        tdQuestion.classList.add("tdQuestion");
        tdName.classList.add("tdName");
        tdDate.classList.add("tdDate");
        tdHour.classList.add("tdHour");

        // Establecemos el texto de los botones y las celdas con la información de la pregunta
        AdminEdit.textContent = "Edit";
        AdminDelete.textContent = "Delete";
        AdminReply.textContent = "Reply";
        tdQuestion.textContent = question.questions;
        tdName.textContent = question.Username;
        tdDate.textContent = question.date;
        tdHour.textContent = question.hour;
    
        // Añadimos los botones y las celdas a la fila
        trQA.appendChild(AdminEdit);
        trQA.appendChild(AdminDelete);
        trQA.appendChild(AdminReply);
        trQA.appendChild(tdQuestion);
        trQA.appendChild(tdName);
        trQA.appendChild(tdDate);
        trQA.appendChild(tdHour);

        // Filtramos las respuestas que corresponden a la pregunta actual
        let showReplies = showAnswer.filter(answer => answer.questionId === question.id);
        showReplies.forEach((answer) => {
            let tdAnswer = document.createElement("td");
            tdAnswer.classList.add("tdAnswer");
            tdAnswer.textContent = answer.reply;
            trQA.appendChild(tdAnswer);
        });

        // Añadimos la fila con la pregunta y sus respuestas a la tabla
        adminTable.appendChild(trQA);

        // Evento para editar la pregunta
        AdminEdit.addEventListener("click", async function () {
            const { value: text } = await Swal.fire({
                input: "textarea",
                inputLabel: "Edit question",
                inputValue: question.questions,
                inputPlaceholder: "Type your message here...",
                showCancelButton: true,
            });

            // Si se proporciona un nuevo texto, actualizamos la pregunta en la base de datos
            if (text) {
                await updateUsers({"questions":text},"questions", question.id);
                Swal.fire("Updated successfully!", "", "success");
                showAdminQA(); // Recargamos las preguntas actualizadas
            }
        });

        // Evento para eliminar una pregunta
        AdminDelete.addEventListener("click", async function () {
            deleteUser("questions", question.id);
            await showAdminQA(); // Recargamos la tabla después de eliminar la pregunta
        });

        // Evento para responder a una pregunta
        AdminReply.addEventListener("click", async function () {
            const { value: text } = await Swal.fire({
                input: "textarea",
                inputLabel: "Send your reply",
                inputPlaceholder: "Type your message here...",
                showCancelButton: true,
            });

            // Si se proporciona una respuesta, la guardamos en la base de datos
            if (text) {
                await postUsers({
                    "reply": text,
                    "questionId": question.id // Asociamos la respuesta a la pregunta
                }, "replies");

                Swal.fire("Updated successfully!", "", "success");
                showAdminQA(); // Recargamos la tabla con las nuevas respuestas
            }
        });
    });
}



  