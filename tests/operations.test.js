var operations = require("../functions/operations");
 
describe("Operation Tests", function(){
it("should multiply two numbers", function(){
     
    var expectedResult = 15;
    var result = operations.multiply(3, 5);
    if(result!==expectedResult){
         throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});
});

describe("new tests", function(){
    it("should multiply two numbers", function(){
         
        var expectedResult = 15;
        var result = operations.multiply(3, 5);
        if(result!==expectedResult){
            throw new Error(`Expected ${expectedResult}, but got ${result}`);
        }
    });
    });

    