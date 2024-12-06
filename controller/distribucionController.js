import distribucion from '../models/distribucion.js';

// Method GET: Get all providers
export async function getdistribucion(req, res) {
    try {
        const distribucions = await distribucion.find();
        res.status(200).json({ distribucions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching distribucion' });
    }
}

// Method GET: Get provider by ID
export async function getOnedistribucion(req, res) {
    const { id } = req.params;
    try {
        const distribucions = await distribucion.findById(id);
        if (!distribucions) return res.status(404).json({ message: 'distribucion not found' });
        res.status(200).json(distribucions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching distribucion' });
    }
}

// Method POST: Create a new provider
export async function postdistibucion(req, res) {
    const { name, contact_number, address, email, personal_phone, status } = req.body;
    let msg = 'distribucion created successfully';
    try {
        const newdistribucion = new distribucion({ name, contact_number, address, email, personal_phone, status });
        await newdistribucion.save();
        res.status(201).json(newdistribucion);
    } catch (error) {
        msg = 'Error creating distribucion';
        res.status(500).json({ message: msg });
    }
}

// Method PUT: Update a provider
export async function putdistribucion(req, res) {
    const { id } = req.params;
    const { name, contact_number, address, email, personal_phone, status } = req.body;
    let msg = 'distribucion updated successfully';
    try {
        const updateddistribucion = await distribucion.findByIdAndUpdate(
            id,
            { name, contact_number, address, email, personal_phone, status },
            { new: true }
        );
        if (!updateddistribucion) return res.status(404).json({ message: 'distribucion not found' });
        res.status(200).json(updateddistribucion);
    } catch (error) {
        msg = 'Error updating distribucion';
        res.status(500).json({ message: msg });
    }
}

// Method DELETE: Delete a provider
export async function deletedistribucon(req, res) {
    const { id } = req.params;
    let msg = 'distribucon deleted successfully';
    try {
        const deleteddistribucion = await distribucion.findByIdAndDelete(id);
        if (!deleteddistribucion) return res.status(404).json({ message: 'distribucion not found' });
        res.status(200).json({ message: msg });
    } catch (error) {
        msg = 'Error deleting distribucion';
        res.status(500).json({ message: msg });
    }
}
