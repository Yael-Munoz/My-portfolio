
let result = document.getElementById("result");
let y = 0;


function appendToResult(button){

    try {
        
        if(button.textContent === `=`){
                result.textContent = eval(result.textContent);
                y = 1;
            }     
            else{
                switch(y){
                    case 1: {
                        y = 0;
                        clearResult();
                        break;
                    }
                    case 0:{
                        break;
                    }
                }
                result.textContent += button.textContent;
            }

    }
    catch(Error){
        result.textContent = `Error`;
    }

    
}

function clearResult(){
    result.textContent = ``;
}

