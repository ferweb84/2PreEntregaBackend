const socket = io();
Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Alerta basica con Sweetalert2",
    inputValidator: (value) => {
      return !value && "Necesitas escribir un nombre de usuario para continuar";
    },
    allowOutsideClick: false,
  })
  .then((result) => {
    user = result.value;
    socket.emit("user-autenticated", user);
  });
const list = document.getElementById("listproducts")
const imagelist = document.getElementById("imageproducts")
socket.on("products", (products) => {
    // productList.innerHTML+=products // let showProducts = ""
    console.log(products.stock)
       let listProducts = "";
    products.forEach((prod) => {
     
        listProducts += `<br>`+`-`+`The product ${prod.title} with the code ${prod.code} with a description ${prod.description} and the price of that product is ${prod.price}`;
    });
    list.innerHTML = `${listProducts}`

    products.thumbnails.forEach((imag)=>{
        const imgElem=document.createElement("img");
        console.log(imag)
        imgElem.src = imag;
        imgElem.alt = products.title
        imagelist.appendChild(imgElem);
    })
 
});

const form = document.getElementById("cookieForm");

form.addEventListener("submit", async(evt)=>{
  evt.preventDefault();

  const obj = {};
  const data = new FormData(form);

  data.forEach ((value,key)=>{
    obj[key]= value;
  });
  let response = await fetch ("/cookie",{
    metho: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let result = await response.json();
  console.log(result);

});
const getCookies = ()=>{
  console.log (document.cookie);
}