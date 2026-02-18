/* =========================================
   LWD Chatbot Logic
   ========================================= */

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    
    // Toggle the 'active' class which triggers the CSS slide-up animation
    chatWindow.classList.toggle('active');

    // UX: Focus the input field when opening
    if (chatWindow.classList.contains('active')) {
        setTimeout(() => {
            const input = document.getElementById('chat-input');
            if (input) input.focus();
        }, 300); // Wait for animation to finish slightly
    }
}

function handleKey(event) {
    if (event.key === 'Enter') sendMessage();
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const body = document.getElementById('chat-body');
    const typing = document.getElementById('typing-indicator');
    const userText = input.value.trim();

    if (userText === "") return;

    // 1. Add User Message
    body.innerHTML += `<div class="msg user">${userText}</div>`;
    input.value = "";
    
    // Auto-scroll to bottom
    body.scrollTop = body.scrollHeight;

    // 2. Show Typing Indicator
    if (typing) {
        typing.style.display = "block";
        body.scrollTop = body.scrollHeight;
    }

    // 3. Bot Response with Delay
    setTimeout(() => {
        if (typing) typing.style.display = "none";
        
        const response = getBotResponse(userText.toLowerCase());
        body.innerHTML += `<div class="msg bot">${response}</div>`;
        
        // Auto-scroll to bottom again
        body.scrollTop = body.scrollHeight;
    }, 1200); // 1.2 second delay for realism
}

function clearChat() {
    const body = document.getElementById('chat-body');
    // Reset to initial state
    body.innerHTML = `
        <div class="msg bot">
            Hello! 🌊 I'm your LWD Assistant. How can I assist you with our services today?
        </div>
        <div id="typing-indicator" class="typing" style="display:none;">Assistant is typing...</div>
    `;
}

/* --- BOT BRAIN (Your Content) --- */
function getBotResponse(input) {
    // --- 1. GREETINGS & IDENTITY ---
    if (input.includes("hi") || input.includes("hello") || input.includes("good morning") || input.includes("hey") || input.includes("hola")) {
        return "Hello! I am the LWD Assistant. I can help you with: <br>• Reporting Complaints<br>• Water Analysis Requirements<br>• Job Vacancies<br>• Office Hours & History<br>What can I help you with today?";
    }

    // --- 2. OFFICE HOURS & CONTACT ---
    if (input.includes("hours") || input.includes("time") || input.includes("open") || input.includes("schedule")) {
        return "We are open <b>Monday to Friday, 8:00 AM to 5:00 PM</b>. We observe a 'No Noon Break' policy. We are closed on holidays.";
    }
    if (input.includes("location") || input.includes("where") || input.includes("address") || input.includes("office") || input.includes("place")) {
        return "Our main office is located at <b>5524 Manila South Road, Brgy. Maahas, Los Baños, Laguna, 4030</b>.";
    }
    if (input.includes("contact") || input.includes("phone") || input.includes("number") || input.includes("email")) {
        return "You can reach us at:<br>• Phone: <b>(049) 536-0661</b><br>• Email: <b>ogm@laguna-water.com</b><br>• Web: www.laguna-water.com";
    }

    // --- 3. COMPLAINTS HANDLING ---
    if (input.includes("complaint") || input.includes("leak") || input.includes("clogged") || input.includes("no water") || input.includes("pressure")) {
        return "<b>Complaints Handling:</b><br>1. Report via phone or walk-in (15 mins processing).<br>2. <b>Resolution Times:</b><br>• No Water/Low Pressure: 1-20 days depending on complexity.<br>• Leaking pipes/clogged meter: 8-16 hours.<br>• Restoration Works: 8 hours.<br>• Rehabilitation: 2 days.";
    }

    // --- 4. WATER ANALYSIS ---
    if (input.includes("analysis") || input.includes("test water") || input.includes("quality") || input.includes("potable")) {
        return "<b>Request for Water Analysis:</b><br>• <b>Requirements:</b> Letter to General Manager, Service Request Form, and a Water Sample acquired within the last 24 hours.<br>• <b>Timeline:</b> Total processing takes <b>2 days and 13 minutes</b>.";
    }

    // --- 5. INFORMATION & QUERIES ---
    if (input.includes("request for information") || input.includes("query") || input.includes("ask question")) {
        return "For official information requests, submit a letter to the LWD Office. We acknowledge letters within 5 minutes, and the full feedback loop takes <b>2 days and 13 minutes</b>.";
    }

    // --- 6. CAREERS & RECRUITMENT ---
    if (input.includes("job") || input.includes("hiring") || input.includes("vacancy") || input.includes("work at lwd")) {
        return "<b>Current Vacancy:</b><br>• Position: <b>Sr. Water Maintenance Man B</b> (SG 10)<br>• Monthly Salary: <b>P25,586.00</b><br>• Requirements: Elementary School Graduate, 8 hrs relevant training, 2 yrs experience.<br>• Deadline: <b>November 15, 2025</b>. Apply to ogm@laguna-water.com.";
    }

    // --- 7. HISTORY & PARTNERSHIP ---
    if (input.includes("history") || input.includes("background") || input.includes("started")) {
        return "LWD started in the 1920s as Los Baños Waterworks. It was renamed Los Baños Water District in 1977 and later Laguna Water District after annexing Bay and Calauan.";
    }
    if (input.includes("larc") || input.includes("aquatech") || input.includes("partnership") || input.includes("mwpv")) {
        return "LWD is in a Public-Private Partnership. <b>Laguna Aquatech</b> (formerly LARC) is managed by Manila Water Philippine Ventures (MWPV) since July 2024. They handle operations, while LWD monitors the contract.";
    }
    if (input.includes("how many") || input.includes("households") || input.includes("served")) {
        return "As of Sept 30, 2025, LWD is a Category A water district serving approximately <b>55,572 households</b> with 20 personnel.";
    }

    // --- 8. MISSION, VISION, MANDATE ---
    if (input.includes("vision")) {
        return "<b>Vision:</b> To render the best service at the least cost that will sustain and support growth in an environment-conscious organization.";
    }
    if (input.includes("mission")) {
        return "<b>Mission:</b> To provide efficient, adequate, safe and potable water to our constituents in a viable and business-like manner.";
    }
    if (input.includes("pledge") || input.includes("commitment")) {
        return "Our <b>Service Pledge</b> includes working with integrity, listening to feedback, keeping you informed, and responding to requests 24/7.";
    }

    // --- 9. FEEDBACK & COMPLAINTS MECHANISM ---
    if (input.includes("feedback") || input.includes("suggestion")) {
        return "You can drop feedback in our designated box at the Public Assistance Desk. Feedback requiring answers will be processed within <b>3 days</b>.";
    }
    if (input.includes("arta") || input.includes("pcc") || input.includes("ccb")) {
        return "For external complaints, you may contact:<br>• ARTA: 8478-5093<br>• PCC: 8888<br>• CCB: 0908-881-6565 (SMS)";
    }

    // --- 10. LEADERSHIP ---
    if (input.includes("manager") || input.includes("joel lapis") || input.includes("gm")|| input.includes("head") || input.includes("leader")) {
        return "LWD is headed by <b>Engr. Joel M. Lapis</b>, General Manager.";
    }

    // --- 11. INTERNAL SERVICES ---
    if (input.includes("employee") || input.includes("internal") || input.includes("leave") || input.includes("service record")) {
        return "Internal services for LWD employees (Leave, Service Records, COE, etc.) are processed by the HR Section. Processing times range from 8 minutes to 2 days.";
    }
    
    // --- LWD vs LARC DIFFERENCE ---
    if (input.includes("difference") || (input.includes("lwd") || input.includes("larc") || input.includes("aquatech"))) {
        return `<b>Difference between LWD and Laguna Aquatech (LARC):</b><br><br>
                • <b>LWD (Laguna Water District):</b> The government-owned agency that owns the assets and acts as the <b>Contract Monitoring Unit (CMU)</b>.<br><br>
                • <b>Laguna Aquatech (formerly LARC):</b> The <b>Private Partner/Operator</b>. They handle the actual water distribution, billing, and maintenance.`;
    }

    // DEFAULT RESPONSE
    return "I'm sorry, I don't have information on that specific topic. You can ask about <b>complaints, water testing, office hours, location, or job openings</b>. For complex issues, please call (049) 536-0661.";
}
