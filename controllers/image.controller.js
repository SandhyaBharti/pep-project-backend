import { GoogleGenAI } from "@google/genai";

const genai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});


const images = [
    {
        id: 1,
        userId: 1,
        url: "https://images.unsplash.com/photo-1769089220479-5389dc5d2268?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
        prompt: "temple",
        alt: "temple",

    },
];

export const getAllImages = (req, res) => {

    try {
        const userId = req.userId;

        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "Please login again",
            });
        }

        const filtered = images.filter((image) => image.userId === Number(userId))

        // TODO: get images from database
        res.status(200).json({
            success: true,
            data: filtered,
            message: "Images fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error fetching all images: ${error.message}`,
        });
    }
}

export const generateImages = async (req, res) => {
    try {
        const { prompt } = req.body;

        const userId = req.userId;

        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "Please login again",
            });
        }

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        const response = await genai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: prompt.trim()
        });

        const imageParts = response?.candidates[0]?.content?.parts

        const inlineData = imageParts?.find((part) => part?.inlineData?.data);
        if (!inlineData) {
            return res.status(500).json({
                success: false,
                message: "Failed to generate image",
            });
        }

        const data = inlineData?.inlineData?.data;

        const imageUrl = `data:image/png;base64,${data}`;

        const image = {
            id: Date.now(),
            userId: userId,
            prompt: prompt.trim(),
            alt: prompt.trim().slice(0, 10),
            url: imageUrl,
        }
        images.push(image);   // TODO: save image to database



        res.status(201).json({
            success: true,
            data: image,
            message: "Images generated successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error generating images: ${error.message}`,
        });
    }
}

