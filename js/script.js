// Declaração das constantes
const form = document.querySelector('form');
const pesquisaCep = document.querySelector('#cep');
const cadastrar = document.querySelector('#cadastrar');
const loginBotao = document.querySelector('#loginNavbar');

// limpar formulário
const limpaForm = () => {

    // limpar os valores nos campos dos formulários
    document.querySelector('#uf').value = '';
    document.querySelector('#cidade').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#logradouro').value = '';
};

// Callback 
const meuCallback = (conteudo) => {
    if (!('erro' in conteudo)) {

        // atualiza campos com os valores retornados pela API do ViaCep
        document.querySelector('#uf').value = (conteudo.uf);
        document.querySelector('#cidade').value = (conteudo.localidade);
        document.querySelector('#bairro').value = (conteudo.bairro);
        document.querySelector('#logradouro').value = (conteudo.logradouro);

    }
    else {

        //cep não encontrado
        limpaForm();
        alert('CEP não encontrado. Digite um novo CEP.');

    }
};

// invalida a submissão de dados do formulário
form.onsubmit = () => false;

// evento que preenche automaticamente os valores relacionados ao CEP informado pelo usuário
// blur é o evento "ao mudar o cursor, com clique fora ou tab"
pesquisaCep.addEventListener('blur', () => {

    // ***/\D/g *** significa qualquer texto ou símbolo
    let cep = pesquisaCep.value.replace(/\D/g, '');

    // verificar se o campo possui algum valor
    if (cep != '') {

        // validação do formato do cep: 8 dígitos numéricos
        let validaCEP = /^[0-9]{8}$/;

        if (validaCEP.test(cep)) {

            // cria elemento JS
            let script = document.createElement('script');

            // sincroniza callback
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meuCallback'

            // insere o script no documento e carrega o conteúdo
            document.body.appendChild(script);
        }
        else {

            //cep inválido
            limpaForm();
            alert('CEP inválido. Digite um novo CEP.');

        }

    }
});

// evento do botão Cadastrar
cadastrar.addEventListener('click', () => {
    let novoUsuario = document.querySelector('#novoUsuario');
    let termoUso = document.querySelector('#termos');
    let labelModal = document.querySelector('#tituloModal');

    // validação Termos e Uso (Checkbox)
    if (termoUso.checked) {
        labelModal.innerHTML = 'Cadastro realizado!';
        novoUsuario.innerHTML = '<strong>Dados pessoais </strong>' + '<br>' +
            'Nome do Usuário: ' + document.querySelector('#nome').value + '<br>' +
            'Sobrenome: ' + document.querySelector('#sobrenome').value + '<br>' +
            'E-mail: ' + document.querySelector('#email').value + '<br>' +
            'Data de Nascimento: ' + document.querySelector('#dataNasc').value + '<br>' +
            'Telefone: ' + document.querySelector('#telefone').value + '<br>' +
            'RG: ' + document.querySelector('#rg').value + '<br>' +
            'CPF: ' + document.querySelector('#cpf').value + '<br>' +
            'Gênero: ' + document.querySelector('#genero').value + '<br><hr>' +
            '<strong>Endereço </strong>' + '<br>' +
            'CEP: ' + document.querySelector('#cep').value + '<br>' +
            'UF: ' + document.querySelector('#uf').value + '<br>' +
            'Cidade: ' + document.querySelector('#cidade').value + '<br>' +
            'Bairro: ' + document.querySelector('#bairro').value + '<br>' +
            'Logradouro: ' + document.querySelector('#logradouro').value + '<br>' +
            'Número: ' + document.querySelector('#numero').value + '<br>' +
            'Complemento: ' + document.querySelector('#complemento').value + '<br>';
    }
    else {
        labelModal.innerHTML = 'Cadastro não realizado!';
        novoUsuario.innerHTML = 'É necessário aceitar os Termos e Condições de uso do Sistema';
    }
});

loginBotao.addEventListener('click', () => {
    let nomeUsuarioLogin = document.querySelector('#recipient-name');
    let senhaUsuarioLogin = document.querySelector('#inputPassword5-name');
    let loginNavbar = document.querySelector('#loginNavbar');

    if (!nomeUsuarioLogin.value & !senhaUsuarioLogin.value) {
    alert('Por favor preencha os campos corretamente');
    }
    else {
        alert('Login realizado com sucesso');
        loginNavbar.style.color = "red";
        loginNavbar.innerHTML = "Logout"
    }
})