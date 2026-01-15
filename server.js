import fs from "fs";
import path from "path";
import express from "express";
import axios from "axios";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const data_File = path.join(__dirname, "data", "products.json");
const favoritesFilePath = path.join(__dirname, "data", "favorites.json");

app.use(express.json());
app.use(express.static("public"));

export const fetchAndSaveProducts = async () => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        fs.writeFileSync(dataFile, JSON.stringify(response.data, null, 2));
        console.log("Products data fetched and saved.");
    } catch (error) {
        console.error("Error fetching or saving products:", error);
    }
};

const dataDir = path.join(__dirname, "data");

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

if (!fs.existsSync(data_File)) {
    fs.writeFileSync(data_File, "");
}

const isFileEmpty = (filePath) => {
    try {
        const rawData = fs.readFileSync(filePath, "utf-8");
        return !rawData.trim(); // Check if file is empty or contains only whitespace
    } catch (error) {
        console.error("Error reading file:", error);
        return true; // Assume file is empty or missing on error
    }
};

const emptyFile = isFileEmpty(data_File);
emptyFile && fetchAndSaveProducts(); // Fetch and save products if file is empty

// endpoint to get all products
app.get("/api/products", (req, res) => {
    try {
    const products = JSON.parse(fs.readFileSync(data_File, "utf-8"));
    const categories = req.query.category;
    if (categories) {
        const filtered = products.filter(p => p.category === categories);
        return res.json(filtered);
    }
    res.json(products);
    } catch (error) {
        res.status(404).json({ message: "Failed to read products data" });
    }  
});

app.get("/api/products/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(data_File, "utf-8"));
    const product = data.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

// endpoint to get unique categories
app.get("/api/categories", (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(data_File, "utf-8"));
        const categories = products.map(p => p.category);
        const uniqueCategories = [...new Set(categories)];
        res.json(uniqueCategories);
        if (uniqueCategories.length > 0) {
            res.status(200).json(uniqueCategories);
        } else {
            res.status(404).json({ message: "No categories found" });
        }
    } catch (error) {
        res.status(404).json({ message: "Failed to read products data" });
    }
});

// endpoint to get favorite products by userId
app.get("/api/favorites/:userId", (req, res) => {
    try {
        const isEmptyFav = isFileEmpty(favoritesFilePath);
        if (isEmptyFav) {
            const favoriteProductsData = JSON.parse(
                fs.readFileSync(favoritesFilePath, "utf-8")
            );
            res.json(favoriteProductsData);
        } else {
            res.status(404).json({ message: "No favorite products found" });
        }
    } catch (error) {
        res.status(404).json({ message: "Failed to read products data" });
    }
})



app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server töötab: http://localhost:${PORT}`);
});