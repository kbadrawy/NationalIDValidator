const express = require("express");
const port = 8000;
var gov = require("./Gov.json"); // list of governorates
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("WELCOME");
});

app.get('/:id', (req, res) => {
  var id = req.params.id;
  if (isValid (id)){
      res.status(200).send(extractInfo(id));
  }
  else 
     res.status(400).send("This National ID Is Not Valid");
});

function isValid(ID){
  console.log(ID);
  if(ID.length!==14)return false;
  for(let i =0;i<ID.length;i++){
      if (!(ID[i] >= '0' && ID[i]<= '9')) {
        console.log("This ID contains non Integers");
          return false;
      } 
  }
  var century = ID.substring(0,1);
  var birthDate = ID.substring(1,7);
  var governorate = Number(ID.substring(7,9));
  var checker = ID.substring(13,14);
  if(Number(checker)===0)return false;
  return validateBirthdate(Number(century),birthDate)&&validateGovernorate(governorate);
}

function validateBirthdate(century , birthDate){ 
    var y =Number( birthDate.substring(0,2));
    var month = birthDate.substring(2,4);
    var day =birthDate.substring(4,6);
    var year = (17+century)*100+y; 
    switch(month){
      case "04":
      case "06":
      case "09":
      case "11": if (Number(day)>30)return false;break;
      case "02": 
      if (checkLeap(year)){
          if(Number(day)>29)return false;
      }else{
        if(Number(day)>28)return false;
      }break;
      case "01":
      case "03": 
      case "05":
      case "07":
      case "08":
      case "10":
      case "12":  if(Number(day)>31)return false; break;
      default:  return false; 
    }
    const birth_Date = new Date(year , month-1 , day);
    const d = new Date();
    if(d-birth_Date<0)return false;
    console.log("DATE OF BIRTH check");
    return true;
}

function checkLeap(year){
    if(year%4!=0)return false;
    if(year%100==0&&year%400!=0)return false;
    return true;
}
function validateGovernorate(governorate){
    if(Number(governorate)>35&&Number(governorate)!=88)return false;
    console.log("GOV check");
    return true;
}

// return all information we can get
function extractInfo(ID){
  // birth date details
  const century = Number(ID.substring(0,1));
  const birthDate = ID.substring(1,7) ;
  const y = Number(birthDate.substring(0,2));
  const month = Number(birthDate.substring(2,4));
  const day =birthDate.substring(4,6);
  const year = (17+century)*100+y; 
  // government
  const governorate = Number(ID.substring(7,9));
  // gender
  const gender = Number(ID.substring(12,13));
  const info={
    "Valid" : "YES",
    "Date of Birth":year+"/"+month+"/"+day,
    "Gender": (gender%2==0)?"Female":"Male",
    "Governorate": gov[governorate]
  };
  return info;
}

// starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });