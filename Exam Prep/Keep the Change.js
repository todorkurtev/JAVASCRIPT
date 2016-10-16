function keepTheChange(input) {
    let bil = parseFloat(input[0]);
    let mood = input[1];

    let tip = getTip(bil, mood);
    console.log(tip.toFixed(2));
    
    function getTip(bil, mood) {
        let tipPercent;
        switch (mood){
            case 'drunk':
                let tip = 0.15*bil;
                return Math.pow(tip, tip.toString().charAt(0));
            case 'happy':
                tipPercent = 0.1;
                break;
            case 'married':
                tipPercent = 0.0005;
                break;
            default :
                tipPercent = 0.05;
                break;
        }
        return tipPercent * bil;
    }
}

keepTheChange(["120.44","happy"]);