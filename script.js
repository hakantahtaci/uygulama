// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form data collection
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        message: this.querySelector('textarea').value
    };

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
        alert('Lütfen tüm alanları doldurun.');
        return;
    }

    // Success message
    alert('Mesajınız başarıyla gönderildi!');
    this.reset();
});

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// "Daha Fazla" button effect
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Product Management
let products = JSON.parse(localStorage.getItem('products')) || [];

// Product display function
function displayProducts(filteredProducts = products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl';
        productCard.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${product.image}" alt="${product.name}" 
                    class="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 class="text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        ${product.name}
                    </h3>
                    <p class="text-white/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        ${product.description.substring(0, 100)}...
                    </p>
                </div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-gray-800">${product.name}</h3>
                    <span class="text-2xl font-bold text-pink-600">${product.price} TL</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                        ${product.category}
                    </span>
                    <button class="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300 view-details">
                        Detayları Gör
                    </button>
                </div>
            </div>
        `;
        
        productCard.querySelector('.view-details').addEventListener('click', (e) => {
            e.stopPropagation();
            showProductDetails(product);
        });
        
        productsGrid.appendChild(productCard);
    });
}

// Product search and filter
document.getElementById('searchProduct')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    filterProducts(searchTerm, categoryFilter);
});

document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
    const categoryFilter = e.target.value;
    const searchTerm = document.getElementById('searchProduct').value.toLowerCase();
    filterProducts(searchTerm, categoryFilter);
});

function filterProducts(searchTerm, category) {
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === '' || product.category === category;
        return matchesSearch && matchesCategory;
    });
    displayProducts(filteredProducts);
}

// Product Modal
function showProductDetails(product) {
    const modal = document.getElementById('productModal');
    const details = document.getElementById('productDetails');
    details.innerHTML = `
        <div class="grid md:grid-cols-2 gap-8">
            <div class="relative group">
                <img src="${product.image}" alt="${product.name}" 
                    class="w-full h-[500px] object-cover rounded-xl">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </div>
            <div class="space-y-6">
                <h2 class="text-3xl font-bold text-gray-800">${product.name}</h2>
                <p class="text-4xl font-bold text-pink-600">${product.price} TL</p>
                <div class="flex items-center space-x-2">
                    <span class="px-4 py-2 bg-pink-100 text-pink-600 rounded-full">
                        ${product.category}
                    </span>
                </div>
                <p class="text-gray-600 leading-relaxed">
                    ${product.description}
                </p>
                <button class="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                    Sipariş Ver
                </button>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close modal
document.querySelector('.close')?.addEventListener('click', () => {
    document.getElementById('productModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Admin Panel Functions
const productForm = document.getElementById('productForm');
productForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(productForm);
    const imageFile = formData.get('productImage');
    
    // Convert image to base64
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
        const newProduct = {
            id: Date.now(),
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: document.getElementById('productPrice').value,
            description: document.getElementById('productDescription').value,
            image: reader.result
        };
        
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        updateProductList();
        productForm.reset();
    };
});

function updateProductList() {
    const productList = document.getElementById('productList');
    if (!productList) return;

    productList.innerHTML = '';
    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'bg-gray-50 rounded-lg p-4 flex items-center justify-between';
        item.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg">
                <div>
                    <h4 class="font-semibold text-gray-800">${product.name}</h4>
                    <p class="text-pink-600 font-bold">${product.price} TL</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="editProduct(${product.id})" 
                    class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300">
                    Düzenle
                </button>
                <button onclick="deleteProduct(${product.id})"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300">
                    Sil
                </button>
            </div>
        `;
        productList.appendChild(item);
    });
}

function deleteProduct(id) {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
        products = products.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        updateProductList();
    }
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;

    // Remove the old product
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    updateProductList();
}

// Initialize product display
displayProducts();
updateProductList(); 