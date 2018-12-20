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

            let values = this.getValues();

            this.getPhoto((content)=>{

                //O atributo photo recebe uma url da img
                values.photo = content;

                this.addLine(values);

            });
        
        });



    }//fechando o metodo onSubmit()

    getPhoto(callback){

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
            callback(fileReader.result);

        };

        fileReader.readAsDataURL(file);

    }//Fechamento do metodo getPhoto

    /**
     * Metodo para pegar todos os elementos do formulario e percorrer o mesmo,
     * cria e retorna um objeto User.
     * Spread ou ... - Expressão esperando múltiplos parâmetros (transforma uma 
     * Coleção Html em um array).
     */
    getValues(){

        let user = {};

        //Percorrendo os elementos do formulario e armazenando no objeto Json
        [...this.formEl.elements].forEach(function(field, index){

            if (field.name == 'gender') {
        
                if (field.checked) {
                    //add atributos e seus valores ao objeto Json
                    user[field.name] = field.value;
                }
        
            } else {
                user[field.name] = field.value;
            }
        
        });
    
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

        //Templat String ou crase - serve para delimitar o texto
        this.tableEl.innerHTML = `
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `;
        
    }//fechando o metodo addLine()

}//Fechando a classe UserController

//FileReader - Api nativa no js, útil para ler e manipular arquivos ou pastas