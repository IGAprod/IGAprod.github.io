
var formData;
$(document).ready(function (){
  var id = localStorage['id'];
  localStorage.removeItem( 'id' );
  getInvoice(id);

  $(".btn").click(function (event) {
        event.preventDefault();
        getForm();
    });
});

function loadValue(data){

  formData = {
      id: data.id,
      direction: data.direction,
      number: parseInt(data.number),
      date_created: data.date_created,
      date_due: data.date_due,
      date_supply: data.date_supply,
      comment: data.comment
  }
  $("#number").val(data.number);
  $("#date_created").val(data.date_created);
  $("#date_due").val(data.date_due);
  $("#date_supply").val(data.date_supply);
  $("#comment").val(data.comment);

}

function getForm(){

  var data = $('#changeForm').serializeArray();
  var json = {
      id: formData.id,
      direction: formData.direction,
      number: data[0].value,
      date_created: data[1].value,
      date_due: data[2].value,
      date_supply: data[3].value,
      comment: data[4].value
  }

  addInvoice(json);

}

function addInvoice(data) {

       $.ajax({
           type: "PUT",
           contentType: "application/json",
           url: "https://igaprodtest2.herokuapp.com/invoices/" + data.id,
           data: JSON.stringify(data),
           dataType: 'json',
           success: function(result){
               console.log(result);
           },
           error: function (e) {
               console.log("ERROR: ", e);
           }
       });
}

function getInvoice(id) {

       $.ajax({
           type: "GET",
           contentType: "application/json",
           url: "https://igaprodtest2.herokuapp.com/invoices/"+id,
           dataType: 'json',
           success: function(result){
               console.log(result);
               loadValue(result);
           },
           error: function (e) {
               console.log("ERROR: ", e);
           }
       });
}
