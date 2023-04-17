Array.prototype.myMap = function(callbackFn) {
    var arr = [];              
    for (var i = 0; i < this.length; i++) { 
       
       
      arr.push(callbackFn(this[i], i, this));
    }
    return arr;
  }

  Array.prototype.myFilter = function(callbackFn) {
    var arr = [];     
    for (var i = 0; i < this.length; i++) {
      if (callbackFn.call(this, this[i], i, this)) {
        arr.push(this[i]);
      }
    }
    return arr;
  }

  function mapPolyfill(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(callback(arr[i]));
    }
    return result;
  }

let newArray = mapPolyfill(arr,function(e){
    return e*2
})
  
console.log(newArray);

let arr = [1,2,3,-5,-7,-9,4,8,-1];

let newArray = arr.filter(callback(currentValue, accumulatedValue) {
    
  }, initialValue[, thisArg]);