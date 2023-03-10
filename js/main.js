var form = document.getElementById("my-form");
var nameError = document.getElementById("name-error");
var emailError = document.getElementById("email-error");
var phoneError = document.getElementById("phone-error");
var messageError = document.getElementById("message-error");
var submitError = document.getElementById("submit-error");


function validateName(){
    var name = document.getElementById("contact-name").value;
    if(name.length == 0) {
        nameError.innerHTML = "Nome é obrigatório";
        return false;
    }
    nameError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

function validatePhone(){
    var phone = document.getElementById("contact-phone").value;
    if(phone.length == 0) {
        phoneError.innerHTML = "Contacto é obrigatório!";
        return false;
    }
    if(phone.length !== 9) {
        phoneError.innerHTML = "Coloque um contacto correto!";
        return false;
    }

    if(!phone.match(/^[0-9]{9}$/)) {
        phoneError.innerHTML = "Coloque um contacto correto!";
        return false;
    }

    phoneError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

function validateEmail(){
    var email = document.getElementById("contact-email").value;
    if(email.length == 0) {
        emailError.innerHTML = "E-mail é obrigatório!";
        return false;
    }


    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        emailError.innerHTML = "Coloque um email correto!";
        return false;
    }

    emailError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

function validateMessage(){
    var message = document.getElementById("contact-message").value;
    var required = 10;
    var left = required - message.length;

    if(left > 0) {
        messageError.innerHTML = "Mais " + left + " caracteres necessários!";
        return false;
    }
    messageError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

function validateForm() {
  var isNameValid = validateName();
  var isPhoneValid = validatePhone();
  var isEmailValid = validateEmail();
  var isMessageValid = validateMessage();
  
  return isNameValid && isPhoneValid && isEmailValid && isMessageValid;
}

    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("submit-button");

      if (!validateForm()) {
        submitError.innerHTML = "Por favor, preencha todos os campos corretamente.";
        return;
      } else {
        nameError.innerHTML = "";
        emailError.innerHTML = "";
        phoneError.innerHTML = "";
        messageError.innerHTML = "";
        submitError.innerHTML = "";
      }

      
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.style.color = "green";
          status.innerHTML = "Mensagem enviada!";
          status.classList.add("success"); // adiciona classe "success" ao elemento de status
          form.reset();
          setTimeout(function() {
            status.innerHTML = "Enviar mensagem"; // remove o texto do elemento de status
            status.style.color = "";
          }, 3000);
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)