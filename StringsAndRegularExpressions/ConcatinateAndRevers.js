function concatinateAndRevers(arr) {
    let allString = arr.join('');
    let chars = Array.from(allString);
    let revChar = chars.reverse();
    let revStr = revChar.join('');
    return revStr;
}

console.log(concatinateAndRevers(['Madafaka', 'kopele']));