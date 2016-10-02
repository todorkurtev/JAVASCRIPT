function validateEmail([email]) {
    let patern = /^[a-zA-Z0-9]+\@[a-z]+\.[a-z]+$/g;
    let result = patern.test(email);

    if(result){
        console.log('Valid');
    }
    else
        console.log('Invalid');
}