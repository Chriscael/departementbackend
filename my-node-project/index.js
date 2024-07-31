import express from 'express';
import fetch from 'node-fetch'; // ESM syntax
import cors from 'cors'; // Import CORS package

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get('/api/proxy/*', async (req, res) => {
    const endpoint = req.params[0]; // Get the endpoint from the request
    const apiUrl = `https://backend-form-1-5hj5.onrender.com/${endpoint}`;
    try {
        const apiResponse = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${process.env.JWT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        if (!apiResponse.ok) throw new Error(`HTTP error! Status: ${apiResponse.status}`);

        const data = await apiResponse.json();
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));