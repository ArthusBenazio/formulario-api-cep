'use strict';



const clearForm = (endereco) => {
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}



const dadosForm = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const isNumber = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && isNumber(cep)

const pesquisarCep = async () => {
    clearForm();
    const cep = document.getElementById('cep').value.replace("-","");
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')) {
            alert("CEP não encontrado!")
            return
        } else {
            dadosForm(endereco);
        }
    } else {
        alert("CEP incorreto!")
            return
    }
    

};


document.getElementById('cep').addEventListener('focusout', pesquisarCep);