exports.requiredForm = (fieldName,schema,error) => {
    let field = document.querySelectorAll(fieldName)
    for(let i = 0; i < field.length; i++){
        if(!field[i].value && schema[field[i].name] === true){
            error.value[field[i].name] = field[i].name
        }
    }
}

