
var obj = {"Id": "id", "Create": "date_created","No":"number","Due":"date_due","Supply":"date_supply","Comment":"comment"};

$(document).ready(function (){
  loadTable();
});

function showTable(table){
  $(document).find("#Table").empty();
  var c = [];
  c.push("<table class='table table-dark mt-3'>");
  c.push("<thead><tr><th>Create</th><th >No</th><th>Due</th><th>Supply</th><th>Comment</th></tr></thead>");
  c.push("<tbody>");
  $.each(table,function (i,invoice) {
      c.push("<tr row_id = " + invoice.id + "><td style='display: none'>" + invoice.id + "</td>");
      c.push("<td>" + invoice.date_created + "</td>");
      c.push("<td>" + invoice.number + "</td>");
      c.push("<td>" + invoice.date_due + "</td>");
      c.push("<td>" + invoice.date_supply + "</td>");
      c.push("<td>" + invoice.comment + "</td>");
      c.push('<td><span class="btn_edit" > <a href="change.html" class="btn btn-link " row_id="' + invoice.id + '" > Edit</a> </span></td>');
      c.push('<td><span class="btn_delete"> <a href="#" class="btn btn-link" row_id="' + invoice.id + '"> Delete</a> </span></td></tr>');
  });
  c.push("</tbody>");
  c.push('</table>')
  $('#Table').html(c.join(""));
}

function loadTable() {

    $.ajax({
        type: "GET",
        url: "https://igaprodtest2.herokuapp.com/invoices/",
        dataType: 'json',
        success: function(result){
            showTable(result);
        },
        error: function (e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}

$(document).on('click', '.btn_delete', function(event)
 {
     event.preventDefault();
     var tbl_row = $(this).closest('tr');
     var row_id = tbl_row.attr('row_id');
     deleteRow(row_id);
 });

$(document).on('click', '.btn_edit', function(event)
{
    event.preventDefault();
    var tbl_row = $(this).closest('tr');
    var row_id = tbl_row.attr('row_id');
    localStorage.setItem( 'id', row_id );
    document.location.href = "../html/change.html";
});

$(document).on('click', '#Go', function(event){
    event.preventDefault();

    var search = $("#search").val();
    var filter = $("#filter").val();
    var order = $("#order").val();
    var type = $("#type").val().toLowerCase();

    console.log(search);
    console.log(filter);
    console.log(order);
    console.log(type);

    getSearch(search, filter, order, type);
});

function getSearch(search, filter, order, type){
  var paramters;

  if(search=="" && order != "None"){
      paramters = "?_sort=" + obj[order] + "&_order=" + type;
  }
  if(search!="" && filter !="All"){
      paramters = "?" + obj[filter] + "=" + search + "&_sort=" + obj[order] + "&_order=" + type;
  }else{
      if(order !="None"){
        paramters = "?q=" + search + "&_sort=" + obj[order] + "&_order=" + type;
      }
      else {
        paramters = "?q=" + search;
      }
  }

  console.log(paramters);

  $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://localhost:3000/invoices" + paramters ,
      dataType: 'json',
      success: function(result){
          showTable(result);
      },
      error: function (e) {
          console.log("ERROR: ", e);
      }
  });
}

function deleteRow(RowId) {

   $.ajax({
       type: "DELETE",
       contentType: "application/json",
       url: "http://localhost:3000/invoices/" + RowId,
       dataType: 'json',
       success: function(result){
           loadTable();
           console.log(result);
       },
       error: function (e) {
           console.log("ERROR: ", e);
       }
   });

 }
