function getlimit(zone) {
    switch (zone){
        case 'motorway' : return 130;
        case 'interstate' : return 90;
        case 'city' : return 50;
        case 'residential' : return 20;
    }
    function getInfractio(speed, limit) {
        let overSpeed = speed - limit;
        if (overSpeed <=0){
            return false;
        }
        else {

            }
        }
}
console.log(getlimit(40 , 'city'));
