var timetable;
var hrs = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
var mins = ["00", "10", "20", "30", "40", "50"];
var first = true;

function inittable(){
  initdata();
  
  readfile(function(res){
    //console.log(res);
    var v = res.split('\n');
    for(var i = 0; i < 144; i++){
      var w = v[i].split(',');
      for(var j = 0; j < 7; j++){
        timetable[i][j] = w[j];
      } 
    }
    drawtable();
  });
}

function checking(){
  // not yet
}

function checkallday(){
  var all = document.getElementById('all').checked;
  if(all){
    document.getElementById('mon').checked = true;
    document.getElementById('tue').checked = true;
    document.getElementById('wed').checked = true;
    document.getElementById('thu').checked = true;
    document.getElementById('fri').checked = true;
    document.getElementById('sat').checked = true;
    document.getElementById('sun').checked = true;
  }
  else {
    document.getElementById('mon').checked = false;
    document.getElementById('tue').checked = false;
    document.getElementById('wed').checked = false;
    document.getElementById('thu').checked = false;
    document.getElementById('fri').checked = false;
    document.getElementById('sat').checked = false;
    document.getElementById('sun').checked = false;
  };
}

function add(){
  var mode = document.getElementById('addmode');
  var smode = mode.options[mode.selectedIndex].value;
  
  var mon = document.getElementById('mon').checked;
  var tue = document.getElementById('tue').checked;
  var wed = document.getElementById('wed').checked;
  var thu = document.getElementById('thu').checked;
  var fri = document.getElementById('fri').checked;
  var sat = document.getElementById('sat').checked;
  var sun = document.getElementById('sun').checked;

  var starthr = document.getElementById('starthr');
  var sshr = starthr.options[starthr.selectedIndex].value;

  var startmin = document.getElementById('startmin');
  var ssmin = startmin.options[startmin.selectedIndex].value;

  var endhr = document.getElementById('endhr');
  var eehr = endhr.options[endhr.selectedIndex].value;

  var endmin = document.getElementById('endmin');
  var eemin = endmin.options[endmin.selectedIndex].value;

  /*
  console.log(smode);
  console.log(mon);
  console.log(tue);
  console.log(wed);
  console.log(thu);
  console.log(sat);
  console.log(sun);
  console.log(sshr);
  console.log(ssmin);
  console.log(eehr);
  console.log(eemin);
  */
  
  if(sshr == 'All') var sh = 0;
  else var sh = hrs.indexOf(sshr);

  if(ssmin == 'All') var sm = 0;
  else var sm = mins.indexOf(ssmin);

  if(eehr == 'All') var eh = 23;
  else var eh = hrs.indexOf(eehr);

  if(eemin == 'All') var em = 5;
  else var em = mins.indexOf(eemin);

  var sv = sh * 6 + sm;
  var ev = eh * 6 + em;

  for(var i = sv ; i <= ev; i++ ){
    for(var j = 0; j < 7; j++){
      if(mon && j == 0){
        timetable[i][j] = parseInt(smode);        
      }
        
      if(tue && j == 1){
        timetable[i][j] = parseInt(smode);;
      }
        
      if(wed && j == 2){
        timetable[i][j] = parseInt(smode);
      }
      if(thu && j == 3){
        timetable[i][j] = parseInt(smode);
      }

      if(fri && j == 4){
        timetable[i][j] = parseInt(smode);
      }        
        
      if(sat && j == 5){
        timetable[i][j] = parseInt(smode);
      }
      if(sun && j == 6){
        timetable[i][j] = parseInt(smode);
      }            
    }
  }
  
  savefile();
  first = false;  
  drawtable();




}

function remove(h ,w){
  timetable[h][w] = 1;

  //console.log(timetable[h][w]);
  drawtable();
  savefile();
}

function update(h, w){
  //console.log(h, w);
  var mode = document.getElementById('cellmode'+ h +'_'+ w);
  var smode = mode.options[mode.selectedIndex].value;

  //console.log(smode);

  timetable[h][w] = parseInt(smode);

  //console.log(timetable[h][w]);
  savefile()
  drawtable();
}

function drawtable(){
  //console.log('refresh');
  //console.log(timetable[6][0]);
  var t = document.getElementById("table");  

  var table = '';

  table += '<table class="table" border="1" stype="border-spacing:10" font-size="5%">';
  table += '<thead class="thead-dark"><tr>';
  table += '<th></th>';
  table += '<th scope="col">Monday</th>';
  table += '<th scope="col">Tuesday</th>';
  table += '<th scope="col">Wednesday</th>';
  table += '<th scope="col">Thursday</th>';
  table += '<th scope="col">Friday</th>';
  table += '<th scope="col">Saturday</th>';
  table += '<th scope="col">Sunday</th>';
  table += '</tr></thead>';

  table += '<tbody>';
  
  for(var hr = 0; hr < 24; hr++){    
    for(var min = 0; min < 6; min++){
      table += '<tr>';
      table += '<td class="align-middle">' + hrs[hr] + ':' + mins[min] + '</td>';
      var v = hr*6+min;
      for(var i = 0; i < 7; i++){
        table += `<td > 
        <button class="btn btn-primary" id="b`+ v + `_` + i +`" type="button" data-toggle="collapse" data-target="#update`+ v + `_` + i +`" aria-expanded="false" aria-controls="update`+ v + `_` + i +`">
          `+ timetable[v][i] +`  
          </button>        
        <div class="collapse" id="update`+ v + `_` + i +`">
          <div class="card card-body" style="width: 100%">
                  
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="cellmode`+ v + `_` + i +`">Mode</label>
                  <select id="cellmode`+ v + `_` + i +`" class="form-control">
                    <option selected>1</option>              
                    <option>2</option>
                    <option>3</option>                
                  </select>
                </div>
              </div>
              <button class="btn btn-primary" onclick="remove(`+ v + `,` + i +`)">Remove</button>
              <button class="btn btn-primary" onclick="update(`+ v + `,` + i +`)">Update</button>

        </td>`;
      }
      table += '</tr>';
    }    
  }

  table += '</tbody></table>';  

  t.innerHTML = table;
}

function initdata(){
  var h = new Array(144);
  for(var m = 0; m < h.length; m++){
    h[m] = new Array(7);
  }
 
  timetable = h;

  for(var i = 0; i < 144; i++){
    for(var j = 0; j < 7; j++){
      timetable[i][j] = 0;
    } 
  }
}

function readfile(callback){  
  $.ajax({            
    url: "readdata.php" 
  })
  .done(callback);      
}

function refresh(){
  // readfile(function(res){
  //   //console.log(res);
  //   var v = res.split('\n');
  //   for(var i = 0; i < 144; i++){
  //     var w = v[i].split(',');
  //     for(var j = 0; j < 7; j++){
  //       timetable[i][j] = w[j];
  //     } 
  //   }
  //   drawtable();
  // });
  location.reload();
}

function savefile(){
  var data = '';
  
  for(var i = 0; i < 144; i++){
    for(var j = 0; j < 7; j++){
      data += timetable[i][j];
      if(j < 6) data += ',';
      else if(i < 143) data += '\n';
    } 
  }
  
  console.log(data);

  $.ajax({
    type: 'POST',
    url: 'savedata.php',
    data: data,
    dataType: 'text',
    success: function(resp){
      //console.log(resp);
    }
  });
}

function logout()
{
  window.location.href="index.html";
}

