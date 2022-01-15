function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelector(".close")
const sumbitModalBtn = document.querySelector(".btn-submit")
const errorSpan = document.getElementsByClassName("errorSpan")

const firstName = document.getElementById("first")
const lastName = document.getElementById("last")
const email = document.getElementById("email")
const birthdate = document.getElementById("birthdate")
const competQuantity = document.getElementById("quantity")
const locationCheckBox = document.querySelectorAll(".checkbox-location")
const requiredCheckBox = document.getElementById("checkbox1")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal function
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeModalBtn.addEventListener("click", closeModal)

// close modal function
function closeModal(){
  modalbg.style.display = "none"
}

/////////// function validate lancé au au submit  ///////////

function validate(event){

  // status de validation des différents input
  let status = {
    firstNameStatus : false,
    lastNameStatus : false,
    emailStatus : false,
    birthdateStatus : false,
    competQuantStatus : false,
    locationBoxStatus : false,
    requiredBoxStatus : false
  }
  // les indices correspondent entre les 2 objets
  // msg d'erreur
  let errorMsg = {
    firstNameErr : "Le prénom doit contenir au minimum 2 caractères",
    lastNameErr : "Le nom doit contenir au minimum 2 caractères",
    emailErr : "Veuillez saisir une adresse mail valide",
    birthdateErr : "Saisir une data au format jj/mm/aaaa",
    competQuantErr : "Seul les valeures numériques sont acceptés",
    locationBoxErr : "Vous devez sélectionner une ville au minimum",
    requiredBoxErr : "Vous devez accepter les conditions générales d'utilisation"
  }
  
  //test prénom
  if(firstName.value.length >= 2){        
    status.firstNameStatus = true
  }

  //test nom
  if(lastName.value.length >= 2){ 
    status.lastNameStatus = true
  }

  //test mail
  const mailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if(mailRegExp.test(email.value)){
    status.emailStatus = true
  }

  //test date de naissance
  let birthdateTab = birthdate.value.split('-')    // on transforme brithdate en [aaaa, mm, dd]
  if(birthdateTab[0].length == 4 && birthdateTab[1].length == 2 && birthdateTab[2].length == 2){   // on test le nombre d'élement
    if(!isNaN(birthdateTab[0]) && !isNaN(birthdateTab[1]) && !isNaN(birthdateTab[2])){             // on test si c'est des chiffres
      if(0<parseInt(birthdateTab[1]) &&  parseInt(birthdateTab[1])<13 && 0<parseInt(birthdateTab[2]) &&  parseInt(birthdateTab[2])<32){          // on test 1<=mm<=12 et 1<=jj=<31
        status.birthdateStatus = true
      }
    }
  }

  //test nb compétition
  if(!isNaN(competQuantity.value)){         // si l'input n'est pas vide et est un nombre
    status.competQuantStatus = true
  }

  // test box ville 
  locationCheckBox.forEach( (box) => {      // vérifie qu'une box localistion est checké
    if(box.checked){
      status.locationBoxStatus = true
    }
  })

  // test box CGU
  if(requiredCheckBox.checked){             // vérifie si la box est checké
    status.requiredBoxStatus = true
  }

  let arrayStatus = Object.values(status)         //on transforme l'objet status en tableau
  let arrayError = Object.values(errorMsg)        //on transforme l'objet errorMsg en tableau

  let globalIncrement = 0
  let globalTarget = arrayStatus.length

  for (let i=0; i<arrayStatus.length; i++){       // on parcour le tableau des statuts de validation
    if(arrayStatus[i] == false){                  // si non valide
      errorSpan[i].textContent = arrayError[i]    // on insère l'erreur dans errorSpan
    } else {
      errorSpan[i].textContent = ""               // si status true on efface l'errorSpan
      globalIncrement += 1
    }
  }

  let globalStatus = false                        //status du formulaire
  if (globalIncrement == globalTarget){           // si tout les test valide status formulaire = true
    globalStatus = true
  }

  if(globalStatus){                               // si formulaire valide window alert sinon bloque l'envoie
    window.alert("Merci ! Votre réservation a été reçue.")
  } else {
    event.preventDefault()
  }
}