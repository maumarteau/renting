

export const customRules = {
    isAdult: function ({ value }) {
        const age = getAge(value)
        return age>=18
    },
    documentID: ( {value} ) => {
        return isDocumentValid(value)
        
    },
    phone: (context, ...args) => {
        return context.value.validated
    }
}

export const customMessages = {
    es: {
        isAdult () {
            return `Debe ser mayor de edad`
        },
        documentID () {
            return `Documento inválido`
        },
    }
}


function getAge(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
}



function isDocumentValid(identification){
    if(identification.number && identification.type){
        if(identification.type == 'UY') {
            return validate_UY(identification.number)
        }
        return true
    }
    return false
}

function validate_AR(doc){
    var ex_regular_dni; 
    ex_regular_dni = /^\d{8}(?:[-\s]\d{4})?$/;
    if(ex_regular_dni.test (doc) == true){
        return true
    }else{
        return false
    }
}

function validate_UY(doc){
    doc = doc.replace(/\D/g, '');
    var dig = doc[doc.length - 1];
    doc = doc.replace(/[0-9]$/, '');
    return (dig == validation_UY_digit(doc))
}

function validation_UY_digit(doc){
    var a = 0;
    var i = 0;
    if(doc.length <= 6){
        for(i = doc.length; i < 7; i++){
        doc = '0' + doc;
        }
    }
    for(i = 0; i < 7; i++){
        a += (parseInt("2987634"[i]) * parseInt(doc[i])) % 10;
    }
    if(a%10 === 0){
        return 0;
    }else{
        return 10 - a % 10;
    }
}
    