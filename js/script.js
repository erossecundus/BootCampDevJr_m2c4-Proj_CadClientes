
function enableNumber(value){
  if(value)
    $("#inputNumber").prop("disabled", false);
  else
    $("#inputNumber").prop("disabled", true);


}

function search() {
  var cep = document.getElementById("inputPostal").value;
  var url = `https://viacep.com.br/ws/${cep}/json/`;

  $.getJSON( url, (location) => {

    console.log(location);

    document.getElementById("inputAddress").value = location.logradouro;
    document.getElementById("inputDistrict").value = location.bairro;
    document.getElementById("inputCity").value = location.localidade;
    document.getElementById("inputState").value = location.uf;

    

  });

}

