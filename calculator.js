function add(a, b){
    a = +a;
    b = +b;
    return a + b;
}

function subtract(a, b){
    a = +a;
    b = +b;
    return a - b;
}

function multiply(a, b){
    a = +a;
    b = +b;
    return a * b;
}

function divide(a, b){
    a = +a;
    b = +b;
    if (b === 0){
        return;
    }
    return a / b;
}

function operate(num1, num2, opr){
    switch(opr){
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            console.log("operator not found");
    }
}

const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
    btn.addEventListener("click", e => {processInput(btn)});
})
const backBtn = document.querySelector(".back");
backBtn.addEventListener("click", e => undoInput());
const numberBtns = document.querySelectorAll(".number-btn");

const validNumber = "1234567890";
const validOperator = "+-*/";
let numbers = validNumber.split("");
let operators = validOperator.split("");
let operand1 = undefined;
let operand2 = undefined;
let operator = undefined;
let result = 0;
function processInput(btn){
    // get input value from btn
    let input = btn.textContent;
    // if input is a number, process that ipnut to determine it is stored in operand1 opr operand2
    if (numbers.includes(input)){
        processNumber(input);
    }
    // process operator if input is valid operator
    else if (operators.includes(input)){
        if (input == "-" || input == "+"){
            if (operand1 === undefined){
                processNumber(input);
            }
            else if (operand2 === undefined && operator !== undefined){
                processNumber(input);
            }   
            else {
                processOperator(input);
            }
        }
        else{
            processOperator(input);
        }
        
    }
    // after 2 number and 1 operator is input = -> calculate if all operand and operator is filled
    else if (input === "="){ 
        if (operand1 != undefined && operand2 != undefined && operator != undefined){
            result = operate(operand1, operand2, operator);
            operand1 = result;
            clearDisplay(2);
            display(result);
            
        }
    }
    // process decimal number -> only allow entering 1 decimal point
    else if (input === "." || input === ","){
        // operand1 is decimal
        if (operand2 === undefined && operator === undefined){
            let num = +operand1;
            if (!isDecimalNumber(num)){
                operand1 += ".";
                display(".");
            }
            else {
                console.log(operand1 + " is already decimal");
            }
        }
        else if (operand2 !== undefined && operator !== undefined){
            let num = +operand2;
            if (!isDecimalNumber(num)){
                operand2 += ".";
                display(".")
            }
            else {
                console.log(operand2 + " is already decimal");
            }
        }
    }
}

function undoInput(){
    // check what element to undo -> remove last element in the string
    if (operand2 !== undefined){
        operand2 = removeLastElem(operand2);
        if (operand2[0] == null){
            operand2 = undefined;
        }
    }
    else if (operator !== undefined){
        operator = undefined;
    }
    else if (operand1 !== undefined){
        operand1 = removeLastElem(operand1);
        if (operand1[0] == null){
            operand1 = undefined;
        }
    }
    displayUndoContent();
}

function removeLastElem(str){
    console.log(typeof str);
    str = String(str);
    let tmp = str.split("");
    tmp.pop();
    return tmp.join("");
}


function isDecimalNumber(val){
    return val > Math.floor(val);
}

function processNumber(val){
    if (operand1 === undefined){
        clearDisplay(3);
        operand1 = val;
    }
    else if (operator !== undefined && operand2 === undefined){
        operand2 = val;
    }
    else if (operator === undefined && operand2 === undefined){
        operand1 += val;
    }
    else if (operand2 !== undefined && operator !== undefined){
        operand2 += val;
    }
    display(val);
}


function processOperator(opr){
    // if no expression has been made -> assign opr to operator
    if (operator === undefined){
        operator = opr;
    }
    // else calculate with current operand and operator before assign new operator
    else{
        // check if 2 oeprands and operator is assigned
        if (operand1 != undefined && operand2 != undefined && operator != undefined){
            operand1 = operate(operand1, operand2, operator);
            clearDisplay(2);
            display(operand1);
            operator = opr;
        }
    }
    display(opr);
}

const displayContainer = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", e => clearDisplay(3));
function clearDisplay(args){
    displayContainer.textContent = "";
    switch (args){
        case 1:
            operand1 = undefined;
            break;
        case 2:
            operator = undefined;
            operand2 = undefined;
            break;
        case 3:
            operand1 = undefined;
            operator = undefined;
            operand2 = undefined;
    }
}
function display(content){
    let num = Number(content);
    if (Math.ceil(num) > num){
        content = (Math.round(num * 1000000) / 1000000).toFixed(6);
    }
    let displayContent = displayContainer.textContent;
    displayContent = displayContent + content;
    displayContainer.textContent = displayContent;
    //console.log(operand1 + " " + operator + " " + operand2);
}

function displayUndoContent(){
    let displayContent = displayContainer.textContent;
    let arr = displayContent.split("");
    arr.pop();
    displayContent = arr.join("");
    console.log(displayContent);
    displayContainer.textContent = displayContent;
    //console.log(operand1 + " " + operator + " " + operand2);
}