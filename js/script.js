
$('#inputPostal').mask('00000-000');

//guarda os clientes salvos
var clients = [];

//converte um CEP para número
function convertToNumber(cepFormat) {
  return cepFormat.replace('-', '');
}

//valida o CEP digitado no input
function validateCEP() {
  var cep = convertToNumber(document.getElementById("inputPostal").value);
  if(!isNaN(cep) && cep.length == 8) {
    search(cep);
    return 1;
  }
  else {
    showError("CEP inválido");
    clearFormLocation();
    disableNumber(true);
    disableSave(true);
    return 0;
  }

}

//habilita/desabilita o campo Número
function disableNumber(value){
  $("#inputNumber").prop("disabled", value);
}

function disableSave(value){
  $("#btnSave").prop("disabled", value);
}

//busca os dados de um CEP válido
function search(cep) {
  var url = `https://viacep.com.br/ws/${cep}/json/`;

  $.getJSON( url, (location) => {
    
    if (!("erro" in location)) {
      showLocation(location);
      disableNumber(false);
      clearError();
    }	
    else {
      showError("Não encontrado");
      clearFormLocation();
      disableNumber(true);
      disableSave(true);
    }
      
  });
}

//tratando erro de CEP
function showError(msg) {
  document.getElementById("error").innerHTML = msg;
}
function clearError() {
  document.getElementById("error").innerHTML = "";
}

//preenchimento automático do formulário
function showLocation(location) {
  document.getElementById("inputAddress").value   = location.logradouro || "";
  document.getElementById("inputDistrict").value  = location.bairro || "";
  document.getElementById("inputCity").value      = location.localidade || "";
  document.getElementById("inputState").value     = location.uf || "";
}

//limpa os campos de endereço do formulário
function clearFormLocation() {
  document.getElementById("inputNumber").value  = "";
  showLocation( {} );
}
//limpa o formulário inteiro
function resetForm() {
  clearFormLocation();
  document.getElementById("inputName").value    = ""; 
  document.getElementById("inputSurname").value = "";
  document.getElementById("inputPostal").value  = "";
}

//salva um novo cliente
function save() {
    var newClient = {
      id:       clients.length+1,
      name:     `${document.getElementById("inputName").value} ${document.getElementById("inputSurname").value}`,
      adress:   document.getElementById("inputAddress").value,
      number:   document.getElementById("inputNumber").value,
      postal:   document.getElementById("inputPostal").value,
      district: document.getElementById("inputDistrict").value,
      city:     document.getElementById("inputCity").value,
      state:    document.getElementById("inputState").value,
    }
  
    clients.push(newClient);
    addNewRow(newClient);
    
    resetForm();
    disableNumber(true);
    disableSave(true);
    console.log(newClient);
}

//carregaria a tabela se tivessem dados salvos
loadTable(); 

//carrega a tabela
function loadTable() {
  for(var client in clients) {
    addNewRow(client);
  }
}

//preenche a tablea com uma nova linha
function addNewRow(client) {
  var table = document.getElementById("clientTable");

  var newRow = table.insertRow();

  var idNode = document.createTextNode(client.id);
  newRow.insertCell().appendChild(idNode);

  var nameNode = document.createTextNode(client.name);
  newRow.insertCell().appendChild(nameNode);

  var adressNode = document.createTextNode(client.adress+", "+client.number);
  newRow.insertCell().appendChild(adressNode);

  var postalNode = document.createTextNode(client.postal);
  newRow.insertCell().appendChild(postalNode);

  var districtNode = document.createTextNode(client.district);
  newRow.insertCell().appendChild(districtNode);

  var cityNode = document.createTextNode(client.city);
  newRow.insertCell().appendChild(cityNode);

  var stateNode = document.createTextNode(client.state);
  newRow.insertCell().appendChild(stateNode);


  
  /*document.getElementById("clientTable").innerHTML += 
    `<tr>
      <th scope="row">1</th>
      <td>Nome da Silva</td>
      <td>Rua dos Bobos, 0</td>
      <td>18000-000</td>
      <td>Vila Sezamo</td>
      <td>Sorocity</td>
      <td>SP</td>
    </tr>`*/
}
