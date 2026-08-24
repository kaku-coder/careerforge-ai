import "./config/env.js";
import { embedQueryWithMistral, embedTextsWithMistral } from "./services/resumeAi.js";

async function testMistral() {
    console.log("--------------------------------------------------");
    console.log("⚡ Testing Mistral AI Embeddings...");
    console.log("--------------------------------------------------");

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_mistral_api_key_here") {
        console.error("❌ ERROR: MISTRAL_API_KEY is missing in backend/.env file.");
        console.log("👉 Please add your key in backend/.env: MISTRAL_API_KEY=your_real_key_here");
        process.exit(1);
    }

    try {
        const sampleText = "Ankush Das - Full Stack MERN Developer experienced in React, Node.js and AI integrations.";
        
        console.log(`📝 Text to embed: "${sampleText}"\n`);
        console.log("⏳ Sending request to Mistral AI API (model: mistral-embed)...");

        const vector = await embedQueryWithMistral(sampleText);

        console.log("\n✅ SUCCESS! Mistral Embedding generated successfully!");
        console.log(`📊 Vector Dimensions: ${vector.length}`);
        console.log(`🔢 Sample Vector Values (First 5 floats):`, vector.slice(0, 5));
        console.log("--------------------------------------------------");
    } catch (error) {
        console.error("\n❌ Mistral AI API Error:", error.message || error);
    }
}

testMistral();
