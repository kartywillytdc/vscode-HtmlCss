// Firebase Configuration and Application Logic
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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Configurar persistência offline
db.enablePersistence()
  .catch((err) => {
      console.log('Persistência offline não suportada: ', err);
  });

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
    <title>Meu Site</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Bem-vindo ao Meu Site</h1>
        <nav>
            <a href="#home">Home</a>
            <a href="#about">Sobre</a>
            <a href="#contact">Contato</a>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Página Inicial</h2>
            <p>Este é um exemplo de site criado com o WebDev IDE.</p>
            <button onclick="changeText()">Clique Aqui</button>
        </section>
        
        <section id="about">
            <h2>Sobre</h2>
            <p>Este site foi criado com HTML, CSS e JavaScript.</p>
        </section>
        
        <section id="contact">
            <h2>Contato</h2>
            <p>Entre em contato conosco!</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 Meu Site. Todos os direitos reservados.</p>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`,
            type: 'html'
        },
        'style.css': {
            name: 'style.css',
            content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f9f9f9;
}

header {
    background-color: #007acc;
    color: white;
    padding: 1rem 0;
    text-align: center;
}

nav {
    margin-top: 1rem;
}

nav a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;
}

nav a:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}

section {
    background-color: white;
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

h1, h2 {
    margin-bottom: 1rem;
}

button {
    background-color: #007acc;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #005a9e;
}

footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem 0;
    margin-top: 2rem;
}

@media (max-width: 600px) {
    nav {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    nav a {
        margin: 0.5rem 0;
        width: 80%;
        text-align: center;
    }
}`,
            type: 'css'
        },
        'script.js': {
            name: 'script.js',
            content: `function changeText() {
    const title = document.querySelector('h1');
    const button = document.querySelector('button');
    
    if (title.textContent === 'Bem-vindo ao Meu Site') {
        title.textContent = 'Texto Alterado!';
        button.textContent = 'Voltar ao Normal';
    } else {
        title.textContent = 'Bem-vindo ao Meu Site';
        button.textContent = 'Clique Aqui';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 50,
            behavior: 'smooth'
        });
    });
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site carregado com sucesso!');
});`,
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
    loadingScreen: document.getElementById('loading-screen')
};

// Inicialização
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Configurar observador de autenticação primeiro
    setupAuthListener();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Carregar configurações salvas
    loadSettings();
    
    // Verificar chaves de API de IA
    checkAIConfig();
    
    // Esconder tela de loading após 2 segundos
    setTimeout(() => {
        elements.loadingScreen.style.display = 'none';
    }, 2000);
}

function setupAuthListener() {
    // Observador de estado de autenticação
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            state.user = user;
            await updateUserData();
            updateUserUI();
            loadUserProjects();
            showToast('Login realizado com sucesso!', 'success');
        } else {
            state.user = null;
            state.currentProject = null;
            updateUserUI();
            resetToDefaultFiles();
            showToast('Logout realizado com sucesso!', 'success');
        }
    });
}

async function updateUserData() {
    if (!state.user) return;
    
    // Buscar dados adicionais do usuário no Firestore
    const userDoc = await db.collection('users').doc(state.user.uid).get();
    if (userDoc.exists) {
        const userData = userDoc.data();
        state.user.displayName = userData.displayName || state.user.displayName;
        state.user.photoURL = userData.photoURL || state.user.photoURL;
    } else {
        // Criar documento do usuário se não existir
        await db.collection('users').doc(state.user.uid).set({
            displayName: state.user.displayName,
            email: state.user.email,
            photoURL: state.user.photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
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
    document.getElementById('configure-ai').addEventListener('click', showAIModal);
    
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
    });
    
    // Fechar menu de contexto ao clicar fora
    document.addEventListener('click', function() {
        elements.contextMenu.style.display = 'none';
    });
    
    // Detectar mudanças de rede
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

// Funções de autenticação
function loginWithGitHub() {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    provider.addScope('read:user');
    
    auth.signInWithPopup(provider)
        .then(async (result) => {
            // O login foi bem-sucedido
            const user = result.user;
            const credential = result.credential;
            
            // Salvar token de acesso do GitHub
            const githubToken = credential.accessToken;
            localStorage.setItem('github_token', githubToken);
            
            showToast('Login com GitHub realizado com sucesso!', 'success');
        })
        .catch((error) => {
            console.error('Erro no login:', error);
            showToast('Erro no login: ' + error.message, 'error');
        });
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

// Funções do Firebase Firestore
async function saveProject() {
    if (!state.user) {
        showToast('Faça login para salvar projetos', 'warning');
        return;
    }
    
    if (!state.currentProject) {
        // Criar novo projeto
        const projectName = prompt('Nome do projeto:');
        if (!projectName) return;
        
        state.currentProject = {
            name: projectName,
            files: state.files,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        try {
            const docRef = await db.collection('projects').add({
                name: projectName,
                files: state.files,
                userId: state.user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            state.currentProject.id = docRef.id;
            showToast('Projeto criado e salvo com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao salvar projeto:', error);
            showToast('Erro ao salvar projeto: ' + error.message, 'error');
        }
    } else {
        // Atualizar projeto existente
        try {
            await db.collection('projects').doc(state.currentProject.id).update({
                files: state.files,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            showToast('Projeto salvo com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao atualizar projeto:', error);
            showToast('Erro ao salvar projeto: ' + error.message, 'error');
        }
    }
    
    // Recarregar lista de projetos
    loadUserProjects();
}

async function loadUserProjects() {
    if (!state.user) return;
    
    try {
        const querySnapshot = await db.collection('projects')
            .where('userId', '==', state.user.uid)
            .orderBy('updatedAt', 'desc')
            .get();
        
        state.projects = [];
        querySnapshot.forEach((doc) => {
            state.projects.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        renderProjectsList();
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        showToast('Erro ao carregar projetos: ' + error.message, 'error');
    }
}

async function loadProject(projectId) {
    try {
        const doc = await db.collection('projects').doc(projectId).get();
        if (doc.exists) {
            const projectData = doc.data();
            state.currentProject = {
                id: doc.id,
                ...projectData
            };
            state.files = projectData.files;
            
            // Atualizar interface
            renderFileTree();
            renderTabs();
            if (state.currentFile && state.files[state.currentFile]) {
                elements.codeEditor.value = state.files[state.currentFile].content;
            }
            updatePreview();
            
            showToast(`Projeto "${projectData.name}" carregado com sucesso!`, 'success');
            elements.projectsModal.style.display = 'none';
        }
    } catch (error) {
        console.error('Erro ao carregar projeto:', error);
        showToast('Erro ao carregar projeto: ' + error.message, 'error');
    }
}

async function createNewProject() {
    const projectName = prompt('Nome do novo projeto:');
    if (!projectName) return;
    
    // Resetar para arquivos padrão
    resetToDefaultFiles();
    state.currentProject = null;
    
    // Atualizar interface
    renderFileTree();
    renderTabs();
    updatePreview();
    
    showToast(`Novo projeto "${projectName}" criado!`, 'success');
    elements.projectsModal.style.display = 'none';
}

// Funções de interface (mantidas do código anterior)
function toggleFileExplorer() {
    elements.fileExplorer.classList.toggle('collapsed');
}

function toggleTheme() {
    elements.sidebar.classList.toggle('expanded');
}

function showLoginModal() {
    elements.loginModal.style.display = 'flex';
}

function showAIModal() {
    elements.aiModal.style.display = 'flex';
    elements.loginModal.style.display = 'none';
}

function showSettingsModal() {
    elements.settingsModal.style.display = 'flex';
    document.getElementById('auto-save-setting').value = state.settings.autoSave ? 'on' : 'off';
    document.getElementById('font-size').value = state.settings.fontSize;
    document.getElementById('preview-mode').value = state.settings.previewMode;
}

function showProjectsModal() {
    if (!state.user) {
        showLoginModal();
        return;
    }
    elements.projectsModal.style.display = 'flex';
    loadUserProjects();
}

function showGitHubModal() {
    if (!state.user) {
        showLoginModal();
        return;
    }
    elements.githubModal.style.display = 'flex';
    loadRepositories();
}

function showGitHubPagesModal() {
    if (!state.user) {
        showLoginModal();
        return;
    }
    elements.githubPagesModal.style.display = 'flex';
    populateRepoSelect();
}

function updateUserUI() {
    if (state.user) {
        elements.loginBtn.style.display = 'none';
        elements.userInfo.style.display = 'flex';
        elements.userName.textContent = state.user.displayName || 'User';
        elements.userAvatar.src = state.user.photoURL || '';
    } else {
        elements.loginBtn.style.display = 'block';
        elements.userInfo.style.display = 'none';
    }
}

function updateOnlineStatus() {
    const statusElement = document.getElementById('sync-status');
    if (navigator.onLine) {
        statusElement.textContent = 'Sync: Online';
        statusElement.style.color = 'var(--success-color)';
    } else {
        statusElement.textContent = 'Sync: Offline';
        statusElement.style.color = 'var(--warning-color)';
    }
}

// As demais funções (renderFileTree, renderTabs, openFile, handleEditorChange, etc.)
// permanecem as mesmas do código anterior, apenas adaptadas para usar o Firebase

// Função para resetar para arquivos padrão
function resetToDefaultFiles() {
    state.files = {
        'index.html': {
            name: 'index.html',
            content: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Projeto</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Novo Projeto</h1>
    <p>Comece a editar seus arquivos!</p>
    <script src="script.js"></script>
</body>
</html>`,
            type: 'html'
        },
        'style.css': {
            name: 'style.css',
            content: `body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
}`,
            type: 'css'
        },
        'script.js': {
            name: 'script.js',
            content: `console.log('Novo projeto iniciado!');`,
            type: 'js'
        }
    };
    state.currentFile = 'index.html';
    state.tabs = ['index.html'];
}

// Renderizar lista de projetos
function renderProjectsList() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    
    state.projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <div>
                <div class="project-name">${project.name}</div>
                <div class="project-date">${new Date(project.updatedAt?.toDate()).toLocaleDateString()}</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="loadProject('${project.id}')">Abrir</button>
        `;
        
        projectsList.appendChild(projectItem);
    });
}

// As demais funções do código anterior permanecem aqui...
// (renderFileTree, renderTabs, openFile, handleEditorChange, updatePreview, etc.)

// Função para mostrar notificações
function showToast(message, type = '') {
    elements.toast.textContent = message;
    elements.toast.className = `toast ${type}`;
    elements.toast.style.display = 'block';
    
    setTimeout(() => {
        elements.toast.style.display = 'none';
    }, 3000);
}

// Inicializar status de rede
updateOnlineStatus();
