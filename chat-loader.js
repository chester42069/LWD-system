/**
 * LWD Chatbot Loader
 * This script injects the Chatbot HTML automatically.
 */

const chatbotUI = `
    <div id="chat-bubble" onclick="toggleChat()" title="Chat with LWD Assistant">
        <div class="bubble-icon-bg">
            <i class="fa-solid fa-comment-dots"></i>
        </div>
        <div class="pulse-ring"></div>
    </div>

    <div id="chat-window">
        <div class="chat-header">
            <div class="header-content">
                <div class="bot-avatar">
                    <img src="LWDLOGO.png" alt="LWD Assistant">
                    <span class="online-indicator"></span>
                </div>
                <div class="bot-info">
                    <p class="bot-name">LWD Assistant</p>
                    <p class="bot-status">Online • Ready to help</p>
                </div>
            </div>
            
            <div class="header-actions">
                <button class="clear-btn" onclick="clearChat()" title="Clear History">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class="close-chat" onclick="toggleChat()" title="Close Chat">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        
        <div id="chat-body" class="chat-body">
            <div class="msg bot">
                Hello! 🌊 I'm your LWD Assistant. How can I assist you with our services today?
            </div>
            <div id="typing-indicator" class="typing" style="display:none;">Assistant is typing...</div>
        </div>

        <div class="chat-footer">
            <div class="input-container">
                <input type="text" id="chat-input" placeholder="Ask a question..." onkeypress="handleKey(event)">
                <button class="send-btn" onclick="sendMessage()">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
`;

// Inject into the page
document.body.insertAdjacentHTML('beforeend', chatbotUI);
