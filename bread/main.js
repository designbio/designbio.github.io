$(document).ready(function() {

  /* Today's Date */
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }
  var today = dd+'/'+mm+'/'+yyyy;

  var chart = null;

  /* Dummy Data */
  var hours = [1, 2, 3, 4, 5];
  var A = [12, 10, 3, 5, 2, 3];
  var B = [4, 1, 5, 6, 8, 15];
  var C = [10, 12, 13, 9, 11, 3];

  function getData() {
    if ($("input[name=organism][value=A]").is(":checked")) {
      return A;
    } else if ($("input[name=organism][value=B]").is(":checked")) {
      return B;
    } else if ($("input[name=organism][value=C]").is(":checked")) {
      return C;
    } else {
      return [];
    }
  };

  $('#generate').click(function() {

    if (chart != null){
        chart.destroy();
    }

    var data = getData();
    var ctx = $('#recipe-graph');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: hours,
          datasets: [{
            label: 'Organism',
            data: data,
            backgroundColor: [
              'rgba(0, 0, 0, 0)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            left: 150,
            right: 150,
            top: 50,
            bottom: 50
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      }
    });

    /*
    // code to dynamically update
    $('#organism').change(function(){
      chart.data.datasets[0].data = [];
      chart.data.datasets[0].data = getData();
      chart.update();
    });
    */

    $('#graph').css('display','block');

    $('html,body').animate({
      scrollTop: $('#graph').offset().top}, 'slow');

  });

  var $form = $('form#design-form'),
    url = 'https://script.google.com/macros/s/AKfycbzhEfnv_D_dfIr7fLRjOYaa-uwcPE1B226Nu-HVpkcIkKoyQlUI/exec'

  /* Add Date to JSON */
  var formData = $form.serializeArray();
  var dateObj = {
    name: 'date',
    value: today
  }
  formData['3'] = dateObj;

  $('#save').on('click', function(e) {
    e.preventDefault();
    var jqxhr = $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      data: formData,
      success: function (response) {
        if (response) {
          alert('Recipe Saved!');
          window.location.replace('index.html');
        }
      },
      failure: function (response) {
        alert(response);
      }
    });
  });



});