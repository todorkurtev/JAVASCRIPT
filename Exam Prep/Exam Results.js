function solve(input){
    let targetCourse = input[input.length-1].trim();
    let counter = 0;
    sumOfGrades = 0;
    output = "";
    for (let i = 0; i < input.length; i++) {
        let currentLine = input[i].split(/\s+/).filter(function (e) {return e});
        if(currentLine[i] === targetCourse){
            counter++;
            sumOfGrades +=parseInt(currentLine[2]);
        }
        let examPoints = parseInt(currentLine[2]);
        if(examPoints <= 100){
            output += currentLine + 'failed at "' + currentLine[1] + '"\n';
            continue;
        }
        exam = examPoints * 0.2;
        let bonuses = parseFloat(currentLine[3]);
        let grade = (((exam + bonuses) / 80 ) *4 ) +2;
        if(grade <= 6.00){
            grade = 6.00;
        }
        output += currentLine[0]+
                ':Exam - ' + currentLine[1] +
                ':Points - ' + parseFloat((exam + bonuses).toFixed(2))+
                ':Grade - ' + grade.toFixed(2) + '\n';
    }
    output += '" + targetedCourse + "' + ' average points -> ' + parseFloat((sumOfGrades/counter).toFixed(2));
   console.log(output);

}
solve([
"Pesho C#-Advanced 100 3",
"Gosho Java-Basics 157 3",
"Tosho HTML&CSS 317 12",
"Minka C#-Advanced 57 15",
"Stanka C#-Advanced 157 15",
"Kircho C#-Advanced 300 0",
"Niki C#-Advanced 400 10",
"C#-Advanced"

]);