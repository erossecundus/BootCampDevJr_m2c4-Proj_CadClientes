
$("#inputPostal").mask("00000-000");

//guarda os clientes salvos
var clients = [];

//converte um CEP para número
function convertToNumber(cepFormat) {
  return cepFormat.replace("-", "");
}

//valida o CEP digitado no input
function validateCEP() {
  var cep = document.getElementById("inputPostal").value;
  cep = convertToNumber(cep);
  if(!isNaN(cep) && cep.length == 8) {
    search(cep);
  }
  else {
    showError("CEP inválido");
    return false;
  }
}

//busca os dados de um CEP válido
function search(cep) {
  var url = `https://viacep.com.br/ws/${cep}/json/`;

  $.getJSON( url, (location) => {
    
    if ("erro" in location) {
      showError("Não encontrado");
    }	
    else {
      showLocation(location);
      disableNumber(false);
      disableSave(false);
      clearError();
    }
  });
}

//habilita/desabilita o campo de Número
function disableNumber(value){
  $("#inputNumber").prop("disabled", value);
}

//habilita/desabilita botão salvar
function disableSave(value){
  $("#btnSave").prop("disabled", value);
}

//tratando erro de CEP
function showError(msg) {
  //document.getElementById("inputPostal").focus();
  document.getElementById("error").innerHTML = msg;
  clearFormLocation();
  disableNumber(true);
  disableSave(true);
}

//limpando mensagem de erro
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
  disableNumber(true);
  disableSave(true);
  resetForm();
}



//carrega a tabela
loadTable(); 

//carrega a tabela com os dados salvos no array
function loadTable() {
  for(let client in clients) {
    addNewRow(client);
  }
}

//preenche a tablea com uma nova linha
function addNewRow(client) {
  var table = document.getElementById("clientTable");

  var newRow = table.insertRow();

  var idNode = document.createTextNode(client.id);
  var cell = newRow.insertCell();
  cell.className = "fw-bold"
  cell.appendChild(idNode);

  var nameNode = document.createTextNode(client.name);
  newRow.insertCell().appendChild(nameNode);

  var adressNode = document.createTextNode(client.adress + ", " + client.number);
  newRow.insertCell().appendChild(adressNode);

  var postalNode = document.createTextNode(client.postal);
  newRow.insertCell().appendChild(postalNode);

  var districtNode = document.createTextNode(client.district);
  newRow.insertCell().appendChild(districtNode);

  var cityNode = document.createTextNode(client.city);
  newRow.insertCell().appendChild(cityNode);

  var stateNode = document.createTextNode(client.state);
  newRow.insertCell().appendChild(stateNode);
}
