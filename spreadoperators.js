//spread: combine arrays
const arr1=[1,2,3];
const arr2=[4,5,6];
const combinedArr=[...arr1,...arr2];
console.log(combinedArr);

//rest: collect remaining elements
function sum(...numbers){
    return numbers.reduce((acc, curr)=> acc+curr,0);
}
console.log(sum(1,2,3,4,5));