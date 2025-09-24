let products = [
  { 
    name: "Dell Laptop", 
    price: 1000, 
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop" 
  },
  { 
  name: "iPhone 15", 
  price: 500, 
  image: "https://images.unsplash.com/photo-1695048093720-d7d04decc8d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTV8ZW58MHx8MHx8&w=800&h=600&fit=crop" 
},
{ 
  name: "AirPods", 
  price: 200, 
  image: "https://images.unsplash.com/photo-1588159343745-44571d2b9e10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWlycG9kc3xlbnwwfHwwfHw%3D&w=800&h=600&fit=crop" 
},
  { 
    name: "Apple Watch", 
    price: 150, 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop" 
  }
];

const loginForm = document.getElementById("loginForm");
const loginSection = document.getElementById("loginSection");
const mainNavbar = document.getElementById("mainNavbar");
const sections = document.querySelectorAll("section[id$='Section']"); 
let swiperInstance = null; 

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    loginSection.classList.add("d-none");
    mainNavbar.classList.remove("d-none");

    sections.forEach(sec => sec.classList.add("d-none"));
    document.getElementById("homeSection").classList.remove("d-none");

    renderAllProducts();
    initSwiper();

    alert("✅ تسجيل الدخول ناجح! مرحبا بك في Mini E-Commerce.");
  } else {
    alert("❌ يرجى ملء اسم المستخدم وكلمة السر.");
  }
});

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = e.target.getAttribute("data-page");
    sections.forEach(sec => sec.classList.add("d-none"));
    document.getElementById(page + "Section").classList.remove("d-none");
    if (page === "home" || page === "about" || page === "products") {
      renderAllProducts();
      if (page === "home" && swiperInstance) {
        swiperInstance.update();
      }
    }
  });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  mainNavbar.classList.add("d-none");
  loginSection.classList.remove("d-none");
  sections.forEach(sec => sec.classList.add("d-none"));
  if (swiperInstance) {
    swiperInstance.destroy(true, true); 
    swiperInstance = null;
  }
});

document.getElementById("addProductForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value.trim();
  
  if (name && price > 0 && image) {
    products.push({ name, price, image });
    renderAllProducts();
    e.target.reset();
    alert("✅ تم إضافة المنتج بنجاح!");
  } else {
    alert("❌ يرجى ملء جميع الحقول بشكل صحيح.");
  }
});

function renderProductsIn(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = "";
  
  products.forEach((product, index) => {
    const col = document.createElement("div");
    col.className = "col-md-3 col-sm-6";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-success fw-bold">$${product.price.toFixed(2)}</p>
          <button class="btn btn-danger mt-auto remove-btn" data-index="${index}">إزالة</button>
        </div>
      </div>
    `;
    container.appendChild(col);
  });

  container.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = parseInt(e.target.getAttribute("data-index"));
      products.splice(idx, 1);
      renderAllProducts();
      alert("🗑️ تم إزالة المنتج!");
    });
  });
}

function renderAllProducts() {
  renderProductsIn("productsContainer");
  renderProductsIn("homeProductsContainer");
  renderProductsIn("aboutProductsContainer");
}

function initSwiper() {
  const swiperElement = document.getElementById("homeSwiper");
  if (swiperElement && !swiperInstance) {
    swiperInstance = new Swiper(".mySwiper", {
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
    });
  }
}
