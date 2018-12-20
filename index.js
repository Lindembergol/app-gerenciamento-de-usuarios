var fields = document.querySelectorAll('#form-user-create [name]');
var user = {};

function addLine(dataUser){

    var tr = document.createElement('tr');

    //Templat String ou crase - serve para delimitar o texto
    tr.innerHTML = `
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

    document.getElementById('table-user').appendChild(tr);

}

document.getElementById('form-user-create').addEventListener('submit', (event) =>{

    //Cancela o comportamento padrao do evento
    event.preventDefault();

    fields.forEach(function(field, index){

        if (field.name == 'gender') {
    
            if (field.checked) {
                //add atributos e seus valores ao objeto Json
                user[field.name] = field.value;
            }
    
        } else {
            user[field.name] = field.value;
        }
    
    });

    addLine(user);

    console.log(user);

});