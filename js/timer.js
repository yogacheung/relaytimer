var timetable;
var hrs = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
var mins = ["00", "10", "20", "30", "40", "50"];

var tday = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
var tmonth = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

var cellmode = new Array(0, 0);

var first = true;

function inittable(){
  initdata();
  clock();
  
  if(first){
    readfile(function(res){
      //console.log(res);
      var v = res.split('\n');
      for(var i = 0; i < 144; i++){
        var w = v[i].split(',');
        for(var j = 0; j < 7; j++){
          timetable[i][j] = w[j];
        } 
      }
      first = false;
      drawtable();
    });  
  }
  setInterval(clock,1000);
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
  
  
  if(sshr == 'all') var sh = 0;
  else var sh = hrs.indexOf(sshr);

  if(ssmin == 'all') var sm = 0;
  else var sm = mins.indexOf(ssmin);

  if(eehr == 'all') var eh = 23;
  else var eh = hrs.indexOf(eehr);

  if(eemin == 'all') var em = 5;
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
  drawtable();
  resetform();
}

function remove(){
  var h = cellmode[0];
  var w = cellmode[1];
  timetable[h][w] = 1;

  //console.log(timetable[h][w]);
  savefile();
  drawtable();

}

function update(){
  var h = cellmode[0];
  var w = cellmode[1];
  //console.log(h, w);
  var mode = document.getElementById('cellmode');
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

  table += '<table class="table table-bordered" stype="border-spacing:10" align="center">';
  table += '<thead class="thead-dark"><tr>';
  table += '<th></th>';
  table += '<th scope="col" style="font-size: 120%;width:14.28%;text-align: -webkit-center;">Mon</th>';
  table += '<th scope="col" style="font-size: 120%;width:14.28%;text-align: -webkit-center;">Tue</th>';
  table += '<th scope="col" style="font-size: 120%;width:14.28%;text-align: -webkit-center;">Wed</th>';
  table += '<th scope="col" style="font-size: 120%;width:14.28%;text-align: -webkit-center;">Thu</th>';
  table += '<th scope="col" style="font-size: 120%;width:14.28%;text-align: -webkit-center;">Fri</th>';
  table += '<th scope="col" style="font-size: 120%;width:14.28%;text-align: -webkit-center;">Sat</th>';
  table += '<th scope="col" style="font-size: 120%;width:14.28%;text-align: -webkit-center;">Sun</th>';
  table += '</tr></thead>';

  table += '<tbody>';
  
  for(var hr = 0; hr < 24; hr++){    
    for(var min = 0; min < 6; min++){
      table += '<tr>';
      table += '<td class="align-middle" >' + hrs[hr] + ':' + mins[min] + '</td>';
      var v = hr*6+min;
      for(var i = 0; i < 7; i++){
        table += `<td style="text-align:center;"> 
        <a class="waves-effect waves-light btn modal-trigger" `
        if(timetable[v][i] == 1){
          table += `style="background-color: white; color:black; width:80%" `
        }else if(timetable[v][i] == 2){
          table += `style="color:black; width:80%" `
        }else{
          table += `style="background-color: orange; color:black; width:80%" `          
        }
        table += `href="#modal2" onclick="setcell(` + v + `, `+ i +`)">`+ timetable[v][i] +`</a>
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
      timetable[i][j] = 1;
    } 
  }
}

function readfile(callback){  
  $.ajax({            
    url: "php/readdata.php"   
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
  
  //console.log(data);

  $.ajax({
    type: 'POST',
    url: 'php/savedata.php',    
    data: data,
    dataType: 'text',
    success: function(resp){
      //console.log(resp);
    }
  });
}

function setcell(hm, w){
  cellmode[0] = hm;
  cellmode[1] = w;
  
  //console.log(cellmode[0], cellmode[1]);  
    
  //var c = document.getElementById("m2cell");  
  //c.innerHTML = "<h4>Edit - " + hm + ":" + w + "</h4>";
}

function resetform(){
    document.getElementById('mon').checked = false;
    document.getElementById('tue').checked = false;
    document.getElementById('wed').checked = false;
    document.getElementById('thu').checked = false;
    document.getElementById('fri').checked = false;
    document.getElementById('sat').checked = false;
    document.getElementById('sun').checked = false;
    document.getElementById('all').checked = false;
    document.getElementById('starthr').selectedIndex = 0;
    document.getElementById('startmin').selectedIndex = 0;
    document.getElementById('endhr').selectedIndex = 0;
    document.getElementById('endmin').selectedIndex = 0;
    document.getElementById('addmode').selectedIndex= 0;

}

function logout()
{
  window.location.href="index.html";
}

function clock(){
  var d = new Date();
  var nday = d.getDay(), nmonth = d.getMonth(), ndate = d.getDate(), nyear = d.getYear();
  if(nyear < 1000) nyear += 1900;
  var nhour = d.getHours(), nmin =  d.getMinutes(),nsec = d.getSeconds();
  
  if(nhour<=9) nhour="0"+nhour;
  if(nmin<=9) nmin="0"+nmin;
  if(nsec<=9) nsec="0"+nsec;
  
  document.getElementById('clockbox').innerHTML = " " + ndate + " "+ tmonth[nmonth] + " " + nyear + " (" + tday[nday] + ") " + nhour + ":" + nmin + ":" + nsec;
}