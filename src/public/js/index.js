const addToCart = async (cartId, productId) => {
  await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
      })
      .then((cart) => cart.json())
      .then((data) => {
          alertify.alert('Listo!', `Producto agregado al carrito.`, function(){ alertify.success(`Producto agregado al carrito`); });
      })
      .catch((error) => {
          console.log(error);
      });
};

async function agregaUno(cantidad, cartId, productId) {
const cantidadElement = document.querySelector(`#cantidad-${productId}`);
const currentQuantity = parseInt(cantidadElement.textContent);

const newQuantity = currentQuantity + cantidad;
if (newQuantity >= 0) {
  // Realizar la solicitud al endpoint del backend
  await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity: newQuantity }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
      const existingProductIndex = data.payload.products.findIndex(
          (product) => product.product._id.toString() === productId
      );
    // Actualizar la cantidad en el frontend si la solicitud es exitosa
    cantidadElement.textContent = data.payload.products[existingProductIndex].quantity;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
}

async function borraUno(cantidad, cartId, productId) {
  const cantidadElement = document.querySelector(`#cantidad-${productId}`);
  const currentQuantity = parseInt(cantidadElement.textContent);

  const newQuantity = currentQuantity - cantidad;
    
    await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity: currentQuantity >= 1 ? currentQuantity-1 : 1 }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        const existingProductIndex = data.payload.products.findIndex(
            (product) => product.product._id.toString() === productId
          );
      // Actualizar la cantidad en el frontend si la solicitud es exitosa
      cantidadElement.textContent = data.payload.products[existingProductIndex].quantity;
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

const borrar = async (cartId, productId) => {
  try {
    await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Eliminar el elemento del DOM correspondiente al producto
        const productElement = document.querySelector(`[data-element-id="${productId}"]`);
        productElement.remove();

        // Verificar si no quedan más elementos en el carrito
        const cartElements = document.querySelectorAll('[data-element-id]');
        const title = document.getElementById('title');
        if (cartElements.length === 0) {
          title.remove();
          const emptyCartElement = document.createElement('div');
          emptyCartElement.classList.add('col', 'd-flex', 'flex-column', 'p-3', 'justify-content-center', 'align-items-center');
          emptyCartElement.innerHTML = `
            <h3>
              <i class="fa-solid fa-triangle-exclamation text-warning"></i>
              El carrito está vacío
            </h3>
          `;
          document.querySelector('.d-flex.flex-column').appendChild(emptyCartElement);
        }
      })
      .catch(error => {
        console.log(error);
      })
  } catch (error) {
    console.log(error);
  }
}

const vaciarCarrito = async (cartId) => {
  try {
    await fetch(`http://localhost:8080/api/carts/${cartId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Eliminar todos los elementos del carrito de la vista
      const cartContainer = document.querySelector('.d-flex.flex-column');
      cartContainer.innerHTML = '';

      // Mostrar el mensaje de carrito vacío
      const emptyCartElement = document.createElement('div');
      emptyCartElement.classList.add('col', 'd-flex', 'flex-column', 'p-3', 'justify-content-center', 'align-items-center');
      emptyCartElement.innerHTML = `
        <h3>
          <i class="fa-solid fa-triangle-exclamation text-warning"></i>
          El carrito está vacío
        </h3>
      `;
      cartContainer.appendChild(emptyCartElement);
    })
    .catch(error => {
      console.log(error);
    })
  } catch (error) {
    console.log(error);
  }
}

const copyToClipboard = (text) => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  const copyButton = document.getElementById('copyButton');
  copyButton.innerHTML = '<i class="fas fa-check"></i>';
  copyButton.disabled = true;

  setTimeout(function () {
      copyButton.innerHTML = '<i class="fas fa-copy"></i>';
      copyButton.disabled = false;
  }, 2000);
}

const deleteFromCart = async (cartId, productId) => {
try {
  await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    const row = document.querySelector(`tr[data-product-id="${productId}"]`);
    if (row) {
      // Eliminar la fila de la tabla
      row.remove();

      // Verificar si no hay más filas en la tabla
      const table = document.querySelector('.table');
      const rowCount = table.querySelectorAll('tbody tr').length;

      if (rowCount === 0) {
        // Si no hay más filas, mostrar un mensaje de carrito vacío
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No hay más productos sin procesar en el carrito.';
        emptyMessage.classList.add('my-3');
        table.parentNode.insertBefore(emptyMessage, table.nextSibling);
        setTimeout(function () {
          window.location.reload();
      }, 2000);
      }
    }
  }
  ).catch(error => console.log(error));
} catch (error) {
  console.log(error);
}
}