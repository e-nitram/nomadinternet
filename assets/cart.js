const cart = JSON.parse(document.querySelector('#cart-data').innerHTML);
console.log('data = ', cart)
window.addEventListener('DOMContentLoaded', (e) => {
  const minusBtns = document.querySelectorAll('[js-item-minus]');
  const plusBtns = document.querySelectorAll('[js-item-plus]');
  const removeBtns = document.querySelectorAll('[js-item-remove]');

  minusBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const value = Number(button.getAttribute('data-value'));
      const id = button.getAttribute('data-id');
      const serviceId = button.getAttribute('data-service-id');
      let serviceQuantity = 0;
      cart.items.forEach(item => {
        if (item.id.toString() == serviceId) {
          serviceQuantity = item.quantity - 1;
        }
      });

      let quantity = value - 1;
      updateCartItem(id, quantity, serviceId, serviceQuantity);
    })
  });

  plusBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const value = Number(button.getAttribute('data-value'));
      const id = button.getAttribute('data-id');
      const serviceId = button.getAttribute('data-service-id');
      let serviceQuantity = 0;
      cart.items.forEach(item => {
        if (item.id.toString() == serviceId) {
          serviceQuantity = item.quantity + 1;
        }
      });

      let quantity = value + 1;
      updateCartItem(id, quantity, serviceId, serviceQuantity);
    })
  });

  removeBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const id = button.getAttribute('data-id');
      const serviceId = button.getAttribute('data-service-id');
      let serviceQuantity = 0;
      updateCartItem(id, 0, serviceId, serviceQuantity);
    })
  });
});

function updateCartItem(variantId, quantity, serviceId, serviceCount){
  console.log("update new product here");
  let formData = {
    "id" : variantId,
    "quantity" : quantity
  }

  fetch(window.Shopify.routes.root + "cart/change.js", {
    method: "POST",
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log("Success:", data);
    if (serviceId) {
      let serviceData = {
        "id": serviceId,
        "quantity": serviceCount
      }

      fetch(window.Shopify.routes.root + "cart/change.js", {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      })
      .then((response) => {
        return response.json();
      }).then(res => {
        window.location.reload();
      })
    } else {
      window.location.reload();
    }
  })
  .catch((error) => {
    sessionStorage.setItem('loading', '0');
    console.error("Error:", error);
  });
}