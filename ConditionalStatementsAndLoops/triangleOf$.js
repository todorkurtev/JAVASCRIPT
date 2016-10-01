function printTriangle(n) {
  function printDolars(count) {
    console.log("$".repeat(count));
  }
  for (let i=1; i<=n; i++)
    printDolars(i);
}

console.log(printTriangle(5));