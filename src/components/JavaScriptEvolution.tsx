'use client';

import { useState } from 'react';

const codeExamples = [
  {
    title: 'Variable Declarations',
    description: 'How we declare variables has evolved dramatically',
    then: {
      year: '1995',
      code: `// JavaScript 1.0 - var only
var x = 5;
var y = 10;
var name = "JavaScript";

// Function scope issues
function test() {
  if (true) {
    var x = 20;
  }
  return x; // Returns 20, not 5!
}`,
    },
    now: {
      year: 'ES2024',
      code: `// Modern JavaScript - const, let, block scope
const x = 5;
let y = 10;
var name = "JavaScript"; // Still works but discouraged

// Block scope protection
function test() {
  if (true) {
    const x = 20;
  }
  return x; // Returns 5! ✅
}`,
    },
  },
  {
    title: 'Functions',
    description: 'From function declarations to arrow functions',
    then: {
      year: '1995',
      code: `// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression
var multiply = function(a, b) {
  return a * b;
};

// 'this' binding issues
var self = this;
setTimeout(function() {
  console.log(self.value);
}, 100);`,
    },
    now: {
      year: 'ES2024',
      code: `// Arrow functions - concise syntax
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

// Lexical 'this' - no more self = this
setTimeout(() => {
  console.log(this.value);
}, 100);

// Implicit returns, no parentheses needed
const square = x => x * x;`,
    },
  },
  {
    title: 'Asynchronous Operations',
    description: 'From callbacks to modern async/await',
    then: {
      year: '1995',
      code: `// Callback hell - "pyramid of doom"
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        console.log(d);
      });
    });
  });
});

// Error handling was messy
try {
  callback(function(err, data) {
    if (err) {
      // Handle error
    }
    // Handle success
  });
} catch (e) {
  // Handle sync errors
}`,
    },
    now: {
      year: 'ES2024',
      code: `// Clean async/await syntax
async function fetchData() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
    const d = await getMoreData(c);
    console.log(d);
  } catch (error) {
    // Single error handling point
    console.error('Something went wrong:', error);
  }
}

// Promise chaining (still useful)
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .catch(console.error);`,
    },
  },
  {
    title: 'DOM Manipulation',
    description: 'Finding and manipulating elements',
    then: {
      year: '1995',
      code: `// Limited DOM access methods
var element = document.getElementById('myId');
var elements = document.getElementsByTagName('div');

// Changing styles
element.style.color = 'red';
element.style.backgroundColor = 'blue';

// Creating elements
var newDiv = document.createElement('div');
newDiv.innerHTML = '<span>Hello</span>';
document.body.appendChild(newDiv);

// Event handling
element.onclick = function() {
  alert('Clicked!');
};`,
    },
    now: {
      year: 'ES2024',
      code: `// Powerful CSS selectors
const element = document.querySelector('#myId');
const elements = document.querySelectorAll('div.myClass');

// Modern style manipulation
Object.assign(element.style, {
  color: 'red',
  backgroundColor: 'blue'
});

// Template literals for HTML
const newDiv = document.createElement('div');
newDiv.innerHTML = \`<span>Hello \${name}</span>\`;
document.body.appendChild(newDiv);

// Modern event listeners
element.addEventListener('click', () => {
  console.log('Clicked!');
}, { once: true });`,
    },
  },
  {
    title: 'Object-Oriented Programming',
    description: 'From prototypes to classes',
    then: {
      year: '1995',
      code: `// Prototype-based inheritance
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() {
  return "Hello, I'm " + this.name;
};

// Inheritance was complex
function Employee(name, age, title) {
  Person.call(this, name, age);
  this.title = title;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;`,
    },
    now: {
      year: 'ES2024',
      code: `// Clean class syntax
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    return \`Hello, I'm \${this.name}\`;
  }
}

// Simple inheritance with extends
class Employee extends Person {
  constructor(name, age, title) {
    super(name, age);
    this.title = title;
  }

  sayHello() {
    return \`\${super.sayHello()} - \${this.title}\`;
  }
}

// Private fields and methods
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }
}`,
    },
  },
  {
    title: 'Array Operations',
    description: 'From loops to functional methods',
    then: {
      year: '1995',
      code: `// Manual iteration with for loops
var numbers = [1, 2, 3, 4, 5];
var doubled = [];

for (var i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// Finding elements
var found = null;
for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > 3) {
    found = numbers[i];
    break;
  }
}

// No built-in filtering
var evens = [];
for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evens.push(numbers[i]);
  }
}`,
    },
    now: {
      year: 'ES2024',
      code: `// Functional array methods
const numbers = [1, 2, 3, 4, 5];

// Map, filter, reduce - chainable
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Method chaining
const result = numbers
  .filter(n => n > 2)
  .map(n => n * 3)
  .reduce((acc, n) => acc + n, 0);

// Modern array methods
const found = numbers.find(n => n > 3);
const hasEven = numbers.some(n => n % 2 === 0);
const allPositive = numbers.every(n => n > 0);`,
    },
  },
];

export const JavaScriptEvolution = () => {
  const [activeExample, setActiveExample] = useState(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            JavaScript Evolution: Then vs Now
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            See how JavaScript has transformed from its humble beginnings in
            1995 to the powerful language it is today. Compare the syntax and
            patterns developers used back then with modern ES2024 code.
          </p>
        </div>

        {/* Example Selector */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {codeExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setActiveExample(index)}
              className={`rounded-full px-6 py-2 font-medium transition-all duration-300 ${
                activeExample === index
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>

        {/* Code Comparison */}
        <div className="mx-auto max-w-6xl">
          {codeExamples.map((example, index) => (
            <div
              key={index}
              className={`${index === activeExample ? 'block' : 'hidden'}`}
            >
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {example.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {example.description}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Then (1995) */}
                <div className="relative">
                  <div className="rounded-t-lg bg-gradient-to-r from-red-600 to-orange-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">Then</span>
                        <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
                          {example.then.year}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(example.then.code)}
                        className="rounded-lg bg-white/10 px-3 py-1 text-sm transition-colors hover:bg-white/20"
                      >
                        Copy Code
                      </button>
                    </div>
                  </div>
                  <div className="rounded-b-lg bg-gray-900 p-6">
                    <pre className="overflow-x-auto">
                      <code className="font-mono text-sm text-gray-300">
                        {example.then.code}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Evolution Arrow */}
                <div className="absolute left-1/2 top-1/2 z-10 hidden lg:block">
                  <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-lg">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Now (ES2024) */}
                <div className="relative">
                  <div className="rounded-t-lg bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">Now</span>
                        <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
                          {example.now.year}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(example.now.code)}
                        className="rounded-lg bg-white/10 px-3 py-1 text-sm transition-colors hover:bg-white/20"
                      >
                        Copy Code
                      </button>
                    </div>
                  </div>
                  <div className="rounded-b-lg bg-gray-900 p-6">
                    <pre className="overflow-x-auto">
                      <code className="font-mono text-sm text-gray-300">
                        {example.now.code}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 text-sm text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200">
            <span>&#x1F680;</span>
            JavaScript continues to evolve - what&apos;s next?
          </div>
        </div>
      </div>
    </section>
  );
};
