const url = 'http://localhost:3001/api/provider';

// Function to list all providers
const listProviders = async () => {
    const content = document.getElementById('providersTableBody');
    let response = '';
    
    try {
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        
        const data = await res.json();
        const providers = data.providers; // Array of providers
        
        providers.forEach((provider) => {
            response += `<tr>
                            <td>${provider.name}</td>
                            <td>${provider.contact_number}</td>
                            <td>${provider.address}</td>
                            <td>${provider.email}</td>
                            <td>${provider.personal_phone}</td>
                            <td>${provider.status}</td>
                            <td>
                                <a href='#' onclick="fillProviderForm('${provider._id}')">Edit</a> | 
                                <a href='#' onclick="deleteProvider('${provider._id}')">Delete</a>
                            </td>
                         </tr>`;
        });

        content.innerHTML = response;
    } catch (error) {
        console.error('Error fetching providers:', error);
    }
};

// Function to create a new provider
const createProvider = async () => {
    const newProvider = {
        name: document.getElementById('name').value,
        contact_number: document.getElementById('contactNumber').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        personal_phone: document.getElementById('personalPhone').value,
        status: document.getElementById('status').value,
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newProvider),
            headers: { "Content-Type": "application/json" }
        });
        const result = await res.json();
        alert(result.message || 'Provider created successfully');
        listProviders(); // Reload the list
        resetForm(); // Reset form after creating
    } catch (error) {
        console.error('Error creating provider:', error);
    }
};

// Function to fill the form for editing
const fillProviderForm = async (id) => {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: { "Content-Type": "application/json" }
        });
        const provider = await res.json();
        
        // Fill form with the existing provider data
        document.getElementById('name').value = provider.name;
        document.getElementById('contactNumber').value = provider.contact_number;
        document.getElementById('address').value = provider.address;
        document.getElementById('email').value = provider.email;
        document.getElementById('personalPhone').value = provider.personal_phone;
        document.getElementById('status').value = provider.status;

        // Update button for saving changes
        document.getElementById('submitButton').onclick = () => updateProvider(id);
    } catch (error) {
        console.error('Error fetching provider details:', error);
    }
};

// Function to update a provider
const updateProvider = async (id) => {
    const updatedProvider = {
        name: document.getElementById('name').value,
        contact_number: document.getElementById('contactNumber').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        personal_phone: document.getElementById('personalPhone').value,
        status: document.getElementById('status').value,
    };

    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(updatedProvider),
            headers: { "Content-Type": "application/json" }
        });
        const result = await res.json();
        alert(result.message || 'Provider updated successfully');
        listProviders(); // Reload the list
        resetForm(); // Reset form after updating
    } catch (error) {
        console.error('Error updating provider:', error);
    }
};

// Function to delete a provider
const deleteProvider = async (id) => {
    if (confirm('Are you sure you want to delete this provider?')) {
        try {
            const res = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: { "Content-Type": "application/json" }
            });
            const result = await res.json();
            alert(result.message || 'Provider deleted successfully');
            listProviders(); // Reload the list
        } catch (error) {
            console.error('Error deleting provider:', error);
        }
    }
};

// Function to reset the form
const resetForm = () => {
    document.getElementById('providerForm').reset();
    document.getElementById('submitButton').onclick = createProvider; // Reset the button action
};
