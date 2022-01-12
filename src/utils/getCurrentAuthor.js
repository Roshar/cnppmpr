exports.getCurrentAuthor = (id,obj) => {
    return (!id) ? "Вы" : obj['lastname'] + ' '+ obj['name'] + ' '+ obj['patronymic']
}
