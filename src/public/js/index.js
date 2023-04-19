// const socket = io();


//actividad en clase
// const input= document.getElementById("textbox");
// const log = document.getElementById("log");

// input.addEventListener("keyup",(event)=>{
//     event.target.value = "";
//     socket.emit("message1", event.key);
// });
// socket.on ("log", (data)=>{
//     log.innerHTML += data;
// });

//segunda parte de la actividad 
// input.addEventListener ("keyup", (event)=>{
//     if (event.key === "Enter"){
//         socket.emit ("message2", input.value);
//         input.value= "";
//     }
// })

// socket.on("log",(data)=>{
//     let logs = "";
//     data.logs.forEach((log) => {
//         logs += `El socket ${log.socketId} dice: ${log.message} </br>`;
//     });

//     log.innerHTML = logs; 
// })

// //.....................................................

// socket.emit("product_added", "productObjetooooos");

// socket.on ("product_added1", (data)=>{
//     console.log (data);
// });
// socket.emit ("product_added2", "productObjetoooo2");

// socket.on ("message3", (data)=>{
//     console.log(data);
// })
// console.log ("hola, estoy ejecutando un script desde una plantilla");