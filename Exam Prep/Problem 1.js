function solve (input) {
    count = 1;
    biggestNumber = [];
    for (let i = 0; i < input.length; i++) {
        let num = Number(input[i]);
        if (num >= 0 && num < 10) {
            if (input[i] >= biggestNumber) {
                biggestNumber = input[i];

            }
        }
    }
    let start = biggestNumber;
    for(let i = input.length-start; i < input.length; i++){
        count = count * input[i];
      //  console.log(input[i]);
    }
   // for(let i = input.length - 1; i >= input.length-start; i--)
    console.log(count);
}
solve([
    "10",
    "20",
    "2",
    "30",
    "44",
    "123",
    "3",
    "56",
    "20",
    "24"
]);
