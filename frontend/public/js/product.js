const url = 'http://localhost:3001/api/product';

// Función para listar todos los productos
const listProducts = async () => {
    const content = document.getElementById('productsTableBody');
    let response = '';

    try {
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const data = await res.json();
        const products = data.products; // Array de productos

        products.forEach((product) => {
            response += `<tr>
                            <td>${product.name}</td>
                            <td>${product.category}</td>
                            <td>${product.price}</td>
                            <td>${product.stock}</td>
                            <td>${product.minimumStock}</td>
                            <td>
                                <a href='#' onclick="fillProductForm('${product._id}')">Edit</a> | 
                                <a href='#' onclick="deleteProduct('${product._id}')">Delete</a>
                            </td>
                         </tr>`;
        });

        content.innerHTML = response;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Función para crear un nuevo producto
const createProduct = async () => {
    const newProduct = {
        name: document.getElementById('createName').value,
        category: document.getElementById('createCategory').value,
        price: document.getElementById('createPrice').value,
        stock: document.getElementById('createStock').value,
        minimumStock: document.getElementById('createMinimumStock').value,
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newProduct),
            headers: { "Content-Type": "application/json" }
        });
        const result = await res.json();
        alert(result.message || 'Product created successfully');
        listProducts(); // Recargar la lista
        resetForm(); // Reiniciar el formulario después de crear
    } catch (error) {
        console.error('Error creating product:', error);
    }
};

// Función para rellenar el formulario de edición
const fillProductForm = async (id) => {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: { "Content-Type": "application/json" }
        });
        const product = await res.json();

        // Llenar el formulario con los datos existentes del producto
        document.getElementById('createName').value = product.name;
        document.getElementById('createCategory').value = product.category;
        document.getElementById('createPrice').value = product.price;
        document.getElementById('createStock').value = product.stock;
        document.getElementById('createMinimumStock').value = product.minimumStock;

        // Cambiar la acción del botón para actualizar
        document.getElementById('submitButton').onclick = () => updateProduct(id);
        
        // Mostrar la sección de edición
        document.getElementById('formTitle').style.display = 'none';
        document.getElementById('editFormTitle').style.display = 'block';
        document.getElementById('editProductForm').style.display = 'block';
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

// Función para actualizar un producto
const updateProduct = async (id) => {
    const updatedProduct = {
        name: document.getElementById('createName').value,
        category: document.getElementById('createCategory').value,
        price: document.getElementById('createPrice').value,
        stock: document.getElementById('createStock').value,
        minimumStock: document.getElementById('createMinimumStock').value,
    };

    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(updatedProduct),
            headers: { "Content-Type": "application/json" }
        });
        const result = await res.json();
        alert(result.message || 'Product updated successfully');
        listProducts(); // Recargar la lista
        resetForm(); // Reiniciar el formulario después de actualizar
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

// Función para eliminar un producto
const deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const res = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: { "Content-Type": "application/json" }
            });
            const result = await res.json();
            alert(result.message || 'Product deleted successfully');
            listProducts(); // Recargar la lista
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
};

// Función para reiniciar el formulario
const resetForm = () => {
    document.getElementById('productForm').reset();
    document.getElementById('submitButton').onclick = createProduct; // Reiniciar la acción del botón
};
