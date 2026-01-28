// API URL
const API_URL = 'https://api.escuelajs.co/api/v1/products';

// Fetch và hiển thị dữ liệu
async function fetchAndDisplayProducts() {
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const productsDiv = document.getElementById('products');
    const statsDiv = document.getElementById('stats');

    try {
        // Fetch data từ API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convert response sang JSON (object)
        const products = await response.json();

        // Ẩn loading
        loadingDiv.style.display = 'none';

        // Hiển thị thống kê
        statsDiv.innerHTML = `📦 Tổng số sản phẩm: <strong>${products.length}</strong>`;

        // Hiển thị từng sản phẩm
        productsDiv.innerHTML = products.map(product => {
            // Lấy ảnh đầu tiên, nếu không có thì dùng placeholder
            const imageUrl = product.images && product.images[0] 
                ? product.images[0].replace(/[\[\]"]/g, '') 
                : 'https://via.placeholder.com/250';

            return `
                <div class="product-card">
                    <img src="${imageUrl}" 
                         alt="${product.title}" 
                         class="product-image"
                         onerror="this.src='https://via.placeholder.com/250'">
                    <div class="product-info">
                        <div class="product-id">ID: ${product.id}</div>
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-slug">🔗 ${product.slug || 'N/A'}</div>
                        <div class="product-price">$${product.price}</div>
                        <p class="product-description">${product.description}</p>
                        <span class="product-category">📂 ${product.category?.name || 'Uncategorized'}</span>
                    </div>
                </div>
            `;
        }).join('');

        // Log data ra console để xem object
        console.log('Products data:', products);

    } catch (error) {
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = `❌ Lỗi khi tải dữ liệu: ${error.message}`;
        console.error('Error fetching products:', error);
    }
}

// Gọi hàm khi trang load xong
fetchAndDisplayProducts();
