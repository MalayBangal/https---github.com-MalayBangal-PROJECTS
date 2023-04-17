let add = (a,b)=>{
    a+b;
    return a+b;
}

function mean(fn){
    a+b/2;
    return a+b/2;
}

function tow(fn){
    return mean(fn)/2;

}

function isodd(num){
    
    if (num%2==1) {
        return 1;
    }
    return 0;
}

function oddnoarr(arr,isodd) {
    let ans = [];

    for(let i =0; i<arr.length;i++){
        if(isodd(arr[i])){
            ans.push(arr[i])
        }
        return ans;
    }
    
}

let arr =[1,2,3,4,5,6,7,8,9];
console.log(oddnoarr(arr,isodd));