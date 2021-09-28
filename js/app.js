//pegar data atual do sistema para exibir no input travado da data de criação

const creationDate = document.querySelector('#creationDate');

let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
creationDate.value = day + "/" + month + "/" + year;

document.addEventListener("onload", executarRotinas()); //
function executarRotinas() {
    let localStorageKeyName = 'data';

    carregarDoLocalStorage();

    document.querySelector('#submitBtn').addEventListener('click', (e) => {
        e.preventDefault();

        let limitDate = document.querySelector("#limitDate");
        let description = document.querySelector("#description");
        let error = document.querySelector('.error');
     
        // validação dos campos
        if (description.value == "" || limitDate.value == "") {
            error.innerHTML = 'O preenchimento de ambos os campos é obrigatório!'
            return
        }
      
        //cria o card
        let cards = {
            creationDate: creationDate.value,
            limitDate: limitDate.value,
            description: description.value
        }

        //limpar os dados
        limitDate.value = "";
        description.value = "";
        error.innerHTML = "";
     
        adicionarAoLocalStorage(cards);
    })


    //Função para adicionar cards ao Local Storage
    function adicionarAoLocalStorage(obj) {
        let cards = [],
            dadosNoLocalStorage = localStorage.getItem(localStorageKeyName);

        if (dadosNoLocalStorage !== null) {
            cards = JSON.parse(dadosNoLocalStorage);
        }

        cards.push(obj);

        localStorage.setItem(localStorageKeyName, JSON.stringify(cards));

        carregarDoLocalStorage();
    }


    function carregarDoLocalStorage() {
        let cards = [],
            dadosNoLocalStorage = localStorage.getItem(localStorageKeyName),
            containerCard = document.querySelector(".containerCard");

        if (dadosNoLocalStorage !== null) {
            cards = JSON.parse(dadosNoLocalStorage);
        }

        // Criar cards na section container cards
        containerCard.innerHTML = '';

        cards.forEach(function (x, i) {

            //Criação dos elementos com Create Element
            let card = document.createElement('div')
            descriptionCard = document.createElement("div"),
                descriptionCheck = document.createElement("input"),
                description = document.createElement("p"),
                datesCard = document.createElement("div"),
                datesUl = document.createElement("ul"),
                liCreationDate = document.createElement("li"),
                liLimitDate = document.createElement("li");
            btnRemove = document.createElement("button");

            //Inserção do conteúdo dentro dos elementos
            liCreationDate.innerHTML = 'Data de criação: ' + creationDate.value;
            liLimitDate.innerHTML = 'Data limite: ' + x.limitDate;
            description.innerHTML = x.description;

            // Adição dos nomes das classes das tags HTML
            card.className = 'taskCard'
            descriptionCard.className = 'descriptionCard';
            description.className = 'description';
            datesCard.className = 'datesCard';
            datesUl.className = 'datesUl';
            liCreationDate.className = 'liCreationDate';
            liLimitDate.className = 'liLimitDate';
            descriptionCheck.className = 'descriptionCheck';


            // Adicionando atributos ao elemento input
            descriptionCheck.setAttribute("type", "checkbox");
            descriptionCheck.id = 'checkbox';
           

            //Adição do conteúdo e classe do botão
            btnRemove.textContent = 'X';
            btnRemove.className = 'btnRemove';

            //Confirmação de exclusão do botão
            btnRemove.addEventListener('click', function () {
                let confirmation = confirm("Deseja mesmo excluir essa tarefa?");

                if (confirmation) {
                    removeFromLocalStorage(i);
                }
            });

            //Tachar elemento se o checkbox for selecionado
            document.querySelectorAll('input[type=checkbox]').forEach((elemento) => {
                elemento.addEventListener('change', (e) => {
                    let p = e.target.parentNode.querySelector('.description');
                    p.style.textDecoration = (e.target.checked) ? "line-through" : "";
                    p.style.color = (e.target.checked) ? '#5f6c7b' : "#094067";
                });
            });
         
         

            // Adicionando os elementos
            card.appendChild(descriptionCard);
            descriptionCard.appendChild(descriptionCheck);
            descriptionCard.appendChild(description);
            card.appendChild(datesCard);
            datesCard.appendChild(datesUl);
            datesUl.appendChild(liCreationDate);
            datesUl.appendChild(liLimitDate);
            card.appendChild(btnRemove);
            containerCard.appendChild(card);
        });


        //Remover do Local Storage
        function removeFromLocalStorage(index) {
            let cards = [],
                dadosNoLocalStorage = localStorage.getItem(localStorageKeyName);

            cards = JSON.parse(dadosNoLocalStorage);

            cards.splice(index, 1);

            localStorage.setItem(localStorageKeyName, JSON.stringify(cards));

            carregarDoLocalStorage();
        }
    }

}
