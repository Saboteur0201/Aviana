document.addEventListener("DOMContentLoaded", () => {
    // Trying to load the XML file with the product data
    fetch('products.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            
            // Parse products from the XML
            const products = Array.from(xmlDoc.getElementsByTagName('product')).map((productNode, index) => {
                return {
                    code: productNode.getAttribute('code'), // Assuming the code is an attribute in XML
                    name: productNode.getElementsByTagName('name')[0]?.textContent || "Unknown Product",
                    stockStatus: productNode.getElementsByTagName('stockStatus')[0]?.textContent || "Unknown Status",
                    unitPrice: parseFloat(productNode.getElementsByTagName('unitPrice')[0]?.textContent) || 0.0,
                    ratings: parseFloat(productNode.getElementsByTagName('ratings')[0]?.textContent) || 0.0,
                    image: `images/product${index + 1}.jpg` // Path to images named as product1.jpg, product2.jpg, etc.
                };
            });

            // Get the list element where the products should go
            const productList = document.querySelector('.product-list');
            if (!productList) {
                console.error("Product list container not found in the HTML.");
                return;
            }
            
            // Create product cards
            products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card');
                
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/default.jpg'">
                    <h3>${product.name}</h3>
                    <div class="details-container">
                        <p class="price">Price: $${product.unitPrice.toFixed(2)}</p>
                        <p class="status" style="color: ${getStockColor(product.stockStatus)};">Status: ${product.stockStatus}</p>
                        <p class="rating">Rating: ${product.ratings}</p>
                    </div>
                `;
                
                productList.appendChild(card);
            });
            
        })
        .catch(err => {
            console.error('Error loading product data:', err);
        });

    // Assign color based on stock status
    function getStockColor(stockStatus) {
        switch (stockStatus) {
            case "In Stock":
                return "green";
            case "Pre-order":
                return "orange";
            case "Out of Stock":
                return "red";
            default:
                return "black";
        }
    }

    // Search function
    function filterProducts() {
        var input = document.getElementById('search');
        var filter = input.value.toLowerCase();
        var rows = document.querySelectorAll('#productTable tr');

        rows.forEach(function(row, index) {
            if (index === 0) return; // Skip the header row
            var cells = row.getElementsByTagName('td');
            var productCode = cells[0].textContent.toLowerCase();
            var productName = cells[1].textContent.toLowerCase();
            if (productCode.includes(filter) || productName.includes(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function updateOrderFields() {
        const orderType = document.getElementById("orderType").value;
        const orderDetails = document.getElementById("orderDetails");
    
        if (orderType === "product") {
            orderDetails.innerHTML = `
                <label for="productName">Product Name:</label>
                <input type="text" id="productName" name="productName" placeholder="Product name" required>
                
                <label for="productCode">Product Code:</label>
                <input type="text" id="productCode" name="productCode" placeholder="Product code" required>
            `;
        } else if (orderType === "service") {
            orderDetails.innerHTML = `
                <label for="serviceName">Service Name:</label>
                <input type="text" id="serviceName" name="serviceName" placeholder="Service name" required>
                
                <label for="serviceCode">Service Code:</label>
                <input type="text" id="serviceCode" name="serviceCode" placeholder="Service code" required>
            `;
        } else {
            orderDetails.innerHTML = "";
        }
    }
    
    function updateContactFields() {
        const contactReason = document.getElementById("contactReason").value;
        const contactDetails = document.getElementById("contactDetails");
    
        if (contactReason === "complaints") {
            contactDetails.innerHTML = `
                <label for="complaint">Complaint Details:</label>
                <textarea id="complaint" name="complaint" placeholder="Describe your complaint"></textarea>
            `;
        } else if (contactReason === "query") {
            contactDetails.innerHTML = `
                <label for="query">Query Details:</label>
                <textarea id="query" name="query" placeholder="Ask your query"></textarea>
            `;
        } else if (contactReason === "bugs") {
            contactDetails.innerHTML = `
                <label for="bugReport">Bug Report Details:</label>
                <textarea id="bugReport" name="bugReport" placeholder="Describe the bug"></textarea>
            `;
        } else {
            contactDetails.innerHTML = "";
        }
    }
    
    // Attach the search function to the input field
    document.getElementById('search').addEventListener('keyup', filterProducts);

});

