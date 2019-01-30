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


/*  //find first unique caharcters
/*  s = "leetcode"
 return 0.
 
 s = "loveleetcode",
 return 2. */

 
/*  var firstUniqChar = function(s) {
 let a=s.toString().split('');
 let len=a.length;
for(var i=0;i<len;i++){
    if(a.indexOf(a[i])===a.lastindexOf(a[i])){
        return a[i];
    }
    return -1;
}
*/
/* Input: "42"
Output: 42
Example 2:

Input: "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign.
             Then take as many numerical digits as possible, which gets 42.
Example 3:

Input: "4193 with words"
Output: 4193
Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.
Example 4:

Input: "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical 
             digit or a +/- sign. Therefore no valid conversion could be performed. */
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


/*  //find first unique caharcters
/*  s = "leetcode"
 return 0.
 
 s = "loveleetcode",
 return 2. */

 
/*  var firstUniqChar = function(s) {
 let a=s.toString().split('');
 let len=a.length;
for(var i=0;i<len;i++){
    if(a.indexOf(a[i])===a.lastindexOf(a[i])){
        return a[i];
    }
    return -1;
}
*/
/* Input: "42"
Output: 42
Example 2:

Input: "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign.
             Then take as many numerical digits as possible, which gets 42.
Example 3:

Input: "4193 with words"
Output: 4193
Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.
Example 4:

Input: "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical 
             digit or a +/- sign. Therefore no valid conversion could be performed. */
             var myAtoi = function(str) {
                let a=str.split('');
                let space=a.indexOf(' ');
                let temp=[];
                let i;
                let output;
                
             
                if(space===-1){
                  
                   for(i=0;i<a.length;i++){
                    temp.push(a[i]);
                   
                }
                }else if(space===0){
                    for(i=1;i<a.length;i++){
                        temp.push(a[i]);
                       
                    }
                   
                }else if(space>1)
                  //count frsom first space    
                {
                  for(i=0;i<space;i++){
                      temp.push(a[i]);
                  }
            
                }
                
            
            output=parseInt(temp.join(''));
           
            
            return Math.max(-(2**31),Math.min(2**31 - 1, output));
Math.max()

           };
            

console.log(myAtoi(' -42'));