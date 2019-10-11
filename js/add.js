$(document).ready(function (){
  $(".btn").click(function (event) {
        event.preventDefault();
        getValue();
    });

});

function getValue(){

  var data = $('#addForm').serializeArray();
  var id = create_ID();
  var direction = create_UUID();

  var formData = {
      id: id,
      direction: direction,
      number: parseInt(data[0].value),
      date_created: data[1].value,
      date_due: data[2].value,
      date_supply: data[3].value,
      comment: data[4].value
  }

  addInvoices(formData);

}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


function create_ID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function addInvoices(data) {

       $.ajax({
           type: "POST",
           contentType: "application/json",
           url: "https://igaprodtest2.herokuapp.com/invoices",
           data: JSON.stringify(data),
           dataType: 'json',
           success: function(result){
               console.log(result);
           },
           error: function (e) {
               loadFaculty();
               console.log("ERROR: ", e);
           }
       });
}
