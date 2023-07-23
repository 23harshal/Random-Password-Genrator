const displayPassword = document.querySelector('.display');
const lengthPassword = document.querySelector('#data-inputNumber');
const inputSlider = document.querySelector('.slider');

const passStr = document.querySelector('#data-indicator');

const upperCaseChecked = document.querySelector('#uppercase');
const lowerCaseChecked = document.querySelector('#lowercase');
const numberChecked = document.querySelector('#number');
const symbolChecked = document.querySelector('#symbol');

const allCheckedBox = document.querySelectorAll('.chBox');

const genrateButton = document.querySelector('.genratebtn');

const symbol = '`!@#$%^&*()-_+={}[]:;<>,.?/';



let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();

//setIndicator('Str');


function handleSlider(){
    inputSlider.value = passwordLength;
    lengthPassword.innerText = passwordLength;
}

function setIndicator(passwordStrength){
    passStr.innerText = passwordStrength;
}


const getRadInteger = (min , max) =>{
    return Math.floor(Math.random() * (max - min)) + min;
}

function genrateRandomNumber(){
    return getRadInteger(0,9);
}

function genrateLowerCase(){
    return String.fromCharCode(getRadInteger(97,123));
}

function genrateUpperCase(){
    return String.fromCharCode(getRadInteger(65,91));
}
function genrateSymbol(){
    const num = getRadInteger(0,symbol.length);
    return symbol.charAt(num);
}

function calculateStrength(){
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(upperCaseChecked.checked) hasUpperCase = true;
    if(lowerCaseChecked.checked) hasLowerCase = true;
    if(numberChecked.checked) hasNumber = true;
    if(symbolChecked.checked) hasSymbol = true;

    if(hasUpperCase && hasLowerCase && (hasNumber || hasSymbol)
        && password.length >= 8
    )
    {
        setIndicator('Strong');
    }

    else if((hasLowerCase || hasUpperCase) && (hasSymbol || hasNumber)
        && password.length >= 6
    )
    {
        setIndicator('Medium');
    }
    else{
        setIndicator('Weak');
    }
}

function handleCheckedBoxChange(){
    checkCount = 0;

    // allCheckedBox.forEach('change' ,(checkbox) =>{
    //     if(checkbox.checked)
    //     checkCount++;
    // })
    allCheckedBox.forEach( (box)=>{
        if(box.checked)
            checkCount++;
    })
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

}

allCheckedBox.forEach((checkbox) =>{
    checkbox.addEventListener('change' , handleCheckedBoxChange);
})

inputSlider.addEventListener('input' , (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

genrateButton.addEventListener('click',()=>{
    if(checkCount <= 0){
        return;
    }

    if(passwordLength <= checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password="";

    let funArr=[];

    if(upperCaseChecked.checked) funArr.push(genrateUpperCase);
    
    if(lowerCaseChecked.checked) funArr.push(genrateLowerCase);
    
    if(numberChecked.checked) funArr.push(genrateRandomNumber);
    
    if(symbolChecked.checked) funArr.push(genrateSymbol);
    
    for(let i = 0 ; i<funArr.length;i++){

        password += funArr[i]();
    }
    
    for(let i = 0 ; i < passwordLength-funArr.length;i++){
        let randIndex = getRadInteger(0 , funArr.length);
        password += funArr[randIndex]();
    }
    console.log(password);
    displayPassword.style.color = 'white';
    displayPassword.style.fontSize = '16px';
    displayPassword.style.textIndent =  '30%';
    displayPassword.value = password;

    calculateStrength();
    
    
})