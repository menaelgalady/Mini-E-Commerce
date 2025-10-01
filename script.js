document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const addProductForm = document.getElementById("addProductForm");
  const addProductModal = new bootstrap.Modal(document.getElementById("addProductModal"));

  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const card = e.target.closest(".product-card");
      if (card) {
        const col = card.parentElement;
        col.classList.add("fade-out");
        setTimeout(() => {
          col.remove();
        }, 300);
      }
    }
  });

  addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

  
    const name = document.getElementById("productName").value.trim();
    const priceInput = document.getElementById("productPrice").value;
    const price = parseFloat(priceInput).toFixed(2);
    const imageUrl = document.getElementById("productImage").value.trim();

    if (!name || !priceInput || !imageUrl) {
      alert("Please fill all fields correctly.");
      return;
    }

    const colDiv = document.createElement("div");
    colDiv.className = "col-12 col-sm-6 col-md-4";

    colDiv.innerHTML = `
      <div class="card product-card h-100 shadow-sm">
        <img src="${imageUrl}" class="card-img-top" alt="${name}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${name}</h5>
          <p class="price mb-3">$${price}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <button class="btn btn-danger btn-sm remove-btn">Remove</button>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(colDiv);
    addProductModal.hide();
    addProductForm.reset();
  });
});


