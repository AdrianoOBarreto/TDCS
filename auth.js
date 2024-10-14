class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class Auth {
    constructor() {
        this.users = [];
    }

    registerUser(name, email, password) {
        if (this.isEmailRegistered(email)) {
            this.showError('registerError', 'E-mail já cadastrado.');
            return false;
        }

        const newUser = new User(name, email, password);
        this.users.push(newUser);
        this.showError('registerError', ''); // Limpa mensagem de erro
        return true;
    }

    loginUser(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);

        if (user) {
            window.location.href = 'main.html';
        } else {
            this.showError('loginError', 'Usuário ou senha inválidos.');
        }
    }

    isEmailRegistered(email) {
        return this.users.some(u => u.email === email);
    }

    validatePassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    showError(elementId, message) {
        document.getElementById(elementId).innerText = message;
    }
}

// Instância global de Auth
const auth = new Auth();

document.getElementById('loginButton').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.loginUser(email, password);
});

document.getElementById('registerButton').addEventListener('click', function() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (auth.validatePassword(password, confirmPassword)) {
        const success = auth.registerUser(name, email, password);
        if (success) {
            // Fecha o modal após o cadastro
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            registerModal.hide();
        }
    } else {
        auth.showError('registerError', 'As senhas não coincidem.');
    }
});
