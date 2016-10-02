function expressionSplit(input) {
    let expresion = input[0];
    let element = expresion
        .split(/[\s.(;,)]+/)
        .filter(x => x != '');
    console.log(element.join("\n"))
}
expressionSplit(
    ['let sum = 4 * 4,b = "wow";']);
