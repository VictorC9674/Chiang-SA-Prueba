users = [];

data = [
    {
        "user_login": "userA",
        "followers": ["userB","userD","userE","userG"],
        "followings": []
    },
    {
        "user_login": "userB",
        "followers": ["userC","userJ","userI","userE"],
        "followings": []
    },
    {
        "user_login": "userC",
        "followers": ["userM","userA","userJ","userI","userZ"],
        "followings": []
    },
    {
        "user_login": "userZ",
        "followers": ["userP","userN","userC","userJ","userK"],
        "followings": []
    }
];

$(document).ready(function () {
});

async function getUserFromData(login){
    result = {};
    for(element in data){
        if(data[element]['user_login'] == login){
            result = data[element];
        }
    }
    return result;
}

async function getFollowers(login){
    result = [];
    for(element in data){
        if(data[element]['user_login'] == login){
            result = data[element]['followers'];
        }
    }
    return result;
}

async function CalculateDistance(){
    distance = 0;
    message = "Error de datos ingresados";
    if(ValidateUsers()){
        userStart = $("#user_start").val();
        userEnd = $("#user_end").val();
        
	distance = await calculateDistanceBetweenUsers(userStart,userEnd);

	message = "Distancia entre '" + userStart + "' y '" + userEnd + "', es: " + distance;
    }   

    console.log(message);
    $("#response").html(message);
}

function calculateDistanceBetweenUsers(userStart, userEnd) {
	
  var distance = 0;
  var order = userStart > userEnd ? 1 : 0;
  var flaguser = userEnd;
  var found = false;
  var flag=false;
  switch (order) {
    case 0:
      do {
        found = false;

        data.forEach((o) => {
        
           console.log(o.user_login+ " User Primario");
             

          o.followers.forEach((followers) => {    
            console.log(followers + " User secundario" + "found "+ found);
            if (flaguser == followers) {
              if (!found) {
                distance++;
                flaguser = o.user_login;                
                found = true;
              }
            }
          });
          console.log(flaguser + " flaguser ");
        });
if (flaguser == userStart) {
    flag=true; 
}

      } while (!flag);
          break;
        case 1:
            do {      

        data.forEach((o) => {        
           console.log(o.user_login+ " User Primario");             
          o.followers.forEach((followers) => {    
            console.log(followers + " User secundario");
            if (flaguser == followers) {
              
                distance++;
                flaguser = o.user_login;                
                
              }
            
          });
          console.log(flaguser + " flaguser ");
        });
if (flaguser == userStart) {
    flag=true; 
}

      } while (!flag);
          break;
        }
    
	return distance;
}

function ValidateUsers(){
    let userStart = $("#user_start").val();
    let userEnd = $("#user_end").val();
    let response = false;

    if(userStart == "" || userStart == undefined || userStart == null){
        alert("Ingrese usuario de inicio");
    }
    else if(userEnd == "" || userEnd == undefined || userEnd == null){
        alert("Ingrese usuario de final");
    }
    else{
        response = true;
    }

    return response;
}