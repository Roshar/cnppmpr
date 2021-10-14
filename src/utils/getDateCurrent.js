exports.getDateCurrent = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let Data = new Date();
    let Hour = Data.getHours();
    let Minutes = Data.getMinutes();
    let Seconds = Data.getSeconds();

    today = mm + '-' + dd + '-' + yyyy + ' ' + Hour + ":" + Minutes + ":" + Seconds;
    return today
}