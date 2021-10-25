exports.declensionAge = (n) => {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) { return ' лет'; }
    if (n1 > 1 && n1 < 5) { return ' года'; }
    if (n1 == 1) { return ' год'; }
    return ' лет';
}