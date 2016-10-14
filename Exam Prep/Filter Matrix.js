function solve(arr) {
    let targetLenght = parseInt(arr.pop());
    var sequence = arr.join(' ').split(' ');

    var currentCount = 1;
    for (let i = 0; i < sequence.length; i++) {
        if(sequence[i] === sequence[i + 1]){
            currentCount++;
            if(currentCount == targetLenght){
                for( let k = i + 1; k > i + 1 - targetLenght; k--){
                    sequence[k] = false;
                }
                currentCount = 1;
            }
        } else{
            currentCount = 1
        }
    }
    let resultArr = [];
    let index = -1 ;
    for (let i = 0; i < arr.length; i++ ){
        let currentRow = arr[i].split(' ');
        let outputRow = [];
        for(let j = 0; j < currentRow.length; j++){
            if(sequence[++index] !== false){
                outputRow.push(sequence[index]);
            }
        }
        resultArr.push(outputRow);
    }
    while (resultArr.length > 0){
        let row = resultArr.shift();
        if(row.length > 0){
            console.log(row.join(' '));
        }else{
            console.log('(empty)')
        }
    }
}
solve([
   "3 3 3 2 5 9 9 9 9 1 2",
   "1 1 1 1 1 2 5 8 1 1 7",
   "7 7 1 2 3 5 7 4 4 1 2",
   "2"

]);