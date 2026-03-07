# JavaScript Q&A

---

## 1️⃣ What is the difference between var, let, and const?

`var` is the old way to declare variable which is initialized with `undefined`. It is risky as we can redeclare same variable in the same scope. `let` variables can be reassigned, but same variable cannot be redeclared in the same scope. `const` is like `let` but const values cannot be change. A `const` variable cannot be reassigned.

---

## 2️⃣ What is the spread operator (...)?

As the name suggest, spread operator unpacks array data like pulling out items from the bag.

```js
let array = [4,5,6,7,8];
const newArray = [11,12,...array];
console.log(newArray); //output: 11,12,4,5,6,7,8
```

---

## 3️⃣ What is the difference between map(), filter(), and forEach()?

- **`map()`:** Map is an array function which takes an array and returns new array via a callback function. Original array stays intact.
- **`filter()`:** filter is like `map()` function but it only takes the elements which meets the condition into the new array.
- **`forEach()`:** it loops through array, and takes a callback function.

---

## 4️⃣ What is an arrow function?

Arrow function is a anonymous function with shorter syntax and no own `this`. It collects `this` from parent/closest scope.

```js
const doSomething = () => {};
```

---

## 5️⃣ What are template literals?

To make dynamic string template literals is used. Inside the string with `${variable}` we can create string on runtime.