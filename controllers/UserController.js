class UserController{

    //Pegando como parametro o Id do formulario
    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }

    onSubmit(){

        //Adicionando um evento 'submit' no formulario
        this.formEl.addEventListener('submit', event =>{

            //Cancela o comportamento padrao do evento
            event.preventDefault();

            //Procurando dentro do form o botão submit
            let btn = this.formEl.querySelector('[type=submit]');

            btn.disabled = true;

            let values = this.getValues();

            if (!values) return false;

            this.getPhoto().then(
                (content)=>{

                    values.photo = content;

                    this.addLine(values);

                    this.formEl.reset();

                    btn.disabled = false;

                }, 
                (e)=>{
                    console.error(e);
                }   

            );
        
        });



    }//fechando o metodo onSubmit()

    getPhoto(){

        //Promise - É uma intenção, uma promessa. Executa uma ação assíncrona. 
        return new Promise((resolve, reject) => {

            //FileReader - Api nativa no js, útil para ler e manipular arquivos ou pastas
            //Sincrono - Toda ação entre site e usuario ocorre em sincronia
            //Assíncorno - Atividades e recursos do site não depedem da ação do usuario
            
            let fileReader = new FileReader();

            /**
             * filter() - Filtrando o array de elementos, com base numa condição e retornando apenas o elemento photo
             * Retorna um novo arrays apenas com os dados filtrados.
             */
            let elements = [...this.formEl.elements].filter(item => {

                if (item.name === 'photo'){

                    return item;

                }

            })

            //index 0, para pegar somente o elemento e files[0](pega a tag em si) para pegar apenas um unico arquivo
            let file = elements[0].files[0];

            //onload - quando essa foto terminar de carregar a img, execute essa função
            //Função de callback
            fileReader.onload = () => {

                //Vou ter o conteudo do arquivo, no caso vem como url (base64)
                //resolve - Parametro para quando a promessa é executada com sucesso
                resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {

                //reject - Parametro para quando a promessa retorna algum erro
                reject(e);

            };

            if (file){

                fileReader.readAsDataURL(file);

            } else {
                //Caso não ache o arquivo, retorna uma img padrao
                resolve('dist/img/userPadrao.png');
            }

        });

    }//Fechamento do metodo getPhoto

    /**
     * Metodo para pegar todos os elementos do formulario e percorrer o mesmo,
     * cria e retorna um objeto User.
     * Spread ou ... - Expressão esperando múltiplos parâmetros (transforma uma 
     * Coleção Html em um array).
     */
    getValues(){

        let user = {};
        let isValid = true;

        //Percorrendo os elementos do formulario e armazenando no objeto Json
        [...this.formEl.elements].forEach(function(field, index){

            //indexOf - Realiza uma busca dentro de array, se não encontrar retorna -1
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error');
                isValid = false;
                //return false; //Para não executar

            }

            if (field.name == 'gender') {
        
                if (field.checked) {
                    //add atributos e seus valores ao objeto Json
                    user[field.name] = field.value;
                }
        
            }else if (field.name == 'admin'){

                user[field.name] = field.checked;

            } else {

                user[field.name] = field.value;

            }
        
        });

        if (!isValid){
            return false;
        }
    
        //Instanciando e retornando um objeto da classe User
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country,
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );

    }//Fechando o metodo getValue()

    addLine(dataUser){

        let tr = document.createElement('tr');

        /**
         * dataset só guarda string
         * JSON.stringify(dataUser) - Converter o objeto para string Json
         * Serializar - transformar um objeto em texto, sem perder as informações
        */
        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML= `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        
        `;

        //Templat String ou crase - serve para delimitar o texto
        //appendChild - Permite adicionar código html, como elemento filho do elemento atual
        this.tableEl.appendChild(tr); 

        this.updateCount();
        
    }//fechando o metodo addLine()

    updateCount(){

        let numberUsers = 0;
        let numberAdmin = 0;

        //this.tableEl.children - é uma coleção html, pra percorrer é preciso converter em arrays
        [...this.tableEl.children].forEach(tr => {

            numberUsers++;

            //JSON.parse(tr.dataset.user) - onverter string Json para um objeto
            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++;

        });

        document.querySelector('#number-users').innerHTML = numberUsers;
        document.querySelector('#number-users-admin').innerHTML = numberAdmin;

    }

}//Fechando a classe UserController