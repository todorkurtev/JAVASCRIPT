function biggestNumberInMatrix(matrixRows) {
    let matrix = matrixRows.map(
        row => row.split(' ').map(Number));
    let biggestNumber = Number.NEGATIVE_INFINITY;
    matrix.forEach(
    r => r.forEach(
        c => biggestNumber = Math.max(biggestNumber, c)));
    return biggestNumber;

}
console.log(biggestNumberInMatrix(['20 50 10', '8 33 145']));