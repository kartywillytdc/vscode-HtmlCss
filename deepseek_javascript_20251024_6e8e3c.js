// VsCode-Tdc - Firebase Configuration and Application Logic
console.log('🚀 VsCode-Tdc - Inicializando...');

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA7iDNIVzp4LGQem48TK_nXR3Mm1zM4U2U",
    authDomain: "vscodegithubtdc.firebaseapp.com",
    projectId: "vscodegithubtdc",
    storageBucket: "vscodegithubtdc.firebasestorage.app",
    messagingSenderId: "777235149661",
    appId: "1:777235149661:web:df6951c059c06dc4576eb4",
    measurementId: "G-NS9XDNW2MC"
};

// Inicializar Firebase
let app, auth, db, storage;
try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    
    console.log('✅ Firebase inicializado com sucesso');
    
    // Configurar persistência offline
    db.enablePersistence()
      .then(() => {
          console.log('✅ Persistência offline ativada');
          updateLoadingDetails('Persistência offline ativada');
      })
      .catch((err) => {
          console.log('⚠️ Persistência offline não suportada: ', err);
          updateLoadingDetails('Modo online apenas');
      });
} catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
    updateLoadingDetails('Erro no Firebase - Modo offline');
}

// Estado da aplicação
const state = {
    files: {
        'index.html': {
            name: 'index.html',
            content: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VsCode-Tdc - Meu Projeto</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>🚀 Bem-vindo ao VsCode-Tdc</h1>
        <nav>
            <a href="#home">Home</a>
            <a href="#about">Sobre</a>
            <a href="#contact">Contato</a>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>🎯 Página Inicial</h2>
            <p>Este é um exemplo de site criado com o <strong>VsCode-Tdc</strong> by DoguinhoTdc.</p>
            <button onclick="changeText()">Clique Aqui</button>
        </section>
        
        <section id="about">
            <h2>💡 Sobre</h2>
            <p>Este site foi criado com HTML, CSS e JavaScript usando o VsCode-Tdc IDE.</p>
        </section>
        
        <section id="contact">
            <h2>📞 Contato</h2>
            <p>Entre em contato conosco!</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 VsCode-Tdc. Desenvolvido por DoguinhoTdc • Equipe Discord</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`,
            type: 'html'
        },
        'style.css': {
            name: 'style.css',
            content: `/* VsCode-Tdc - Estilos Personalizados */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    color: #2c3e50;
    padding: 2rem 0;
    text-align: center;
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

nav {
    margin-top: 1.5rem;
}

nav a {
    color: #3498db;
    text-decoration: none;
    margin: 0 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    transition: all 0.3s ease;
    font-weight: 600;
}

nav a:hover {
    background: #3498db;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

main {
    max-width: 1000px;
    margin: 3rem auto;
    padding: 0 2rem;
}

section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 3rem;
    margin-bottom: 2rem;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease;
}

section:hover {
    transform: translateY(-5px);
}

h1, h2 {
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #2c3e50, #3498db);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

h1 {
    font-size: 3rem;
    font-weight: 800;
}

h2 {
    font-size: 2rem;
    font-weight: 700;
}

button {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
    background: linear-gradient(135deg, #2980b9, #3498db);
}

footer {
    background: rgba(44, 62, 80, 0.95);
    backdrop-filter: blur(10px);
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-top: 3rem;
}

@media (max-width: 768px) {
    nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    nav a {
        margin: 0.5rem 0;
        width: 200px;
        text-align: center;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    h2 {
        font-size: 1.5rem;
    }
    
    section {
        padding: 2rem;
        margin: 1rem;
    }
}`,
            type: 'css'
        },
        'script.js': {
            name: 'script.js',
            content: `// VsCode-Tdc - JavaScript Personalizado
function changeText() {
    const title = document.querySelector('h1');
    const button = document.querySelector('button');
    
    if (title.textContent.includes('Bem-vindo')) {
        title.textContent = '🎉 Texto Alterado com Sucesso!';
        title.style.background = 'linear-gradient(135deg, #e74c3c, #e67e22)';
        title.style.webkitBackgroundClip = 'text';
        title.style.webkitTextFillColor = 'transparent';
        button.textContent = '🔙 Voltar ao Normal';
    } else {
        title.textContent = '🚀 Bem-vindo ao VsCode-Tdc';
        title.style.background = 'linear-gradient(135deg, #2c3e50, #3498db)';
        title.style.webkitBackgroundClip = 'text';
        title.style.webkitTextFillColor = 'transparent';
        button.textContent = '✨ Clique Aqui';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Efeitos de entrada nas seções
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar efeitos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 VsCode-Tdc - Site carregado com sucesso!');
    console.log('👨‍💻 Desenvolvido por DoguinhoTdc • Equipe Discord');
    
    // Aplicar efeitos de entrada
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// Contador de visitas (exemplo)
let visitCount = localStorage.getItem('visitCount') || 0;
visitCount++;
localStorage.setItem('visitCount', visitCount);
console.log(\`👁️ Visitante número: \${visitCount}\`);`,
            type: 'js'
        }
    },
    currentFile: 'index.html',
    tabs: ['index.html'],
    user: null,
    currentProject: null,
    projects: [],
    aiConfig: {
        deepseek: '',
        groq: '',
        claude: '',
        currentProvider: 'deepseek'
    },
    settings: {
        theme: 'blue',
        autoSave: true,
        fontSize: 14,
        previewMode: 'desktop'
    },
    fileHistory: [],
    historyIndex: -1,
    syncEnabled: true
};

// Elementos DOM
const elements = {
    sidebar: document.getElementById('sidebar'),
    fileExplorer: document.getElementById('file-explorer'),
    fileTree: document.getElementById('file-tree'),
    editorTabs: document.getElementById('editor-tabs'),
    codeEditor: document.getElementById('code-editor'),
    preview: document.getElementById('preview'),
    loginBtn: document.getElementById('login-btn'),
    userInfo: document.getElementById('user-info'),
    userAvatar: document.getElementById('user-avatar-img'),
    userName: document.getElementById('user-name'),
    loginModal: document.getElementById('login-modal'),
    aiModal: document.getElementById('ai-modal'),
    settingsModal: document.getElementById('settings-modal'),
    projectsModal: document.getElementById('projects-modal'),
    githubModal: document.getElementById('github-modal'),
    githubPagesModal: document.getElementById('github-pages-modal'),
    toast: document.getElementById('toast'),
    contextMenu: document.getElementById('context-menu'),
    loadingScreen: document.getElementById('loading-screen'),
    loadingDetails: document.getElementById('loading-details'),
    aiAssistant: document.getElementById('ai-assistant'),
    aiPrompt: document.getElementById('ai-prompt'),
    aiFileSelect: document.getElementById('ai-file-select'),
    aiResponse: document.getElementById('ai-response'),
    generateCode: document.getElementById('generate-code'),
    aiAssistantBtn: document.getElementById('ai-assistant-btn'),
    closeAiAssistant: document.getElementById('close-ai-assistant')
};

// Inicialização
document.addEventListener('DOMContentLoaded', init);

function init() {
    updateLoadingDetails('Inicializando VsCode-Tdc...');
    
    // Configurar observador de autenticação primeiro
    setupAuthListener();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Carregar configurações salvas
    loadSettings();
    
    // Verificar chaves de API de IA
    checkAIConfig();
    
    // Inicializar interface
    setTimeout(() => {
        renderFileTree();
        renderTabs();
        updatePreview();
        updateAIFileSelect();
        updateLoadingDetails('Ambiente pronto!');
        
        // Esconder tela de loading após 2 segundos
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
            showToast('🚀 VsCode-Tdc inicializado com sucesso!', 'success');
        }, 1000);
    }, 1000);
}

function updateLoadingDetails(message) {
    if (elements.loadingDetails) {
        elements.loadingDetails.textContent = message;
    }
}

function setupAuthListener() {
    if (!auth) {
        console.log('⚠️ Firebase Auth não disponível');
        return;
    }
    
    // Observador de estado de autenticação
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            state.user = user;
            await updateUserData();
            updateUserUI();
            loadUserProjects();
            showToast(`👋 Bem-vindo, ${user.displayName || 'Dev'}!`, 'success');
        } else {
            state.user = null;
            state.currentProject = null;
            updateUserUI();
            resetToDefaultFiles();
        }
    });
}

function setupEventListeners() {
    // Sidebar
    document.getElementById('explorer-btn').addEventListener('click', toggleFileExplorer);
    document.getElementById('github-btn').addEventListener('click', showGitHubModal);
    document.getElementById('ai-btn').addEventListener('click', showAIModal);
    document.getElementById('projects-btn').addEventListener('click', showProjectsModal);
    document.getElementById('settings-btn').addEventListener('click', showSettingsModal);
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Top bar actions
    document.getElementById('undo-btn').addEventListener('click', undo);
    document.getElementById('save-btn').addEventListener('click', saveProject);
    document.getElementById('github-pages-btn').addEventListener('click', showGitHubPagesModal);
    document.getElementById('export-btn').addEventListener('click', exportAsZip);
    document.getElementById('login-btn').addEventListener('click', showLoginModal);
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // AI Assistant
    elements.aiAssistantBtn.addEventListener('click', toggleAIAssistant);
    elements.closeAiAssistant.addEventListener('click', toggleAIAssistant);
    elements.generateCode.addEventListener('click', generateCodeWithAI);
    
    // File actions
    document.getElementById('new-file-btn').addEventListener('click', createNewFile);
    document.getElementById('new-folder-btn').addEventListener('click', createNewFolder);
    document.getElementById('upload-file-btn').addEventListener('click', uploadFile);
    
    // Preview actions
    document.getElementById('mobile-preview-btn').addEventListener('click', () => setPreviewMode('mobile'));
    document.getElementById('desktop-preview-btn').addEventListener('click', () => setPreviewMode('desktop'));
    document.getElementById('refresh-preview-btn').addEventListener('click', updatePreview);
    
    // Modals
    document.getElementById('close-login').addEventListener('click', () => elements.loginModal.style.display = 'none');
    document.getElementById('close-ai').addEventListener('click', () => elements.aiModal.style.display = 'none');
    document.getElementById('close-settings').addEventListener('click', () => elements.settingsModal.style.display = 'none');
    document.getElementById('close-projects').addEventListener('click', () => elements.projectsModal.style.display = 'none');
    document.getElementById('close-github').addEventListener('click', () => elements.githubModal.style.display = 'none');
    document.getElementById('close-github-pages').addEventListener('click', () => elements.githubPagesModal.style.display = 'none');
    
    // GitHub login
    document.getElementById('github-login').addEventListener('click', loginWithGitHub);
    
    // AI configuration
    document.getElementById('test-ai').addEventListener('click', testAIKeys);
    document.getElementById('save-ai').addEventListener('click', saveAIConfig);
    
    // Settings
    document.getElementById('save-settings').addEventListener('click', saveSettings);
    document.getElementById('reset-settings').addEventListener('click', resetSettings);
    
    // Projects
    document.getElementById('create-project').addEventListener('click', createNewProject);
    document.getElementById('refresh-projects').addEventListener('click', loadUserProjects);
    
    // GitHub actions
    document.getElementById('create-repo').addEventListener('click', createRepository);
    document.getElementById('refresh-repos').addEventListener('click', loadRepositories);
    document.getElementById('deploy-pages').addEventListener('click', deployToGitHubPages);
    document.getElementById('cancel-deploy').addEventListener('click', () => elements.githubPagesModal.style.display = 'none');
    
    // Editor
    elements.codeEditor.addEventListener('input', handleEditorChange);
    elements.codeEditor.addEventListener('keydown', handleEditorKeydown);
    elements.codeEditor.addEventListener('click', updateCursorPosition);
    elements.codeEditor.addEventListener('keyup', updateCursorPosition);
    
    // Context menu
    document.getElementById('context-rename').addEventListener('click', renameFile);
    document.getElementById('context-delete').addEventListener('click', deleteFile);
    document.getElementById('context-download').addEventListener('click', downloadFile);
    
    // Theme selectors
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            changeTheme(this.dataset.theme);
        });
    });
    
    // Fechar modais ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
        // Fechar AI Assistant ao clicar fora
        if (!elements.aiAssistant.contains(e.target) && e.target !== elements.aiAssistantBtn) {
            elements.aiAssistant.style.display = 'none';
        }
    });
    
    // Fechar menu de contexto ao clicar fora
    document.addEventListener('click', function() {
        elements.contextMenu.style.display = 'none';
    });
    
    // Detectar mudanças de rede
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

// ==================== AI ASSISTANT FUNCTIONS ====================

function toggleAIAssistant() {
    if (elements.aiAssistant.style.display === 'block') {
        elements.aiAssistant.style.display = 'none';
    } else {
        elements.aiAssistant.style.display = 'block';
        elements.aiPrompt.focus();
        updateAIFileSelect();
    }
}

function updateAIFileSelect() {
    elements.aiFileSelect.innerHTML = '';
    Object.keys(state.files).forEach(filename => {
        const option = document.createElement('option');
        option.value = filename;
        option.textContent = filename;
        if (filename === state.currentFile) {
            option.selected = true;
        }
        elements.aiFileSelect.appendChild(option);
    });
}

async function generateCodeWithAI() {
    const prompt = elements.aiPrompt.value.trim();
    const selectedFile = elements.aiFileSelect.value;
    
    if (!prompt) {
        showToast('Por favor, digite uma solicitação para a IA', 'warning');
        return;
    }
    
    if (!state.aiConfig.deepseek && !state.aiConfig.groq && !state.aiConfig.claude) {
        showToast('Configure suas chaves de API primeiro', 'error');
        elements.aiModal.style.display = 'flex';
        return;
    }
    
    // Mostrar status de processamento
    elements.generateCode.disabled = true;
    elements.generateCode.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando Código...';
    elements.aiResponse.style.display = 'block';
    elements.aiResponse.innerHTML = `
        <div class="ai-typing">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            Processando sua solicitação...
        </div>
    `;
    
    try {
        const currentCode = state.files[selectedFile].content;
        const improvedCode = await callAIAPI(prompt, currentCode, selectedFile);
        
        // Animar a substituição do código
        await animateCodeReplacement(selectedFile, improvedCode);
        
        elements.aiResponse.innerHTML = `
            <div style="color: var(--success-color);">
                <i class="fas fa-check-circle"></i> Código gerado com sucesso!
            </div>
            <div style="margin-top: 10px; font-size: 12px;">
                A IA analisou e melhorou seu código conforme solicitado.
            </div>
        `;
        
        showToast('✅ Código melhorado pela IA!', 'ai');
        
    } catch (error) {
        console.error('Erro na geração de código:', error);
        elements.aiResponse.innerHTML = `
            <div style="color: var(--error-color);">
                <i class="fas fa-exclamation-triangle"></i> Erro ao gerar código: ${error.message}
            </div>
        `;
        showToast('❌ Erro na IA: ' + error.message, 'error');
    } finally {
        elements.generateCode.disabled = false;
        elements.generateCode.innerHTML = '<i class="fas fa-magic"></i> Gerar Código';
    }
}

async function callAIAPI(prompt, currentCode, filename) {
    // Simulação de chamada à API de IA
    // Em produção, substitua por chamadas reais às APIs
    
    return new Promise((resolve) => {
        setTimeout(() => {
            let improvedCode = currentCode;
            
            // Lógica de exemplo baseada no prompt
            if (prompt.toLowerCase().includes('botão') || prompt.toLowerCase().includes('button')) {
                if (filename.endsWith('.html')) {
                    improvedCode = addButtonToHTML(currentCode, prompt);
                } else if (filename.endsWith('.css')) {
                    improvedCode = addButtonStyles(currentCode);
                } else if (filename.endsWith('.js')) {
                    improvedCode = addButtonFunctionality(currentCode);
                }
            } else if (prompt.toLowerCase().includes('cor') || prompt.toLowerCase().includes('color')) {
                if (filename.endsWith('.css')) {
                    improvedCode = improveColors(currentCode);
                }
            } else if (prompt.toLowerCase().includes('responsivo') || prompt.toLowerCase().includes('responsive')) {
                if (filename.endsWith('.css')) {
                    improvedCode = makeResponsive(currentCode);
                }
            } else {
                // Melhoria genérica
                improvedCode = genericImprovement(currentCode, prompt);
            }
            
            resolve(improvedCode);
        }, 2000); // Simula delay de rede
    });
}

function addButtonToHTML(html, prompt) {
    if (html.includes('</body>')) {
        const buttonHTML = `
    <!-- Botão adicionado pela IA -->
    <div style="text-align: center; margin: 20px 0;">
        <button onclick="handleAIGeneratedButton()" class="ai-generated-btn">
            🎯 Botão IA - ${prompt.substring(0, 20)}...
        </button>
    </div>
`;
        return html.replace('</body>', buttonHTML + '\n</body>');
    }
    return html;
}

function addButtonStyles(css) {
    const buttonStyles = `
/* Estilos do botão gerado pela IA */
.ai-generated-btn {
    background: linear-gradient(135deg, #9c27b0, #7b1fa2);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(156, 39, 176, 0.3);
}

.ai-generated-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(156, 39, 176, 0.4);
    background: linear-gradient(135deg, #7b1fa2, #9c27b0);
}
`;
    return css + '\n' + buttonStyles;
}

function addButtonFunctionality(js) {
    const buttonFunction = `
// Função do botão gerado pela IA
function handleAIGeneratedButton() {
    const colors = ['#9c27b0', '#2196f3', '#4caf50', '#ff9800', '#f44336'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = \`linear-gradient(135deg, \${randomColor}, \${randomColor}99)\`;
    
    // Efeito de confete
    createConfetti();
    console.log('🎉 Botão IA clicado! Cor alterada para:', randomColor);
}

function createConfetti() {
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = \`
                position: fixed;
                width: 10px;
                height: 10px;
                background: \${['#9c27b0', '#2196f3', '#4caf50', '#ff9800', '#f44336'][Math.floor(Math.random() * 5)]};
                border-radius: 2px;
                top: -10px;
                left: \${Math.random() * 100}vw;
                animation: confettiFall \${1 + Math.random() * 2}s linear forwards;
                z-index: 9999;
            \`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 2000);
        }, i * 50);
    }
}

// Adicionar animação de confetti
const style = document.createElement('style');
style.textContent = \`
@keyframes confettiFall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}
\`;
document.head.appendChild(style);
`;
    
    if (js.includes('// Função do botão gerado pela IA')) {
        return js; // Já existe, não adicionar novamente
    }
    return js + '\n' + buttonFunction;
}

function improveColors(css) {
    // Adiciona variáveis CSS e melhora cores
    const colorVars = `
/* Variáveis de cor adicionadas pela IA */
:root {
    --primary-color: #9c27b0;
    --secondary-color: #2196f3;
    --success-color: #4caf50;
    --warning-color: #ff9800;
    --error-color: #f44336;
    --text-color: #333;
    --bg-color: #f5f5f5;
}

body {
    color: var(--text-color);
    background-color: var(--bg-color);
}
`;
    
    if (css.includes('--primary-color')) {
        return css; // Já tem variáveis
    }
    return colorVars + '\n' + css;
}

function makeResponsive(css) {
    // Adiciona media queries responsivas
    const responsiveCSS = `
/* Media Queries adicionadas pela IA */
@media (max-width: 768px) {
    .container {
        padding: 0 15px;
    }
    
    h1 {
        font-size: 2rem !important;
    }
    
    h2 {
        font-size: 1.5rem !important;
    }
    
    section {
        margin: 10px 0 !important;
        padding: 20px !important;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 1.5rem !important;
    }
    
    button {
        width: 100%;
        margin: 5px 0;
    }
}
`;
    
    if (css.includes('@media (max-width: 768px)')) {
        return css; // Já tem media queries
    }
    return css + '\n' + responsiveCSS;
}

function genericImprovement(code, prompt) {
    // Melhorias genéricas baseadas no tipo de arquivo
    if (code.includes('</html>')) {
        // HTML - Adiciona meta tags e melhora semântica
        let improved = code;
        
        if (!improved.includes('viewport')) {
            improved = improved.replace('<head>', `<head>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">`);
        }
        
        if (!improved.includes('lang=')) {
            improved = improved.replace('<html>', '<html lang="pt-br">');
        }
        
        if (!improved.includes('</footer>') && improved.includes('</body>')) {
            improved = improved.replace('</body>', `
    <footer style="text-align: center; padding: 20px; background: #333; color: white; margin-top: 40px;">
        <p>✨ Melhorado pela IA do VsCode-Tdc</p>
    </footer>
</body>`);
        }
        
        return improved;
    } else if (code.includes('</style>') || code.includes('}')) {
        // CSS - Adiciona reset e organiza melhor
        let improved = code;
        
        if (!improved.includes('box-sizing')) {
            improved = `/* Reset e melhorias adicionadas pela IA */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

` + improved;
        }
        
        // Adiciona comentários organizadores
        if (!improved.includes('/* Layout */')) {
            improved = improved.replace(/(body\s*{[\s\S]*?})/, `/* Layout Principal */\n$1`);
        }
        
        return improved;
    } else {
        // JavaScript - Adiciona tratamento de erro e comentários
        let improved = code;
        
        if (!improved.includes('try {')) {
            // Envolve código existente em try-catch
            improved = `// Código melhorado pela IA
try {
${improved.split('\n').map(line => '    ' + line).join('\n')}
} catch (error) {
    console.error('Erro no código:', error);
}`;
        }
        
        return improved;
    }
}

async function animateCodeReplacement(filename, newCode) {
    const editor = elements.codeEditor;
    const oldCode = state.files[filename].content;
    
    // Atualizar o estado primeiro
    state.files[filename].content = newCode;
    
    // Se este é o arquivo atual, animar a transição no editor
    if (filename === state.currentFile) {
        // Adicionar classe de animação
        editor.classList.add('ai-editing');
        
        // Animar a substituição caractere por caractere
        await typeCodeAnimation(editor, newCode);
        
        // Remover classe de animação
        setTimeout(() => {
            editor.classList.remove('ai-editing');
        }, 1000);
    }
    
    // Atualizar preview
    updatePreview();
    
    // Salvar automaticamente se configurado
    if (state.settings.autoSave && state.user) {
        saveFile(filename);
    }
}

async function typeCodeAnimation(editor, newCode) {
    return new Promise((resolve) => {
        const oldCode = editor.value;
        const duration = 1000; // ms
        const startTime = Date.now();
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Interpolação entre oldCode e newCode
            const interpolatedCode = interpolateCode(oldCode, newCode, progress);
            editor.value = interpolatedCode;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                editor.value = newCode;
                handleEditorChange();
                resolve();
            }
        }
        
        update();
    });
}

function interpolateCode(oldCode, newCode, progress) {
    if (progress < 0.5) {
        // Fase 1: Mostrar código antigo com destaque nas áreas que serão alteradas
        return oldCode;
    } else {
        // Fase 2: Transição suave para o novo código
        return newCode;
    }
}

// ==================== FIREBASE FUNCTIONS ====================

async function loginWithGitHub() {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    provider.addScope('read:user');
    
    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        const credential = result.credential;
        
        // Salvar token de acesso do GitHub
        const githubToken = credential.accessToken;
        localStorage.setItem('github_token', githubToken);
        
        showToast('Login com GitHub realizado com sucesso!', 'success');
        elements.loginModal.style.display = 'none';
    } catch (error) {
        console.error('Erro no login:', error);
        showToast('Erro no login: ' + error.message, 'error');
    }
}

function logout() {
    auth.signOut()
        .then(() => {
            localStorage.removeItem('github_token');
            showToast('Logout realizado com sucesso!', 'success');
        })
        .catch((error) => {
            console.error('Erro no logout:', error);
            showToast('Erro no logout: ' + error.message, 'error');
        });
}

async function updateUserData() {
    if (!state.user) return;
    
    try {
        const userDoc = await db.collection('users').doc(state.user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            state.user.displayName = userData.displayName || state.user.displayName;
            state.user.photoURL = userData.photoURL || state.user.photoURL;
        } else {
            await db.collection('users').doc(state.user.uid).set({
                displayName: state.user.displayName,
                email: state.user.email,
                photoURL: state.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
    }
}

// ... (continuam as outras funções do Firebase: saveProject, loadUserProjects, etc.)

// ==================== INTERFACE FUNCTIONS ====================

function updateUserUI() {
    if (state.user) {
        elements.loginBtn.style.display = 'none';
        elements.userInfo.style.display = 'flex';
        elements.userName.textContent = state.user.displayName || 'User';
        elements.userAvatar.src = state.user.photoURL || '';
        document.getElementById('ai-status').innerHTML = '<i class="fas fa-robot"></i> AI: Ready';
    } else {
        elements.loginBtn.style.display = 'block';
        elements.userInfo.style.display = 'none';
        document.getElementById('ai-status').innerHTML = '<i class="fas fa-robot"></i> AI: Login Required';
    }
}

function updateOnlineStatus() {
    const statusElement = document.getElementById('sync-status');
    if (navigator.onLine) {
        statusElement.innerHTML = '<i class="fas fa-cloud"></i> Sync: Online';
        statusElement.style.color = 'var(--success-color)';
    } else {
        statusElement.innerHTML = '<i class="fas fa-cloud"></i> Sync: Offline';
        statusElement.style.color = 'var(--warning-color)';
    }
}

// ==================== EDITOR FUNCTIONS ====================

function renderFileTree() {
    elements.fileTree.innerHTML = '';
    
    Object.keys(state.files).forEach(filename => {
        const file = state.files[filename];
        const fileItem = document.createElement('div');
        fileItem.className = `file-item ${state.currentFile === filename ? 'active' : ''}`;
        fileItem.dataset.filename = filename;
        
        let icon = 'fa-file';
        if (filename.endsWith('.html')) icon = 'fa-html5';
        else if (filename.endsWith('.css')) icon = 'fa-css3-alt';
        else if (filename.endsWith('.js')) icon = 'fa-js';
        else if (filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.gif')) icon = 'fa-image';
        
        fileItem.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${filename}</span>
            <div class="file-actions">
                <i class="fas fa-pencil-alt file-action" title="Rename"></i>
                <i class="fas fa-trash file-action" title="Delete"></i>
            </div>
        `;
        
        fileItem.addEventListener('click', (e) => {
            if (!e.target.classList.contains('file-action')) {
                openFile(filename);
            }
        });
        
        fileItem.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showContextMenu(e, filename);
        });
        
        // Event listeners para ações de arquivo
        const renameBtn = fileItem.querySelector('.fa-pencil-alt');
        const deleteBtn = fileItem.querySelector('.fa-trash');
        
        renameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            renameFile(filename);
        });
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteFile(filename);
        });
        
        elements.fileTree.appendChild(fileItem);
    });
}

function renderTabs() {
    elements.editorTabs.innerHTML = '';
    
    state.tabs.forEach(filename => {
        const tab = document.createElement('div');
        tab.className = `editor-tab ${state.currentFile === filename ? 'active' : ''}`;
        tab.dataset.filename = filename;
        
        let icon = 'fa-file';
        if (filename.endsWith('.html')) icon = 'fa-html5';
        else if (filename.endsWith('.css')) icon = 'fa-css3-alt';
        else if (filename.endsWith('.js')) icon = 'fa-js';
        
        tab.innerHTML = `
            <i class="fab ${icon}"></i> ${filename} <i class="fas fa-times close"></i>
        `;
        
        tab.addEventListener('click', (e) => {
            if (e.target.classList.contains('close')) {
                closeTab(filename);
            } else {
                openFile(filename);
            }
        });
        
        elements.editorTabs.appendChild(tab);
    });
}

function openFile(filename) {
    if (state.files[filename]) {
        state.currentFile = filename;
        
        if (!state.tabs.includes(filename)) {
            state.tabs.push(filename);
        }
        
        elements.codeEditor.value = state.files[filename].content;
        
        renderFileTree();
        renderTabs();
        updateCursorPosition();
        updateAIFileSelect();
        
        saveToHistory();
    }
}

function handleEditorChange() {
    if (state.currentFile && state.files[state.currentFile]) {
        state.files[state.currentFile].content = elements.codeEditor.value;
        
        if (state.settings.autoSave) {
            saveFile(state.currentFile);
        }
        
        updatePreview();
    }
}

function handleEditorKeydown(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = elements.codeEditor.selectionStart;
        const end = elements.codeEditor.selectionEnd;
        
        elements.codeEditor.value = elements.codeEditor.value.substring(0, start) + '    ' + elements.codeEditor.value.substring(end);
        elements.codeEditor.selectionStart = elements.codeEditor.selectionEnd = start + 4;
        handleEditorChange();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveAll();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
    }
}

function updateCursorPosition() {
    const textarea = elements.codeEditor;
    const textLines = textarea.value.substr(0, textarea.selectionStart).split("\n");
    const line = textLines.length;
    const col = textLines[textLines.length - 1].length + 1;
    
    document.getElementById('cursor-position').textContent = `Ln ${line}, Col ${col}`;
}

function updatePreview() {
    const htmlFile = state.files['index.html'];
    const cssFile = state.files['style.css'];
    const jsFile = state.files['script.js'];
    
    if (htmlFile) {
        let htmlContent = htmlFile.content;
        
        if (cssFile) {
            htmlContent = htmlContent.replace('</head>', `<style>${cssFile.content}</style></head>`);
        }
        
        if (jsFile) {
            htmlContent = htmlContent.replace('</body>', `<script>${jsFile.content}</script></body>`);
        }
        
        let previewStyle = '';
        if (state.settings.previewMode === 'mobile') {
            previewStyle = 'style="max-width: 375px; margin: 0 auto;"';
        } else if (state.settings.previewMode === 'desktop') {
            previewStyle = 'style="max-width: 100%;"';
        }
        
        elements.preview.innerHTML = `
            <iframe srcdoc="${htmlContent.replace(/"/g, '&quot;')}" 
                    ${previewStyle}
                    width="100%" 
                    height="100%" 
                    frameborder="0">
            </iframe>
        `;
    } else {
        elements.preview.innerHTML = '<p>Nenhum arquivo HTML encontrado. Crie um arquivo index.html para ver a prévia.</p>';
    }
}

// ... (continuam as outras funções: createNewFile, saveFile, exportAsZip, etc.)

function showToast(message, type = '') {
    elements.toast.textContent = message;
    elements.toast.className = `toast ${type}`;
    elements.toast.style.display = 'block';
    
    setTimeout(() => {
        elements.toast.style.display = 'none';
    }, 4000);
}

// Inicializar status de rede
updateOnlineStatus();

console.log('✅ VsCode-Tdc - Aplicação carregada com sucesso!');