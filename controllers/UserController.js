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
    
            this.addLine(this.getValues());
        
        });

    }//fechando o metodo onSubmit()

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
                <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
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