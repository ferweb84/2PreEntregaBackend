const form = document.getElementById("restoreForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  const response = await fetch("http://localhost:8080/api/restore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (result.error) {
    alert(result.error);
  } else {
    alert("Se ha generado un nuevo correo de restablecimiento. Por favor, revise su bandeja de entrada.");
    // window.location.href = "/login";
  }
});