// const form = document.getElementById("loginForm");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const data = new FormData(form);
//   const obj = {};

//   data.forEach((value, key) => (obj[key] = value));

//   let response = await fetch("/api/sessions/login", {
//     method: "POST",
//     body: JSON.stringify(obj),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   let result = await response.json();
//   console.log(result);
// });
const form = document.getElementById("login");
const inputEmail=document.getElementById("email");
const inputPass=document.getElementById("password");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
    
  }) 
  console.log(obj)
  let result = await response.json();
  console.log(result)
  
});
  // if(result.status === "sucess"){

  //   window.location.href = "/products";
  // }else{
  //   inputEmail.innerHTML="";
  //   Swal.fire({
  //     title: "User incorrect",
  //     toast: true,
  //     position: "top-right",
  //     icon: "success",
      
  //   });
  // }
