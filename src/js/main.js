var appForm = document.querySelector("#app form");
var listaEl = document.querySelector("#app ul");

var xhttp = new XMLHttpRequest();
var url_base = 'https://api.github.com/';

var lista = [];

appForm.onsubmit = buscarRepo;

function buscarRepo(e) {
    e.preventDefault();

    var user = document.getElementById("input_user").value;
    if (user.length === 0) {
        alert("Por favor, preencha o campo de busca com nome do usuário do GitHub!");
        return;
    }

    var url = url_base + 'users/' + user + '/repos';
    xhttp.open('GET', url);
    xhttp.send();

    let repositorios = "Nome do repositório: ";
    let dataCriacao = "Data de Criação: ";
    let dataMoCommit = "Data do Último Commit: ";
    let DescricaoRepositorio = "Descrição do repositório: ";
    let LinguagemRepositorio = "Linguagem do repositório: ";
    let UrlmRepositorio = "URL do repositório: ";


    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                var result = JSON.parse(xhttp.responseText);

                lista = result.map(function(item) {
                    return {
                        name: item.name,
                        newcreated_at: item.created_at.substring(0, 10).split("-").reverse().join("/"),
                        updated_at: item.updated_at.substring(0, 10).split("-").reverse().join("/"),
                        description: item.description,
                        html_url: item.html_url,
                        language: LinguagemRepositorio + item.language
                    };
                });
                renderLista();
            } else {
                alert('Hove uma falha ao buscar usuário, Por favor tente novamente mais tarde.');
            }
        }
    }
}

function renderLista() {
    listaEl.innerHTML = '';

    for (item of lista) {
        var nameEl = document.createElement('strong');
        nameEl.appendChild(document.createTextNode(item.name));

        var newcreated_atEl = document.createElement('p');
        newcreated_atEl.appendChild(document.createTextNode(item.newcreated_at));

        var updated_atEl = document.createElement('p');
        updated_atEl.appendChild(document.createTextNode(item.updated_at));

        var descriptionEl = document.createElement('p');
        descriptionEl.appendChild(document.createTextNode(item.description));

        var languageEl = document.createElement('p');
        languageEl.appendChild(document.createTextNode(item.language));

        var urlEl = document.createElement('a');
        urlEl.setAttribute('href', item.html_url);
        urlEl.setAttribute('target', '_blank');
        urlEl.appendChild(document.createTextNode(item.html_url));

        var itemEl = document.createElement('li');
        itemEl.appendChild(nameEl);
        itemEl.appendChild(newcreated_atEl);
        itemEl.appendChild(updated_atEl);
        itemEl.appendChild(descriptionEl);
        itemEl.appendChild(languageEl);
        itemEl.appendChild(urlEl);

        listaEl.appendChild(itemEl);

    });
}


}



onload()