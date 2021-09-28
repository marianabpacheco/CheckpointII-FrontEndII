const carregarTodos = async () => {

    //comunicação com a API
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const dados = await response.json()
    console.log(dados)
    // document.querySelector('.toDocard').innerHTML = dados[0].title;

    //criação de um template que representa um card e 
    //inserção dos elementos ID E title no  template
    dados.forEach(item => {
        const container = document.querySelector('.container');
        const template = document.querySelector('#templateCards');

        const toDoElement = document.importNode(template.content, true)
        
        const toDoItens = toDoElement.querySelectorAll('p');

        
        toDoItens[0].innerText = item.title;
        toDoItens[1].innerText = 'ID da tarefa: ' + item.id;

        //tachar elemento quando o status completed é true
        if(item.completed == true){
            toDoItens[0].style.textDecoration = 'line-through';
        }else{
            toDoItens[0].style.fontWeight = 'bold';
        }

        container.append(toDoElement);
    })
}

/*Carregar API quando a página carrega*/
window.onload = () => {
    carregarTodos()
}
