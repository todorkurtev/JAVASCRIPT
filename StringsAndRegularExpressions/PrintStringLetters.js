function printStringLetters(str) {
    if(Array.isArray(str))
        str = str[0];
    for (let i in str)
        console.log(`str[${i}]`,"->", str[i]);
}
printStringLetters(['SoftUni']);
