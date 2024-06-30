const formContainer = document.querySelector('.form_container');
const signupBtn = document.querySelector('#signup');
const loginBtn = document.querySelector('#login');
const pwShowHide = document.querySelectorAll('.pw_hide');


pwShowHide.forEach((icon) => {
    icon.addEventListener('click' , () => {
        let getPwInput = icon.parentElement.querySelector('input');
        if(getPwInput.type === "password"){
            getPwInput.type = "text"; 
            icon.classList.replace("bx-hide", "bx-show");
        }
        else{
            getPwInput.type = "password";
            icon.classList.replace("bx-show", "bx-hide");
        }
    })
})

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.add('active')
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.remove('active')
});
