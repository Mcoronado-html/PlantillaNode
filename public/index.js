// Importamos las funciones necesarias para interactuar con la base de datos
import { postUsers, getUsers } from "./services/Q&Aservices.js";

// Seleccionamos los elementos HTML donde se ingresarán los datos del usuario
const userSign = document.getElementById("signUser");
const passSign = document.getElementById("signPass");
const btnSign = document.getElementById("signBtn");

const userLog = document.getElementById("logUser");
const passLog = document.getElementById("logPass");
const btnLog = document.getElementById("logBtn");

// Intentamos agregar los eventos para los botones de inicio de sesión
try {
    // Evento para el botón de inicio de sesión
    btnLog.addEventListener("click", async function() {
        // Obtenemos todos los usuarios registrados en la base de datos
        let users = await getUsers("users");
        
        // Buscamos al usuario que coincida con el nombre y contraseña, y que tenga el rol de "Student"
        const user = users.find(user => 
            user.username === userLog.value && user.password === passLog.value
            && user.role === "Student"
        );
        
        // Buscamos al usuario que coincida con el nombre y contraseña, y que tenga el rol de "Admin"
        const userAdmin = users.find(user => 
            user.username === userLog.value && user.password === passLog.value
            && user.role === "Admin"
        );

        // Si encontramos al usuario como "Student"
        if (user) {
            console.log("Entra");
            // Mostramos un mensaje de éxito
            Swal.fire({
                title: 'Success!',
                text: 'Access approved',
                icon: 'success',
                confirmButtonText: 'Cool'
            }) 
            // Guardamos el nombre del usuario en el almacenamiento local
            localStorage.setItem("userName", user.username);
            // Redirigimos al usuario a la página de preguntas y respuestas después de 800ms
            setTimeout(() => {
                window.location.href = 'Q&A.html';       
            }, 800);
         
        } else if(userAdmin){
            console.log("Admin");
            // Si es un administrador, lo redirigimos a la página de administración
            window.location.href = 'admin.html';
        } else { 
            // Si las credenciales son incorrectas, mostramos un mensaje de error
            Swal.fire({
                icon: "error",
                title: "Wrong credentials",
            });
        }
    });
} catch (error) {
    // Captura cualquier error en el bloque try
}

// Evento para el botón de registro
btnSign.addEventListener("click", async function () {
     // Creamos un nuevo objeto de usuario con los datos ingresados
     let user = {
         "username" : userSign.value,
         "password": passSign.value,
         "role": "Student"
     };
     // Enviamos los datos del nuevo usuario a la base de datos
     await postUsers(user, "users");
});