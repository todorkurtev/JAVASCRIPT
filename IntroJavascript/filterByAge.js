function filterByAger([minAge, nameA, ageA, nameB, ageB]){
    let personA = {name:nameA, age:Number(ageA)};
    let personB = {name:nameB, age:Number(ageB)};
    if (personA.age >= minAge)
        console.log(personA);
    if (personB.age >= minAge)
        console.log(personB);
}

//filterByAger(['15' , 'Todor' , '23' , 'Dimitur' , '13']);