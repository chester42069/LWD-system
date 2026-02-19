/* =========================================
   LWD Chatbot Logic
   ========================================= */

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('active');
    
    if (chatWindow.classList.contains('active')) {
        setTimeout(() => {
            document.getElementById('chat-input').focus();
        }, 300);
    }
}

function handleKey(event) {
    if (event.key === 'Enter') sendMessage();
}

// FIXED: This function now hides the suggestion box immediately
function sendSuggestion(text) {
    const input = document.getElementById('chat-input');
    const suggestionBox = document.getElementById('suggestion-box');
    
    input.value = text;
    sendMessage();
    
    // Hide the suggestions so they don't stay in the chat history view
    if (suggestionBox) {
        suggestionBox.style.display = 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const body = document.getElementById('chat-body');
    const typing = document.getElementById('typing-indicator');
    const userText = input.value.trim();

    if (userText === "") return;

    // Add User Message
    body.insertAdjacentHTML('beforeend', `<div class="msg user">${userText}</div>`);
    input.value = "";
    
    // Scroll to bottom
    body.scrollTop = body.scrollHeight;

    // Show Typing Indicator
    if (typing) {
        typing.style.display = "block";
        body.appendChild(typing); 
        body.scrollTop = body.scrollHeight;
    }

    setTimeout(() => {
        if (typing) typing.style.display = "none";
        const response = getBotResponse(userText.toLowerCase());
        body.insertAdjacentHTML('beforeend', `<div class="msg bot">${response}</div>`);
        body.scrollTop = body.scrollHeight;
    }, 800);
}

function clearChat() {
    const body = document.getElementById('chat-body');
    // Resetting HTML and RE-SHOWING the suggestion box
    body.innerHTML = `
        <div class="msg bot">
            Hello! 🌊 I'm your LWD Assistant. How can I assist you with our services today?
        </div>
        <div class="suggestions" id="suggestion-box" style="display: flex;">
            <button onclick="sendSuggestion('Office hours')">Office Hours</button>
            <button onclick="sendSuggestion('Report complaint')">Report Complaint</button>
            <button onclick="sendSuggestion('Water analysis requirements')">Water Analysis</button>
            <button onclick="sendSuggestion('Job vacancies')">Job Vacancies</button>
            <button onclick="sendSuggestion('Office location')">Office Location</button>
        </div>
        <div id="typing-indicator" class="typing" style="display:none;">Assistant is typing...</div>
    `;
}

function getBotResponse(input) {
    // --- NEW FEATURE: HIGH BILL TROUBLESHOOTING ---
    if (input.includes("high bill") || input.includes("expensive") || input.includes("increase") || input.includes("bill suddenly")) {
        return "<b>Why is my bill suddenly high?</b><br>Possible reasons include:<br>• <b>Leaks:</b> Check toilets, faucets, and underground pipes.<br>• <b>Meter Spin Test:</b> Close all taps; if the meter still turns, there's a leak.<br>• <b>Fees:</b> Your bill includes a <i>Septage Fee</i> and <i>Environmental Fee</i>.<br>Would you like the 'High Bill Checklist'?";
    }

    // --- NEW FEATURE: WATER QUALITY (BROWN WATER) ---
    if (input.includes("brown") || input.includes("dirty") || input.includes("yellow") || input.includes("color")) {
        return "<b>What to do if water is brownish:</b><br>1. This usually happens after repairs (like the Umali Station upgrade).<br>2. <b>Flush your pipes:</b> Let the water run for 1-2 minutes until clear.<br>3. If it persists, call our maintenance team at (049) 536-0331.";
    }

    // --- NEW FEATURE: NEW CONNECTION ROADMAP ---
    if (input.includes("new connection") || input.includes("apply") || input.includes("install") || input.includes("line")) {
        return "<b>4-Step New Connection Roadmap:</b><br>1. <b>Application:</b> Submit Brgy. Clearance & Valid ID at our office.<br>2. <b>Inspection:</b> A technician will visit your site to assess the line.<br>3. <b>Payment:</b> Pay the installation and meter fees.<br>4. <b>Installation:</b> Our team will install your connection within the scheduled timeframe.";
    }

    // --- 1. GREETINGS & IDENTITY ---
    if (input.includes("hi") || input.includes("hello") || input.includes("good morning") || input.includes("hey") || input.includes("hola") || input.includes("help") || input.includes("good afternoon") || input.includes("good evening") || input.includes("anyone there") || input.includes("start") || input.includes("menu") || input.includes("what can you do")) {
        return "Hello! I am the LWD Assistant. I can help you with: <br>• Reporting Complaints<br>• Water Analysis Requirements<br>• Job Vacancies<br>• Office Hours & History<br>What can I help you with today?";
    }

    // --- 2. OFFICE HOURS & CONTACT (Now with No Noon Break detail) ---
    if (input.includes("hours") || input.includes("time") || input.includes("open") || input.includes("schedule") || input.includes("operating") || input.includes("closing") || input.includes("saturday") || input.includes("sunday") || input.includes("weekend") || input.includes("noon break")) {
        return "We are open <b>Monday to Friday, 8:00 AM to 5:00 PM</b>. We observe a <b>'No Noon Break'</b> policy. We are closed on holidays.";
    }
    
    // ... rest of your existing logic ...
    if (input.includes("location") || input.includes("where") || input.includes("address") || input.includes("office") || input.includes("place") || input.includes("map") || input.includes("directions") || input.includes("way to") || input.includes("branch") || input.includes("main")) {
        return "Our main office is located at <b>5524 Manila South Road, Brgy. Maahas, Los Baños, Laguna, 4030</b>.";
    }
    if (input.includes("contact") || input.includes("phone") || input.includes("number") || input.includes("email") || input.includes("call") || input.includes("mobile") || input.includes("landline") || input.includes("ogm") || input.includes("web") || input.includes("site")) {
        return "You can reach us at:<br>• Phone: <b>(049) 536-0661</b><br>• Email: <b>ogm@laguna-water.com</b><br>• Web: www.laguna-water.com";
    }
    if (input.includes("complaint") || input.includes("leak") || input.includes("clogged") || input.includes("no water") || input.includes("pressure") || input.includes("broken pipe") || input.includes("burst") || input.includes("dirty water") || input.includes("smelly") || input.includes("color") || input.includes("report issue") || input.includes("problem")) {
        return "<b>Complaints Handling:</b><br>1. <b>Report via Phone:</b> Call <b>(049) 536-0331</b><br>2. <b>Walk-in:</b> Visit us at <b>5524 Manila S Rd, Los Baños, Laguna</b>.<br>3. <b>Resolution Times:</b><br>• No Water/Low Pressure: 1-20 days depending on complexity.<br>• Leaking pipes/clogged meter: 8-16 hours.<br>• Restoration Works: 8 hours.<br>• Rehabilitation: 2 days.";
    }
    if (input.includes("analysis") || input.includes("test water") || input.includes("quality") || input.includes("potable") || input.includes("laboratory") || input.includes("bacteriological") || input.includes("physical test") || input.includes("chemical test") || input.includes("drinking water") || input.includes("safety test") || input.includes("sample")) {
        return "<b>Request for Water Analysis:</b><br>• <b>Requirements:</b> Letter to General Manager, Service Request Form, and a Water Sample acquired within the last 24 hours.<br>• <b>Timeline:</b> Total processing takes <b>2 days and 13 minutes</b>.";
    }
    if (input.includes("request for information") || input.includes("query") || input.includes("ask question") || input.includes("foi") || input.includes("freedom of information") || input.includes("document") || input.includes("data") || input.includes("stat") || input.includes("record") || input.includes("letter") || input.includes("official inquiry")) {
        return "For official information requests, submit a letter to the LWD Office. We acknowledge letters within 5 minutes, and the full feedback loop takes <b>2 days and 13 minutes</b>.";
    }
    if (input.includes("job") || input.includes("hiring") || input.includes("vacancy") || input.includes("work at lwd") || input.includes("career") || input.includes("employment") || input.includes("apply") || input.includes("application") || input.includes("resume") || input.includes("cv") || input.includes("position") || input.includes("salary")) {
        return "<b>Current Vacancies:</b><br><br><b>1. SR. WATER MAINTENANCE MAN B (SG 10)</b><br>• Salary: Php 25,586.00<br>• Requirements: Elementary School Graduate, 8 hrs relevant training, 2 yrs relevant experience.<br>• Deadline: <b>November 15, 2025</b><br>• Apply to: ogm@laguna-water.com<br><br><b>2. PRIVATE SECRETARY C (SG 11)</b><br>• Salary: Php 31,705.00<br>• Requirements: Completion of 2 years studies in college (prior 2018) OR Senior High School Graduate (starting 2016).<br>• Deadline: <b>February 15, 2026</b><br>• Apply to: ogm@laguna-water.com";
    }
    if (input.includes("history") || input.includes("background") || input.includes("started") || input.includes("legacy") || input.includes("foundation") || input.includes("origin") || input.includes("old") || input.includes("creation") || input.includes("past") || input.includes("annex")) {
        return "LWD started in the 1920s as Los Baños Waterworks. It was renamed Los Baños Water District in 1977 and later Laguna Water District after annexing Bay and Calauan.";
    }
    if (input.includes("larc") || input.includes("aquatech") || input.includes("partnership") || input.includes("mwpv") || input.includes("manila water") || input.includes("private partner") || input.includes("operator") || input.includes("contract") || input.includes("monitoring") || input.includes("ventures")) {
        return "LWD is in a Public-Private Partnership. <b>Laguna Aquatech</b> (formerly LARC) is managed by Manila Water Philippine Ventures (MWPV) since July 2024. They handle operations, while LWD monitors the contract.";
    }
    if (input.includes("how many") || input.includes("households") || input.includes("served") || input.includes("connections") || input.includes("stats") || input.includes("coverage") || input.includes("how big") || input.includes("customers") || input.includes("population") || input.includes("personnel")) {
        return "As of Sept 30, 2025, LWD is a Category A water district serving approximately <b>55,572 households</b> with 20 personnel.";
    }
    if (input.includes("vision") || input.includes("mission") || input.includes("pledge") || input.includes("commitment") || input.includes("goal") || input.includes("objective") || input.includes("aim") || input.includes("purpose") || input.includes("values") || input.includes("promise") || input.includes("citizen charter")) {
        return "<b>Our Mandate:</b><br><b>Vision:</b> Render best service at least cost.<br><b>Mission:</b> Efficient, safe, and potable water.<br><b>Service Pledge:</b> Integrity, 24/7 response, and listening to feedback.";
    }
    if (input.includes("feedback") || input.includes("suggestion") || input.includes("complain") || input.includes("rate") || input.includes("review") || input.includes("box") || input.includes("arta") || input.includes("pcc") || input.includes("ccb") || input.includes("government hotline") || input.includes("8888") || input.includes("report staff")) {
        return "<b>Feedback:</b> Use our box at the Public Assistance Desk (3-day response).<br><b>External Hotlines:</b><br>• ARTA: 8478-5093<br>• PCC: 8888<br>• CCB: 0908-881-6565 (SMS)";
    }
    if (input.includes("manager") || input.includes("joel lapis") || input.includes("gm") || input.includes("head") || input.includes("leader") || input.includes("boss") || input.includes("director") || input.includes("board") || input.includes("officer") || input.includes("in charge") || input.includes("who runs")) {
        return "LWD is headed by <b>Engr. Joel M. Lapis</b>, General Manager.";
    }
    if (input.includes("employee") || input.includes("internal") || input.includes("leave") || input.includes("service record") || input.includes("coe") || input.includes("benefits") || input.includes("payslip") || input.includes("human resource") || input.includes("hr") || input.includes("personnel only") || input.includes("certificate")) {
        return "Internal services for LWD employees (Leave, Service Records, COE, etc.) are processed by the HR Section. Processing times range from 8 minutes to 2 days.";
    }

    return "I'm sorry, I don't have information on that specific topic. You can ask about <b>complaints, water testing, office hours, location, or job openings</b>. For complex issues, please call (049) 536-0661.";
}
