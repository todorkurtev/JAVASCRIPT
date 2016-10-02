function extractUsernames(inputEmails) {
    let result = [];
    for(let email of inputEmails){
        let [alias, domain] = email.split('@');
        let username = alias + '.';
        let domainParts = domain.split('.');
        domainParts.forEach(p => username += p[0]);
        result.push(username);
    }
    console.log(result.join(', '));
}
extractUsernames(['pesho@gmail.com', 'tod_or@mail.dir.bg']);
