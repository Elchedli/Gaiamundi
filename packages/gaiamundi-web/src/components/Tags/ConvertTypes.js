// <span class="bg-"blue-100", text-"blue-800", text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-"blue-200", dark:text-"blue-800",">Default</span>
// <span class="bg-"gray-100", text-"gray-800", text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-"gray-700", dark:text-"gray-300",">Dark</span>
// <span class="bg-"red-100", text-"red-800", text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-"red-200", dark:text-"red-900",">Red</span>
// <span class="bg-"green-100", text-"green-800", text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-"green-200", dark:text-"green-900",">Green</span>
// <span class="bg-"yellow-100", text-"yellow-800", text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-"yellow-200", dark:text-"yellow-900",">Yellow</span>
// <span class="bg-"indigo-100", text-"indigo-800", text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-"indigo-200", dark:text-"indigo-900",">Indigo</span>
// <span class="bg-"purple-100", text-"purple-800", text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-"purple-200", dark:text-"purple-900",">Purple</span>
// <span class="bg-"pink-100", text-"pink-800", text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-"pink-200", dark:text-"pink-900",">Pink</span>

const data = [
  'blue-100',
  'blue-800',
  'blue-200',
  'blue-800',
  'gray-100',
  'gray-800',
  'gray-700',
  'gray-300',
  'red-100',
  'red-800',
  'red-200',
  'red-900',
  'green-100',
  'green-800',
  'green-200',
  'green-900',
  'yellow-100',
  'yellow-800',
  'yellow-200',
  'yellow-900',
  'indigo-100',
  'indigo-800',
  'indigo-200',
  'indigo-900',
  'purple-100',
  'purple-800',
  'purple-200',
  'purple-900',
  'pink-100',
  'pink-800',
  'pink-200',
  'pink-900',
];

let boxes = {
  default: [],
  dark: [],
  red: [],
  green: [],
  yellow: [],
  indigo: [],
  purple: [],
  pink: [],
};
var i = 0;
Object.keys(boxes).forEach((a) => {
  for (let index = 0; index < 4; index++) {
    boxes[a].push(data[i]);
    i++;
  }
});

console.log(boxes);
