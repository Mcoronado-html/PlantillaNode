import { postUsers, getUsers } from "./services/Q&Aservices.js";
const userSign = document.getElementById("signUser")
const passSign = document.getElementById("signPass")
const btnSign = document.getElementById("signBtn")

const userLog = document.getElementById("logUser")
const passLog = document.getElementById("logPass")
const btnLog = document.getElementById("logBtn")


try {
    btnLog.addEventListener("click", async function() {
        let users = await getUsers("users");
        
        const user = users.find(user => 
            user.username === userLog.value && user.password === passLog.value
            && user.role === "Student" 
        );
        
        const userAdmin = users.find(user => 
            user.username === userLog.value && user.password === passLog.value
            && user.role === "Admin" 
        );

        if (user) {
            console.log("Entra");
            Swal.fire({
                title: 'Success!',
                text: 'Access approved',
                icon: 'success',
                confirmButtonText: 'Cool'
            }) 
            localStorage.setItem("userName", user.username)
            setTimeout(() => {
            window.location.href = 'Q&A.html';       
            }, 800);
         
        } else if(userAdmin){
            console.log("Admin")  
            window.location.href = 'admin.html';

        }else{ 
            Swal.fire({
                icon: "error",
                title: "Wrong credentials",
            });
        }
        });
} catch (error) {
}
    
btnSign.addEventListener("click", async function () {
    
     let user = {
         "username" : userSign.value,
         "password": passSign.value,
         "role": "Student"
         }
         await postUsers(user,"users")
})
     
    
    // getUsers("questions")
    // getUsers("users")