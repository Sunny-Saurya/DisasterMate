import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModels() {
    console.log('Testing Gemini API...\n');
    console.log('API Key:', process.env.GEMINI_API_KEY ? 'Found' : 'Missing');
    
    const modelsToTry = [
        'gemini-pro',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'models/gemini-pro',
        'models/gemini-1.5-pro',
        'models/gemini-1.5-flash'
    ];
    
    for (const modelName of modelsToTry) {
        try {
            console.log(`\nTrying model: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Hello');
            const response = await result.response;
            const text = response.text();
            console.log(`✅ SUCCESS with ${modelName}`);
            console.log(`Response: ${text.substring(0, 50)}...`);
            break;
        } catch (error) {
            console.log(`❌ FAILED: ${error.message}`);
        }
    }
}

testModels();
