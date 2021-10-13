exports.checkTerm = (val,dateFormatVal) => {
    return (Date.parse(new Date(Date.now())) > Date.parse(new Date(dateFormatVal))) ? 'бессрочно' : val
}
