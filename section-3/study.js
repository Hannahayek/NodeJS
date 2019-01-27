/* const nums = [1,1,2];
remove duplicates
var threeSum = function(nums) {
    var sortedArray = nums.sort();
    var len = sortedArray.length - 1;
    var newArr = [];

    if (len >= 0) {
        for (var i = 0; i < len; i++) {
            if (sortedArray[i] !== sortedArray[i + 1]) {
                newArr.push(sortedArray[i]);
            }
        }
        newArr.push(sortedArray[len]);
    }
    return newArr



};

var output=threeSum(nums);
console.log(output); */

/* //reverse string
var input=["h","e","l","l","o"];
var reverseString = function(s) {
    var reversed=s.reverse();
    return reversed
};


console.log(reverseString(input)); *

/* //reverse integers https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/880/ */

/* var reverse = function(num) {
var reverse=num.toString();
let output=reverse.split('').reverse().join('');
let final=parseInt(output)*Math.sign(num);

if(Math.abs(final)>Math.pow(2,31)){
    final=0;
}


return final;
};

console.log(reverse(-1235));
 */


 //find first unique caharcters
/*  s = "leetcode"
 return 0.
 
 s = "loveleetcode",
 return 2. */

 
 var firstUniqChar = function(s) {
 let a=s.toString().split('');
 let len=a.length;
for(var i=0;i<len;i++){
    if(a.indexOf(a[i])===a.lastindexOf(a[i])){
        return a[i];
    }
    return -1;
}


};
var word="loveleetcode";
firstUniqChar(word);