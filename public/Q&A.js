// Importamos las funciones necesarias para interactuar con la base de datos
import { postUsers, getUsers, deleteUser, updateUsers } from "./services/Q&Aservices.js";

// Seleccionamos los elementos del DOM donde interactuamos con el usuario
const enterQA = document.getElementById("enterQA");
const inputQA = document.getElementById("inputQA");
const tableQA = document.getElementById("tableQA");

// Llamamos a la función que muestra las preguntas cuando se carga la página
showQuestions();

// Evento cuando el usuario hace clic en el botón para enviar una pregunta
enterQA.addEventListener("click", async function() {
    // Comprobamos si el input de la pregunta no está vacío
    if (inputQA.value !== "") {
        // Creamos un objeto con la pregunta y los detalles necesarios
        let questions = {
            "questions": inputQA.value,
            "Username": localStorage.getItem("userName"), // Obtenemos el nombre del usuario desde el almacenamiento local
            "date": new Date().toLocaleDateString(), // La fecha actual
            "hour": new Date().toLocaleTimeString()  // La hora actual
        };

        // Enviamos la pregunta al servidor para guardarla en la base de datos
        await postUsers(questions, "questions");

        // Mostramos un mensaje de éxito utilizando SweetAlert
        Swal.fire({
            title: 'Success!',
            text: 'Question submitted',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Recargamos la lista de preguntas después de enviar una nueva
        showQuestions(); 
    } else {
        // Si el input está vacío, mostramos un mensaje de advertencia
        Swal.fire({
            title: 'Denied!',
            text: 'Please send a valid question',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }
});

// Función para mostrar las preguntas de la base de datos en la tabla
async function showQuestions() {
    // Obtenemos todas las preguntas desde la base de datos
    let getQA = await getUsers("questions"); 
    
    // Limpiamos la tabla antes de agregar nuevas filas
    tableQA.innerHTML = "";

    // Creamos las cabeceras de la tabla
    let thQA = document.createElement("th");
    let thName = document.createElement("th");
    let thDate = document.createElement("th");
    let thHour = document.createElement("th");

    // Establecemos los textos de las cabeceras
    thQA.textContent = "Questions";
    thName.textContent = "Name";
    thDate.textContent = "Date";
    thHour.textContent = "Hour";

    // Añadimos las cabeceras a la tabla
    tableQA.appendChild(thQA);
    tableQA.appendChild(thName);
    tableQA.appendChild(thDate);
    tableQA.appendChild(thHour);

    // Recorremos todas las preguntas y las mostramos en la tabla
    getQA.forEach(question => {
        // Creamos una nueva fila para cada pregunta
        let trQA = document.createElement("tr");

        // Creamos las celdas para cada dato de la pregunta
        let tdQuestion = document.createElement("td");
        let tdName = document.createElement("td");
        let tdDate = document.createElement("td");
        let tdHour = document.createElement("td");

        // Establecemos las clases CSS para dar estilo a cada celda
        trQA.setAttribute("class", "trQA");
        tdQuestion.setAttribute("class", "tdQuestion");
        tdName.setAttribute("class", "tdName");
        tdDate.setAttribute("class", "tdDate");
        tdHour.setAttribute("class", "tdHour");

        // Establecemos el contenido de cada celda
        tdQuestion.textContent = question.questions;
        tdName.textContent = question.Username;
        tdDate.textContent = question.date || "N/A"; // Si no hay fecha, mostramos "N/A"
        tdHour.textContent = question.hour || "N/A";  // Si no hay hora, mostramos "N/A"

        // Añadimos las celdas a la fila
        trQA.appendChild(tdQuestion);
        trQA.appendChild(tdName);
        trQA.appendChild(tdDate);
        trQA.appendChild(tdHour);
        
        // Añadimos la fila a la tabla
        tableQA.appendChild(trQA);    
    });
}
