
const d = document
  
const deleteUserButtons = d.querySelectorAll('[id^="deleteUser-"]')

const deleteInactiveUsers = d.getElementById('deleteInactiveUsers')

deleteUserButtons.forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault()
    const cartId = button.getAttribute('id').split('-')[1]
    const userName =
      button.previousElementSibling.querySelector('h3').textContent

    try {
      const response = await fetch(`/api/users/${cartId}`, {
        method: 'DELETE'
      })
      const data = await response.json()

      if (response.ok) {
          Swal.fire({
              title: 'User successfully deleted!',
              text: `User name: ${userName}`,
              toast: true,
              position: 'top-right',
              icon: 'success',
              timer: 3000,
              footer: 'Reloading page on close',
              timerProgressBar: true,
           
              willClose: () => {
                location.reload()
              }
            })
      } else {
        throw data
      }
    } catch ({ error }) {
      console.log(error)
    }
  })
})

deleteInactiveUsers.addEventListener('click', async (e) => {
  e.preventDefault()
  try {
    const response = await fetch('/api/users/inactive', {
      method: 'DELETE'
    })
    const data = await response.json()

    if (response.ok) {
      Swal.fire({
          title: 'Inactive users deleted!',
          html: 'Removed users for inactivity',
          toast: true,
          position: 'top-right',
          icon: 'success',
          timer: 3000,
          footer: 'Reloading page on close',
          timerProgressBar: true,
        
          willClose: () => {
            location.reload()
          }
        })

    } else {
      throw data
    }
  } catch ({ error }) {
      console.log(error)
  }
})
