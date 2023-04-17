class Student {
    constructor(name, age, rollNo) {
      this.name = name;
      this.age = age;
      this.rollNo = rollNo;
    }
  }
  
 
  let student1 = new Student("Mduf", 20, 101);
  let student2 = new Student("Afid", 19, 102);
  let student3 = new Student("Lfie", 21, 103);
  let student4 = new Student("Amdo", 18, 104);
  let student5 = new Student("Ywi", 22, 105);


  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }
  
  class Student extends Person {
    constructor(name, age, rollNo) {
      super(name, age);
      this.rollNo = rollNo;
    }
  }


  function outerFun(Value1) {
    function innerFun(Value2) {
      console.log("Outer value: " + Value1 + ", Inner value: " + Value2);
    }
    return innerFun;
  }
  
  let closure = outerFun("Hello");
  closure("World");