function calculateCoins(input) {
    let coins = 0;
    let bronze = 0;
    let silver = 0;
    let gold = 0;

    for (let i = 0; i < input.length; i++) {
        let token = input[i].split(' ');
        let type = token[0].toLowerCase();
        let value = token[1];
        if(value > 0 && isInt(value) && type === 'coin' ){
            coins += parseInt(value)
        }
    }
    gold = Math.floor(coins / 100);
    coins = coins - gold*100;
    silver = Math.floor(coins/10);
    bronze = coins - silver*10;

    console.log('gold : ' + gold);
    console.log('silver : ' + silver);
    console.log('bronze : ' + bronze);

    function isInt(n) {
        return n % 2 === 0;
    }

}
calculateCoins(
    ['coin 1', 'coin two', 'coin 5', 'coin 10.50', 'coin 20', 'coin 50', 'coin hundred', 'cigars 1']
);