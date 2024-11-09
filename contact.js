
document.addEventListener('DOMContentLoaded', function () {
    // Fetching the XML file
    fetch('products.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            // Get the product elements from the XML
            const products = xmlDoc.getElementsByTagName('product');
            const orderDropdown = document.getElementById('orderDropdown');

            // Loop through each product and add it to the order dropdown
            for (let product of products) {
                const productName = product.getElementsByTagName('name')[0].textContent;
                const productCode = product.getAttribute('code');
                const option = document.createElement('option');
                option.value = productCode;
                option.textContent = `${productName} (${productCode})`;
                orderDropdown.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Error loading the XML file:', error);
        });

    // Toggle the contact form input fields based on the selected dropdown option
    const formTypeDropdown = document.getElementById('formTypeDropdown');
    formTypeDropdown.addEventListener('change', function () {
        const selectedValue = formTypeDropdown.value;
        const orderForm = document.getElementById('orderForm');
        const contactForm = document.getElementById('contactForm');

        if (selectedValue === 'order') {
            orderForm.style.display = 'block';
            contactForm.style.display = 'none';
        } else if (selectedValue === 'contact') {
            contactForm.style.display = 'block';
            orderForm.style.display = 'none';
        }
    });

    // Add the form submission event listeners for both forms
    const orderForm = document.getElementById('orderForm');
    const contactForm = document.getElementById('contactForm');

    // Order form submit handler
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        alert('Order placed successfully!');
        orderForm.reset(); // Reset the order form
    });

    // Contact form submit handler
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        alert('Your message has been sent successfully!');
        contactForm.reset(); // Reset the contact form
    });
});
