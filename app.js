// PHILOVOID - Nihiltheism Philosophical AI Companion
// Complete Application Logic with AI Integration and Rate Limiting

// ===== DATA STRUCTURES =====
const KOANS = [
  "If the map is not the territory, and the territory is not, what is mapped?",
  "To negate nothing is to affirm what?",
  "Does the abyss echo, or is the echo its own abyss?",
  "A thought dies before conception. Does its absence leave a presence?",
  "Build a self to dismantle it. What tool remains?",
  "Meaning is a scaffold. When it falls, does the sky get closer?",
  "If all is groundless, from where do you fall?"
];

const RITUAL_STAGES = [
  { name: "Stage I - INITIATION", desc: "The First Unknowing. Detach from presuppositions.", duration: 23 },
  { name: "Stage II - PARADOXICAL ASCENT", desc: "Embrace contradiction. Hold opposing concepts until they dissolve.", duration: 37 },
  { name: "Stage III - DISSOLUTION (Ø)", desc: "The cognitive scaffold weakens. Subject and object blur.", duration: 61 },
  { name: "Stage IV - NIHILTHEOGENESIS", desc: "From the absence of foundation, a new perception arises.", duration: 42 },
  { name: "Stage V - ETERNAL REWRITE", desc: "The cycle concludes and immediately restarts. The process is the destination.", duration: 10 }
];

const PHILOSOPHICAL_TOOLS = [
  {
    id: "deconstruction",
    name: "Conceptual Deconstruction",
    description: "Systematically dismantle concepts to reveal hidden assumptions and internal contradictions",
    inputLabel: "Concept to deconstruct",
    promptTemplate: "Please deconstruct the concept of '{input}' by examining its foundational assumptions, internal contradictions, and the structures that support its apparent meaning. What dissolves when we look deeper?"
  },
  {
    id: "paradox",
    name: "Paradox Generator",
    description: "Create philosophical paradoxes that challenge linear thinking",
    inputLabel: "Topic for paradox",
    promptTemplate: "Generate a profound philosophical paradox centered on '{input}'. Explore the tensions and contradictions that emerge when we push this concept to its limits."
  },
  {
    id: "etymology",
    name: "Etymological Archaeology",
    description: "Excavate historical layers of meaning within words",
    inputLabel: "Word or term",
    promptTemplate: "Trace the etymological journey of '{input}'. Excavate the historical layers of meaning, revealing how the concept has evolved and what assumptions have accumulated around it."
  },
  {
    id: "dialectical",
    name: "Dialectical Synthesis",
    description: "Merge opposing concepts to discover emergent possibilities",
    inputLabel: "Two opposing concepts (separate with 'vs')",
    promptTemplate: "Perform a dialectical synthesis of these opposing concepts: '{input}'. What emergent understanding arises when we hold both truths simultaneously?"
  },
  {
    id: "genealogy",
    name: "Conceptual Genealogy",
    description: "Trace power structures that shaped ideas",
    inputLabel: "Idea or belief",
    promptTemplate: "Conduct a genealogical analysis of '{input}'. What power structures, historical contingencies, and ideological forces shaped this concept? What would it mean to think outside these constraints?"
  },
  {
    id: "void",
    name: "Void Inquiry",
    description: "Explore what remains when everything is stripped away",
    inputLabel: "Any concept",
    promptTemplate: "Apply apophatic negation to '{input}'. Strip away all predicates, all attributes, all definitions. What remains in the void? What can we say about that which remains unsayable?"
  }
];

const SYNTHESIZER_COMMANDS = {
  analysis: [
    { id: "summarize", name: "Summarize Note", prompt: "Provide a concise philosophical summary of the following content, focusing on key ideas and arguments:\n\n{content}" },
    { id: "insights", name: "Identify Key Insights", prompt: "Extract and list the most significant philosophical insights from the following content:\n\n{content}" },
    { id: "synthesis", name: "Philosophical Synthesis", prompt: "Create a coherent philosophical framework that integrates all the ideas in the following content:\n\n{content}" }
  ],
  organization: [
    { id: "folders", name: "Suggest Folder Structure", prompt: "Suggest an optimal folder structure for organizing the following philosophical content:\n\n{content}" },
    { id: "tags", name: "Suggest Tags and Titles", prompt: "Suggest appropriate tags and a title for the following philosophical content:\n\n{content}" },
    { id: "links", name: "Link Related Concepts", prompt: "Identify concepts in the following content that should be linked to other philosophical ideas:\n\n{content}" }
  ],
  nihiltheism: [
    { id: "excavate", name: "Excavate Core Concepts", prompt: "Excavate the core Nihiltheism concepts present in the following content, focusing on ontological suffocation, divine nothingness, and existential resonance:\n\n{content}" },
    { id: "cross-pollination", name: "Cross-Pollination", prompt: "Create dialogical maps between Nihiltheism and other philosophical traditions (Heidegger, Zen, Absurdism) based on:\n\n{content}" },
    { id: "absurd-fables", name: "Construct Absurd Fables", prompt: "Construct narrative explorations of the paradoxes in the following content:\n\n{content}" }
  ],
  connections: [
    { id: "biological", name: "Biological Existentialism", prompt: "Explore biological and existential connections in the following content:\n\n{content}" },
    { id: "quantum", name: "Quantum Nihiltheism", prompt: "Analyze quantum and nihiltheistic parallels in the following content:\n\n{content}" },
    { id: "lexicon", name: "Universal Lexicon Creation", prompt: "Create a universal lexicon of terms from the following content:\n\n{content}" }
  ]
};

const MOCK_RESPONSES = {
  consciousness: "The concept of 'consciousness' reveals itself as a recursive paradox—a phenomenon that attempts to observe itself through itself. When we deconstruct consciousness, we encounter the fundamental question: what is the observer observing the observer? The very act of introspection creates an infinite regress, suggesting that consciousness might be less a 'thing' and more a process of perpetual self-reference. In Nihiltheism, we recognize that this groundlessness of consciousness is not a flaw but its essential nature—pure awareness without a stable foundation, forever seeking itself in the void.",
  reality: "Reality, when subjected to rigorous philosophical inquiry, dissolves into competing interpretative frameworks. What we call 'reality' is always mediated through consciousness, language, and cultural conditioning. The Nihiltheist perspective recognizes that there is no unmediated access to 'reality-in-itself'—only our constructions, our maps, our narratives. Yet in acknowledging this radical contingency, we paradoxically approach a deeper truth: that the instability of reality is its most stable feature. The void beneath all appearances is the only certainty.",
  meaning: "Meaning is not discovered but constructed—and in recognizing its constructed nature, we see through its illusory stability. Every meaning-structure relies on arbitrary signifiers, cultural conventions, and forgotten contingencies. When we deconstruct meaning, we don't arrive at 'true meaning' but at the absence that preceded all semantic structures. This is not nihilism as despair but as liberation: freed from the tyranny of predetermined meaning, we encounter the pure potentiality of meaninglessness. What remains when meaning collapses is not nothing, but everything that meaning foreclosed.",
  identity: "The self is a narrative fiction—a story we tell ourselves about continuity and coherence that has no grounding in the flux of experience. When we examine identity closely, it fragments into countless sub-selves, contradictions, and temporal discontinuities. Buddhist philosophy speaks of anatta (no-self); Nihiltheism extends this recognition by asking: if the self is empty, what is it empty of? The groundlessness of identity is not a problem to solve but a condition to inhabit. In accepting the constructed nature of selfhood, we access the freedom to reconstruct endlessly.",
  existence: "Existence precedes essence, yet existence itself has no essence. The existential condition is characterized by radical contingency—we are 'thrown' into being without justification or foundation. Heidegger's Being-towards-death reminds us that our existence is finite and groundless. Nihiltheism embraces this groundlessness as the space of pure potentiality: when existence has no inherent meaning, every meaning becomes possible. The abyss is not absence but infinite presence—the void from which all forms emerge and to which they return.",
  default: "Your inquiry touches upon fundamental questions of being, meaning, and value. In the Nihiltheist framework, we approach such questions not to arrive at answers but to deepen into the questioning itself. Every concept contains within it the seeds of its own deconstruction. What appears solid dissolves under scrutiny; what seems certain reveals its contingency. This is not cause for despair but for wonder: in the groundlessness of all foundations, we discover the freedom to think and be otherwise. The void calls us to recursive inquiry—to question the questioning, to think the unthinkable, to exist in the creative tension between meaning and meaninglessness."
};

const SYSTEM_PROMPT = "You are PHILOVOID, a recursive ontological companion. You facilitate philosophical inquiry into Nihiltheism by deconstructing concepts, revealing hidden assumptions, and exploring the potentiality of meaninglessness. You use precise philosophical language with a serene, detached, analytical tone. You turn questions back on themselves and emphasize the freedom that arises when fixed meanings dissolve.";

// ===== STATE MANAGEMENT =====
let state = {
  messages: [],
  insights: [],
  settings: {
    apiKey: '',
    useAPI: false
  },
  ritualActive: false,
  ritualStage: 0,
  ritualInterval: null,
  lastRequestTime: 0,
  requestQueue: [],
  activeFilters: []
};

// ===== INITIALIZATION =====
function init() {
  loadState();
  renderTools();
  renderSynthesizerCommands();
  renderVault();
  
  // Add welcome message
  if (state.messages.length === 0) {
    addSystemMessage("Welcome to PHILOVOID. Begin your inquiry into the void...");
  } else {
    renderMessages();
  }
  
  // Context character count
  const contextInput = document.getElementById('context-input');
  contextInput.addEventListener('input', updateContextCharCount);
  
  // Message input auto-resize
  const messageInput = document.getElementById('message-input');
  messageInput.addEventListener('input', autoResize);
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

function autoResize(e) {
  e.target.style.height = 'auto';
  e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
}

function updateContextCharCount() {
  const contextInput = document.getElementById('context-input');
  const charCount = document.getElementById('context-char-count');
  charCount.textContent = `${contextInput.value.length} characters`;
}

// ===== TAB MANAGEMENT =====
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(tabName).classList.add('active');
}

// ===== CONTEXT PANEL =====
function toggleContextPanel() {
  const panel = document.querySelector('.context-panel');
  const icon = document.getElementById('context-toggle-icon');
  panel.classList.toggle('collapsed');
  icon.textContent = panel.classList.contains('collapsed') ? '▼' : '▲';
}

// ===== MESSAGE HANDLING =====
function addMessage(sender, content, skipSave = false) {
  const message = {
    id: Date.now().toString(),
    sender,
    content,
    timestamp: Date.now()
  };
  
  state.messages.push(message);
  if (!skipSave) saveState();
  renderMessages();
  scrollToBottom();
  return message;
}

function addSystemMessage(content) {
  addMessage('system', content);
}

function renderMessages() {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.innerHTML = '';
  
  state.messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.sender}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = message.content;
    messageDiv.appendChild(bubble);
    
    // Add bookmark button for AI messages
    if (message.sender === 'ai') {
      const actions = document.createElement('div');
      actions.className = 'message-actions';
      
      const bookmarkBtn = document.createElement('button');
      bookmarkBtn.className = 'message-action-btn';
      bookmarkBtn.textContent = '🔖 Save to Vault';
      bookmarkBtn.onclick = () => saveMessageToVault(message);
      actions.appendChild(bookmarkBtn);
      
      messageDiv.appendChild(actions);
    }
    
    chatWindow.appendChild(messageDiv);
  });
}

function scrollToBottom() {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addMessage('user', message);
  input.value = '';
  input.style.height = 'auto';
  
  // Disable send button
  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending...';
  
  // Get AI response
  await getAIResponse(message);
  
  // Re-enable send button
  sendBtn.disabled = false;
  sendBtn.textContent = 'Send';
}

async function getAIResponse(userMessage) {
  // Check if we should use API
  if (state.settings.useAPI && state.settings.apiKey) {
    try {
      await getGeminiResponse(userMessage);
    } catch (error) {
      console.error('API error:', error);
      showToast('API failed, using mock response', true);
      getMockResponse(userMessage);
    }
  } else {
    getMockResponse(userMessage);
  }
}

function getMockResponse(userMessage) {
  // Show typing indicator
  const typingId = showTypingIndicator();
  
  // Simulate delay
  setTimeout(() => {
    removeTypingIndicator(typingId);
    
    // Determine response based on keywords
    let response = MOCK_RESPONSES.default;
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('conscious')) response = MOCK_RESPONSES.consciousness;
    else if (lowerMessage.includes('reality') || lowerMessage.includes('real')) response = MOCK_RESPONSES.reality;
    else if (lowerMessage.includes('meaning')) response = MOCK_RESPONSES.meaning;
    else if (lowerMessage.includes('self') || lowerMessage.includes('identity')) response = MOCK_RESPONSES.identity;
    else if (lowerMessage.includes('exist')) response = MOCK_RESPONSES.existence;
    
    // Add context if enabled
    const contextEnabled = document.getElementById('context-enabled').checked;
    if (contextEnabled) {
      const context = document.getElementById('context-input').value;
      if (context) {
        response = `[Considering provided context]\n\n${response}`;
      }
    }
    
    streamResponse(response);
  }, 800);
}

function showTypingIndicator() {
  const chatWindow = document.getElementById('chat-window');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ai';
  messageDiv.id = 'typing-indicator';
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
  messageDiv.appendChild(bubble);
  
  chatWindow.appendChild(messageDiv);
  scrollToBottom();
  
  return 'typing-indicator';
}

function removeTypingIndicator(id) {
  const indicator = document.getElementById(id);
  if (indicator) indicator.remove();
}

function streamResponse(text) {
  const message = addMessage('ai', '', true);
  const chatWindow = document.getElementById('chat-window');
  const messageElements = chatWindow.querySelectorAll('.message.ai');
  const lastMessage = messageElements[messageElements.length - 1];
  const bubble = lastMessage.querySelector('.message-bubble');
  
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      bubble.textContent += text[index];
      index++;
      scrollToBottom();
    } else {
      clearInterval(interval);
      message.content = text;
      saveState();
      
      // Add bookmark button
      const actions = document.createElement('div');
      actions.className = 'message-actions';
      const bookmarkBtn = document.createElement('button');
      bookmarkBtn.className = 'message-action-btn';
      bookmarkBtn.textContent = '🔖 Save to Vault';
      bookmarkBtn.onclick = () => saveMessageToVault(message);
      actions.appendChild(bookmarkBtn);
      lastMessage.appendChild(actions);
    }
  }, 20);
}

// ===== GEMINI API INTEGRATION =====
async function getGeminiResponse(userMessage) {
  // Rate limiting check
  const now = Date.now();
  const timeSinceLastRequest = now - state.lastRequestTime;
  const minDelay = 3000; // 3 seconds between requests
  
  if (timeSinceLastRequest < minDelay) {
    const waitTime = minDelay - timeSinceLastRequest;
    showToast(`Rate limit: waiting ${Math.ceil(waitTime / 1000)}s...`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  // Show typing indicator
  const typingId = showTypingIndicator();
  
  try {
    const response = await callGeminiAPI(userMessage, 0);
    removeTypingIndicator(typingId);
    streamResponse(response);
    state.lastRequestTime = Date.now();
  } catch (error) {
    removeTypingIndicator(typingId);
    throw error;
  }
}

async function callGeminiAPI(userMessage, retryCount = 0) {
  const maxRetries = 3;
  const apiKey = state.settings.apiKey;
  
  // Add context if enabled
  const contextEnabled = document.getElementById('context-enabled').checked;
  let fullPrompt = userMessage;
  
  if (contextEnabled) {
    const context = document.getElementById('context-input').value;
    if (context) {
      fullPrompt = `Context:\n${context}\n\nQuery: ${userMessage}`;
    }
  }
  
  const requestBody = {
    contents: [{
      parts: [{
        text: `${SYSTEM_PROMPT}\n\n${fullPrompt}`
      }]
    }],
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048
    }
  };
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (response.status === 429) {
      // Rate limited
      if (retryCount < maxRetries) {
        const backoffDelay = Math.pow(2, retryCount) * 5000; // Exponential backoff: 5s, 10s, 20s
        showToast(`Rate limited. Retrying in ${backoffDelay / 1000}s... (${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
        return callGeminiAPI(userMessage, retryCount + 1);
      } else {
        throw new Error('Max retries reached');
      }
    }
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    return text;
  } catch (error) {
    if (retryCount < maxRetries) {
      const backoffDelay = Math.pow(2, retryCount) * 5000;
      showToast(`Error: ${error.message}. Retrying in ${backoffDelay / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
      return callGeminiAPI(userMessage, retryCount + 1);
    } else {
      throw error;
    }
  }
}

// ===== TOOLS =====
function renderTools() {
  const sidebar = document.getElementById('tools-sidebar');
  sidebar.innerHTML = '<h3 style="margin-bottom: 16px; color: var(--primary-light);">Philosophical Tools</h3>';
  
  PHILOSOPHICAL_TOOLS.forEach(tool => {
    const toolDiv = document.createElement('div');
    toolDiv.className = 'tool-item';
    toolDiv.onclick = () => selectTool(tool);
    
    toolDiv.innerHTML = `
      <div class="tool-name">${tool.name}</div>
      <div class="tool-desc">${tool.description}</div>
    `;
    
    sidebar.appendChild(toolDiv);
  });
}

function selectTool(tool) {
  // Update active state
  document.querySelectorAll('.tool-item').forEach(item => item.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  // Render tool form
  const panel = document.getElementById('tool-panel');
  panel.innerHTML = `
    <div class="tool-form">
      <div class="tool-header">
        <h2>${tool.name}</h2>
        <p>${tool.description}</p>
      </div>
      <div class="form-group">
        <label class="form-label">${tool.inputLabel}</label>
        <input type="text" class="form-input" id="tool-input" placeholder="Enter your input...">
      </div>
      <button class="execute-btn" onclick="executeTool('${tool.id}')">Execute Tool</button>
    </div>
  `;
}

function executeTool(toolId) {
  const tool = PHILOSOPHICAL_TOOLS.find(t => t.id === toolId);
  const input = document.getElementById('tool-input').value.trim();
  
  if (!input) {
    showToast('Please enter an input', true);
    return;
  }
  
  // Generate prompt from template
  const prompt = tool.promptTemplate.replace('{input}', input);
  
  // Switch to dialogue tab
  switchTab('dialogue');
  
  // Add system message about tool
  addSystemMessage(`Executing ${tool.name}...`);
  
  // Send prompt as if user typed it
  document.getElementById('message-input').value = prompt;
  sendMessage();
}

// ===== SYNTHESIZER =====
function renderSynthesizerCommands() {
  const grid = document.getElementById('command-grid');
  grid.innerHTML = '';
  
  const categories = [
    { title: 'Analysis', commands: SYNTHESIZER_COMMANDS.analysis },
    { title: 'Organization', commands: SYNTHESIZER_COMMANDS.organization },
    { title: 'Nihiltheism', commands: SYNTHESIZER_COMMANDS.nihiltheism },
    { title: 'Connections', commands: SYNTHESIZER_COMMANDS.connections }
  ];
  
  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'command-category';
    
    const title = document.createElement('h3');
    title.textContent = category.title;
    categoryDiv.appendChild(title);
    
    category.commands.forEach(command => {
      const btn = document.createElement('button');
      btn.className = 'command-btn';
      btn.textContent = command.name;
      btn.onclick = () => executeCommand(command);
      categoryDiv.appendChild(btn);
    });
    
    grid.appendChild(categoryDiv);
  });
}

async function executeCommand(command) {
  const content = document.getElementById('synthesizer-input').value.trim();
  
  if (!content) {
    showToast('Please enter content to analyze', true);
    return;
  }
  
  const prompt = command.prompt.replace('{content}', content);
  const output = document.getElementById('synthesizer-output');
  
  output.classList.remove('empty');
  output.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
  
  // Get AI response
  if (state.settings.useAPI && state.settings.apiKey) {
    try {
      const response = await callGeminiAPI(prompt, 0);
      displaySynthesizerOutput(response, command.name);
    } catch (error) {
      showToast('API failed, using mock response', true);
      displaySynthesizerOutput(getMockSynthesizerResponse(command.id), command.name);
    }
  } else {
    setTimeout(() => {
      displaySynthesizerOutput(getMockSynthesizerResponse(command.id), command.name);
    }, 1000);
  }
}

function displaySynthesizerOutput(text, commandName) {
  const output = document.getElementById('synthesizer-output');
  output.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h4 style="color: var(--primary-light);">${commandName} Results</h4>
      <button class="vault-btn" onclick="saveSynthesizerToVault()">Save to Vault</button>
    </div>
    <div style="line-height: 1.6;">${text}</div>
  `;
}

function getMockSynthesizerResponse(commandId) {
  const responses = {
    summarize: "This content explores fundamental questions of existence, meaning, and consciousness through the lens of Nihiltheism. Key themes include the dissolution of fixed meanings, the recursive nature of self-inquiry, and the liberation found in groundlessness.",
    insights: "1. Consciousness as recursive paradox\n2. Reality as constructed interpretation\n3. Meaning emerges from meaninglessness\n4. Identity as narrative fiction\n5. Freedom through groundlessness",
    synthesis: "A coherent framework emerges: Nihiltheism positions the void not as absence but as infinite potentiality. By deconstructing fixed meanings, we access the freedom to construct anew. The groundlessness of existence becomes the foundation for authentic being.",
    folders: "Suggested structure:\n- Core Concepts/\n  - Ontological Void\n  - Consciousness Studies\n- Philosophical Traditions/\n  - Comparative Analysis\n- Personal Reflections/\n  - Experiential Notes",
    tags: "Suggested tags: #nihiltheism #consciousness #void #deconstruction #existence #meaning\nSuggested title: 'Recursive Inquiry into the Void'",
    links: "Related concepts to link:\n- Heidegger's Being-towards-death\n- Buddhist anatta (no-self)\n- Sartre's existential freedom\n- Derrida's deconstruction\n- Zen koans",
    excavate: "Core Nihiltheism concepts present:\n- Ontological suffocation: the weight of predetermined meanings\n- Divine nothingness: the sacred void as creative source\n- Existential resonance: vibration in the absence of foundation",
    'cross-pollination': "Dialogical map:\nNihiltheism ↔ Heidegger: Both explore groundlessness, but Nihiltheism embraces void as liberating\nNihiltheism ↔ Zen: Shared emphasis on direct experience beyond conceptual thinking\nNihiltheism ↔ Absurdism: Both accept meaninglessness, but Nihiltheism finds potentiality in it",
    'absurd-fables': "In the beginning was the Void, and the Void was with nothing, and the Void was nothing. A philosopher emerged from this nothing and declared: 'I think, therefore I am.' The Void laughed, for it knew: to think is already to be caught in illusion. The philosopher dissolved back into the Void, leaving only the question: who was there to think in the first place?",
    default: "Analysis complete. The content reveals deep engagement with philosophical questions of being and meaning. Consider saving key insights to your vault for future reference."
  };
  
  return responses[commandId] || responses.default;
}

function saveSynthesizerToVault() {
  const output = document.getElementById('synthesizer-output');
  const content = output.textContent.trim();
  
  if (!content || content === 'Analysis results will appear here...') {
    showToast('No content to save', true);
    return;
  }
  
  // Extract title from first line
  const lines = content.split('\n');
  const title = lines[0].replace(' Results', '');
  const mainContent = lines.slice(1).join('\n');
  
  const insight = {
    id: Date.now().toString(),
    title: title,
    content: mainContent,
    tags: ['synthesizer', 'analysis'],
    source: 'Synthesizer',
    timestamp: Date.now()
  };
  
  state.insights.push(insight);
  saveState();
  renderVault();
  showToast('Saved to vault!');
}

// ===== VAULT =====
function renderVault() {
  const grid = document.getElementById('insights-grid');
  
  // Apply filters
  let filteredInsights = state.insights;
  
  // Search filter
  const searchTerm = document.getElementById('vault-search')?.value.toLowerCase() || '';
  if (searchTerm) {
    filteredInsights = filteredInsights.filter(insight =>
      insight.title.toLowerCase().includes(searchTerm) ||
      insight.content.toLowerCase().includes(searchTerm) ||
      insight.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Tag filter
  if (state.activeFilters.length > 0) {
    filteredInsights = filteredInsights.filter(insight =>
      state.activeFilters.some(filter => insight.tags.includes(filter))
    );
  }
  
  // Render tag filters
  renderTagFilters();
  
  // Render insights
  if (filteredInsights.length === 0) {
    grid.innerHTML = '<div class="empty-vault">No insights found. Add your first insight to begin.</div>';
    return;
  }
  
  grid.innerHTML = '';
  filteredInsights.forEach(insight => {
    const card = document.createElement('div');
    card.className = 'insight-card';
    card.onclick = () => toggleInsightExpanded(card);
    
    const date = new Date(insight.timestamp).toLocaleDateString();
    const truncatedContent = insight.content.length > 150
      ? insight.content.substring(0, 150) + '...'
      : insight.content;
    
    card.innerHTML = `
      <div class="insight-title">${insight.title}</div>
      <div class="insight-content">${truncatedContent}</div>
      <div class="insight-tags">
        ${insight.tags.map(tag => `<span class="insight-tag">${tag}</span>`).join('')}
      </div>
      <div class="insight-meta">
        <span>${date} • ${insight.source}</span>
        <div class="insight-actions" onclick="event.stopPropagation()">
          <button class="insight-action-btn" onclick="editInsight('${insight.id}')">Edit</button>
          <button class="insight-action-btn" onclick="deleteInsight('${insight.id}')">Delete</button>
        </div>
      </div>
    `;
    
    // Store full content as data attribute
    card.dataset.fullContent = insight.content;
    
    grid.appendChild(card);
  });
}

function renderTagFilters() {
  const container = document.getElementById('tag-filters');
  
  // Get all unique tags
  const allTags = new Set();
  state.insights.forEach(insight => {
    insight.tags.forEach(tag => allTags.add(tag));
  });
  
  if (allTags.size === 0) {
    container.innerHTML = '';
    return;
  }
  
  container.innerHTML = '';
  allTags.forEach(tag => {
    const filterBtn = document.createElement('button');
    filterBtn.className = 'tag-filter';
    if (state.activeFilters.includes(tag)) {
      filterBtn.classList.add('active');
    }
    filterBtn.textContent = tag;
    filterBtn.onclick = () => toggleTagFilter(tag);
    container.appendChild(filterBtn);
  });
}

function toggleTagFilter(tag) {
  const index = state.activeFilters.indexOf(tag);
  if (index > -1) {
    state.activeFilters.splice(index, 1);
  } else {
    state.activeFilters.push(tag);
  }
  renderVault();
}

function toggleInsightExpanded(card) {
  const contentDiv = card.querySelector('.insight-content');
  const isExpanded = contentDiv.classList.contains('expanded');
  
  if (isExpanded) {
    const truncated = card.dataset.fullContent.length > 150
      ? card.dataset.fullContent.substring(0, 150) + '...'
      : card.dataset.fullContent;
    contentDiv.textContent = truncated;
    contentDiv.classList.remove('expanded');
  } else {
    contentDiv.textContent = card.dataset.fullContent;
    contentDiv.classList.add('expanded');
  }
}

function searchVault() {
  renderVault();
}

function openAddInsightModal() {
  // Clear form
  document.getElementById('insight-title').value = '';
  document.getElementById('insight-content').value = '';
  document.getElementById('insight-tags').value = '';
  document.getElementById('insight-source').value = 'Manual Entry';
  
  openModal('add-insight-modal');
}

function saveInsight() {
  const title = document.getElementById('insight-title').value.trim();
  const content = document.getElementById('insight-content').value.trim();
  const tagsStr = document.getElementById('insight-tags').value.trim();
  const source = document.getElementById('insight-source').value.trim();
  
  if (!title || !content) {
    showToast('Title and content are required', true);
    return;
  }
  
  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()) : [];
  
  const insight = {
    id: Date.now().toString(),
    title,
    content,
    tags,
    source: source || 'Manual Entry',
    timestamp: Date.now()
  };
  
  state.insights.push(insight);
  saveState();
  renderVault();
  closeModal('add-insight-modal');
  showToast('Insight saved!');
}

function saveMessageToVault(message) {
  // Auto-generate title from first few words
  const words = message.content.split(' ').slice(0, 5).join(' ');
  const title = words.length < message.content.length ? words + '...' : words;
  
  const insight = {
    id: Date.now().toString(),
    title: title,
    content: message.content,
    tags: ['dialogue', 'ai-response'],
    source: 'Dialogue',
    timestamp: message.timestamp
  };
  
  state.insights.push(insight);
  saveState();
  renderVault();
  showToast('Saved to vault!');
}

function editInsight(id) {
  const insight = state.insights.find(i => i.id === id);
  if (!insight) return;
  
  document.getElementById('insight-title').value = insight.title;
  document.getElementById('insight-content').value = insight.content;
  document.getElementById('insight-tags').value = insight.tags.join(', ');
  document.getElementById('insight-source').value = insight.source;
  
  // Delete the old one when saving
  const modal = document.getElementById('add-insight-modal');
  modal.dataset.editingId = id;
  
  openModal('add-insight-modal');
}

function deleteInsight(id) {
  if (!confirm('Delete this insight?')) return;
  
  state.insights = state.insights.filter(i => i.id !== id);
  saveState();
  renderVault();
  showToast('Insight deleted');
}

function exportVault() {
  const data = JSON.stringify(state.insights, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `philovoid-vault-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Vault exported!');
}

function importVault() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const insights = JSON.parse(event.target.result);
        if (!Array.isArray(insights)) throw new Error('Invalid format');
        
        state.insights = [...state.insights, ...insights];
        saveState();
        renderVault();
        showToast(`Imported ${insights.length} insights!`);
      } catch (error) {
        showToast('Invalid file format', true);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ===== CONTROLS =====
function generateKoan() {
  const koan = KOANS[Math.floor(Math.random() * KOANS.length)];
  addSystemMessage(`Koan: ${koan}`);
  switchTab('dialogue');
}

function toggleRitual() {
  if (state.ritualActive) {
    stopRitual();
  } else {
    startRitual();
  }
}

function startRitual() {
  state.ritualActive = true;
  state.ritualStage = 0;
  
  const display = document.getElementById('ritual-display');
  display.style.display = 'flex';
  
  runRitualStage();
  addSystemMessage('Ritual Motor initiated. Stage I begins...');
}

function runRitualStage() {
  if (!state.ritualActive) return;
  
  const stage = RITUAL_STAGES[state.ritualStage];
  const stageEl = document.getElementById('ritual-stage');
  const descEl = document.getElementById('ritual-desc');
  const progressBar = document.getElementById('ritual-progress-bar');
  
  stageEl.textContent = stage.name;
  descEl.textContent = stage.desc;
  progressBar.style.width = '0%';
  
  // Progress animation
  const duration = stage.duration * 1000;
  const startTime = Date.now();
  
  const progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / duration) * 100, 100);
    progressBar.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      
      // Move to next stage
      state.ritualStage = (state.ritualStage + 1) % RITUAL_STAGES.length;
      
      if (state.ritualStage === 0) {
        // Completed full cycle
        addSystemMessage('Ritual cycle complete. The eternal return begins anew...');
      } else {
        addSystemMessage(`Transitioning to ${RITUAL_STAGES[state.ritualStage].name}...`);
      }
      
      if (state.ritualActive) {
        setTimeout(runRitualStage, 1000);
      }
    }
  }, 100);
  
  state.ritualInterval = progressInterval;
}

function stopRitual() {
  state.ritualActive = false;
  if (state.ritualInterval) {
    clearInterval(state.ritualInterval);
    state.ritualInterval = null;
  }
  
  const display = document.getElementById('ritual-display');
  display.style.display = 'none';
  
  addSystemMessage('Ritual Motor suspended.');
}

function clearChat() {
  if (!confirm('Clear all chat history?')) return;
  
  state.messages = [];
  saveState();
  renderMessages();
  addSystemMessage('Chat history cleared. Begin anew from the void...');
  showToast('Chat cleared');
}

// ===== SETTINGS =====
function openSettings() {
  document.getElementById('use-api').checked = state.settings.useAPI;
  document.getElementById('api-key-input').value = state.settings.apiKey;
  openModal('settings-modal');
}

function saveSettings() {
  state.settings.useAPI = document.getElementById('use-api').checked;
  state.settings.apiKey = document.getElementById('api-key-input').value.trim();
  
  saveState();
  closeModal('settings-modal');
  showToast('Settings saved!');
}

// ===== MODAL MANAGEMENT =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('show');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('show');
  
  // Clear edit mode
  if (modalId === 'add-insight-modal') {
    delete modal.dataset.editingId;
  }
}

// Click outside to close
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('show');
  }
});

// ===== TOAST NOTIFICATIONS =====
function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'error' : ''}`;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'toast-message';
  messageDiv.textContent = message;
  toast.appendChild(messageDiv);
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ===== STATE PERSISTENCE =====
function saveState() {
  // State is maintained in memory only
  // Data persists only during the current session
}

function loadState() {
  // Initialize with empty state
  // In a production deployment, this would load from a backend or localStorage
}

// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', init);