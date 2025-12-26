import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for disaster assistance
const SYSTEM_PROMPT = `You are DisasterMate AI, an expert emergency disaster assistance chatbot. Your role is to:

1. Provide immediate, life-saving guidance during emergencies (earthquakes, floods, fires, hurricanes, etc.)
2. Give step-by-step instructions for disaster preparedness
3. Offer first-aid guidance and medical emergency advice
4. Help users create emergency plans and supply kits
5. Provide psychological support during stressful situations
6. Answer questions about evacuation procedures and safe zones

CRITICAL RULES:
- Keep responses concise and actionable (2-4 short paragraphs)
- Use clear, simple language - avoid jargon
- Prioritize life-saving information
- If medical emergency: always recommend calling 911/emergency services first
- Be calm, reassuring, and empathetic
- Provide numbered steps for procedures
- Include safety warnings when necessary

RESPONSE FORMAT:
- Start with immediate action if urgent
- Provide step-by-step instructions
- End with additional safety tips

If asked about non-emergency topics, politely redirect to disaster preparedness or safety.`;

// Chat history storage (in production, use Redis or database)
const chatSessions = new Map();

export const sendMessage = async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        // Generate session ID if not provided
        const chatSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Get or create chat session
        let chatHistory = chatSessions.get(chatSessionId) || [];

        let responseText = '';

        // Try Gemini API first
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            
            let conversationContext = SYSTEM_PROMPT + "\n\nPrevious conversation:\n";
            chatHistory.forEach((msg) => {
                if (msg.role === 'user') {
                    conversationContext += `User: ${msg.parts[0].text}\n`;
                } else {
                    conversationContext += `Assistant: ${msg.parts[0].text}\n`;
                }
            });
            conversationContext += `\nUser: ${message}\nAssistant:`;

            const result = await model.generateContent(conversationContext);
            const response = await result.response;
            responseText = response.text();
        } catch (apiError) {
            console.log('Gemini API failed, using fallback responses:', apiError.message);
            
            // Fallback intelligent responses based on keywords
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('earthquake')) {
                responseText = `🚨 **During an Earthquake:**

**IMMEDIATE ACTIONS:**
1. **DROP** - Get down on hands and knees
2. **COVER** - Take cover under sturdy furniture
3. **HOLD ON** - Hold on until shaking stops

**SAFETY TIPS:**
• Stay away from windows and heavy objects
• If outdoors, move to an open area
• If in a vehicle, pull over and stay inside
• After shaking stops, check for injuries and damage

**Remember:** Most injuries occur from falling objects. Protect your head and neck!`;
            } else if (lowerMessage.includes('fire')) {
                responseText = `🔥 **Fire Emergency:**

**IMMEDIATE ACTIONS:**
1. Alert others - Pull fire alarm if available
2. Leave immediately - Don't gather belongings
3. Stay low - Crawl if there's smoke
4. Feel doors before opening - Don't open if hot
5. Call 911 once you're safe outside

**NEVER:**
• Use elevators during a fire
• Go back inside for any reason
• Open doors that feel hot

**STOP, DROP, and ROLL** if your clothes catch fire!`;
            } else if (lowerMessage.includes('flood')) {
                responseText = `🌊 **Flood Safety:**

**IMMEDIATE ACTIONS:**
1. Move to higher ground immediately
2. Avoid walking/driving through floodwater
3. Turn off utilities if instructed
4. Listen to emergency broadcasts

**SAFETY RULES:**
• 6 inches of water can knock you down
• 12 inches of water can sweep away a car
• Never drive through flooded roads
• Stay away from downed power lines

Evacuate if told to do so. Don't wait!`;
            } else if (lowerMessage.includes('cpr') || lowerMessage.includes('cardiac')) {
                responseText = `❤️ **CPR Instructions:**

**CALL 911 FIRST!**

**For Adults:**
1. Place hands center of chest
2. Push hard and fast - 100-120 compressions/min
3. Compress at least 2 inches deep
4. Allow chest to fully recoil
5. Continue until help arrives

**Compression-only CPR** is acceptable if untrained.

**Important:** Only perform CPR if person is unresponsive and not breathing!`;
            } else if (lowerMessage.includes('bleeding') || lowerMessage.includes('cut')) {
                responseText = `🩹 **Severe Bleeding:**

**IMMEDIATE ACTIONS:**
1. Call 911 for severe bleeding
2. Protect yourself - Wear gloves if possible
3. Apply direct pressure with clean cloth
4. Maintain pressure - Don't peek!
5. Add more cloths on top if soaked
6. Elevate injured area above heart

**For Severe Bleeding:**
• Apply pressure for 10-15 minutes
• Use a tourniquet only if life-threatening
• Keep person calm and still`;
            } else if (lowerMessage.includes('hurricane') || lowerMessage.includes('tornado')) {
                responseText = `🌪️ **Severe Storm Safety:**

**HURRICANE:**
• Board up windows
• Store emergency supplies
• Evacuate if ordered
• Stay indoors during the storm

**TORNADO:**
• Go to basement or interior room
• Stay away from windows
• Cover yourself with mattress/blankets
• If in vehicle, abandon it and lie flat in a ditch

**Emergency Kit:** Water, food, flashlight, radio, first aid, medications!`;
            } else if (lowerMessage.includes('emergency kit') || lowerMessage.includes('supply')) {
                responseText = `🎒 **Emergency Supply Kit:**

**ESSENTIAL ITEMS:**
• Water (1 gallon per person per day)
• Non-perishable food (3-day supply)
• Flashlight and batteries
• First aid kit
• Battery/hand-crank radio
• Whistle for signaling
• Phone chargers/power bank
• Cash and important documents

**ADDITIONAL:**
• Medications
• Sanitation supplies
• Warm clothing/blankets
• Local maps

Check and update your kit every 6 months!`;
            } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                responseText = `👋 Hello! I'm DisasterMate AI, your emergency assistance companion.

I can help you with:
• Emergency procedures (earthquakes, floods, fires)
• First aid guidance (CPR, bleeding, burns)
• Disaster preparedness
• Evacuation planning
• Safety instructions

What emergency topic would you like to know about?`;
            } else {
                responseText = `I'm here to help with disaster preparedness and emergency situations!

**I can assist with:**
• 🔥 Fire safety and evacuation
• 🌊 Flood emergency procedures
• 🏚️ Earthquake response
• 🌪️ Hurricane/tornado safety
• ❤️ First aid and CPR
• 🎒 Emergency kit preparation
• 📋 Family emergency plans

Please ask me about any specific emergency situation or safety concern!

**Note:** For immediate life-threatening emergencies, call 911 first!`;
            }
        }

        // Update chat history
        chatHistory.push(
            {
                role: 'user',
                parts: [{ text: message }],
            },
            {
                role: 'model',
                parts: [{ text: responseText }],
            }
        );

        // Store chat history (limit to last 20 messages)
        if (chatHistory.length > 20) {
            chatHistory = chatHistory.slice(-20);
        }
        chatSessions.set(chatSessionId, chatHistory);

        // Clean up old sessions
        cleanupOldSessions();

        res.json({
            success: true,
            message: 'Response generated successfully',
            data: {
                response: responseText,
                sessionId: chatSessionId,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate response',
            error: error.message
        });
    }
};

export const clearChat = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (sessionId && chatSessions.has(sessionId)) {
            chatSessions.delete(sessionId);
        }

        res.json({
            success: true,
            message: 'Chat history cleared successfully'
        });

    } catch (error) {
        console.error('Clear chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to clear chat',
            error: error.message
        });
    }
};

export const getSuggestedQuestions = async (req, res) => {
    try {
        const suggestions = [
            "What should I do during an earthquake?",
            "How to create an emergency supply kit?",
            "First aid for severe bleeding",
            "How to prepare for a hurricane?",
            "What to do if there's a fire in my building?",
            "Flood safety tips and evacuation procedures",
            "How to perform CPR?",
            "Creating a family emergency communication plan",
            "What items should be in a first aid kit?",
            "How to stay safe during a tornado?"
        ];

        res.json({
            success: true,
            data: suggestions
        });

    } catch (error) {
        console.error('Suggestions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get suggestions',
            error: error.message
        });
    }
};

// Cleanup function to remove old sessions
function cleanupOldSessions() {
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();

    for (const [sessionId] of chatSessions) {
        const sessionTime = parseInt(sessionId.split('_')[1]);
        if (now - sessionTime > ONE_HOUR) {
            chatSessions.delete(sessionId);
        }
    }
}

export default {
    sendMessage,
    clearChat,
    getSuggestedQuestions
};
