var operations = require("./functions/operations");
 
it("should multiply two numbers", function(){
     
    var expectedResult = 15;
    var result = operations.multiply(3, 5);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});