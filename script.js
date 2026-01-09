// Initialize Animations
AOS.init({ duration: 1000, once: true });

const container = document.getElementById('furniture-container');

// Fetch Furniture from Platzi Fake Store API (Category 3 is usually Furniture)
async function fetchFurniture() {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories/3/products');
        const products = await response.json();
        
        container.innerHTML = ''; // Clear loading text

        products.slice(0, 8).forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-aos', 'fade-up');

            // Using ternary to handle potential broken images in the API
            const imageUrl = item.images[0].startsWith('http') ? item.images[0] : 'https://via.placeholder.com/300';

            card.innerHTML = `
                <img src="${imageUrl}" alt="${item.title}">
                <div class="card-info">
                    <h3>${item.title}</h3>
                    <p class="price">$${item.price}</p>
                    <button class="btn" style="width: 100%; margin-top: 15px;">Add to Cart</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = '<p>Error loading products. Please try again later.</p>';
        console.error("API Error:", error);
    }
}

fetchFurniture();