function firsAndLastKNumbers(n, k) {
    let seq = [1];
    for(let current = 1; current < n; current++){
        let start = Math.max(0, current - k);
        let end = current - 1;
        let sum = start + end;
        seq[current] = sum;
    }
    console.log(seq.join(" "));
}
