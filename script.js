let listElement = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");

let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || []; //desconverter de string para lista

function renderTarefas(){
    listElement.innerHTML = "";
    
    tarefas.map((todo) => { // percorro todo o array
        let liElement = document.createElement("li"); //crio os itens da lista
        let tarefaText = document.createTextNode(todo); // crio o texto para cada item da lista

        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");

        let linkText = document.createTextNode("🗑️");
        linkElement.appendChild(linkText);

        let posicao = tarefas.indexOf(todo);
        linkElement.setAttribute("onclick", `deletarTarefa(${posicao})`);

        liElement.appendChild(tarefaText); // mando o texto pro item da lista
        liElement.appendChild(linkElement);
        listElement.appendChild(liElement); // manda o item da lista pra lista
    });
}


renderTarefas();


function adicionarTarefas(){
    if(inputElement.value === ''){ // se ele n digitou nada 
        alert("Digite alguma tarefa!");
        return false;
    }else{
        let novaTarefa = inputElement.value; // criei uma variável pra pegar oq o usuário digitou
        tarefas.push(novaTarefa); //puxo o input pra lista
        inputElement.value = ''; // limpo o input
        renderTarefas();
        salvarDados();
    }
}

buttonElement.onclick = adicionarTarefas;


function deletarTarefa(posicao){
    tarefas.splice(posicao, 1); // Deleta o item
    renderTarefas();
    salvarDados();
}


// salvando no local storage
function salvarDados(){
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas)); // transformando a lista em string, pq so aceita em string
}