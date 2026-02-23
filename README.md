1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

   Ans: getElementById: This method is used to select a single element based on its unique ID attribute. It is the most efficient and fastest selection method because IDs are unique within a document, allowing the browser to locate the element directly. If no element with the specified ID exists, it returns null.

   getElementsByClassName: This method selects all elements that share a specific class name and returns them in a live HTMLCollection. It means that if I add or remove elements with that class name in the DOM later, the collection will automatically update to reflect those changes without needing to call the method again.

   querySelector: This is a highly versatile method that uses CSS selectors like #id, .class, or div to find the first matching element in the document. While it is slightly slower than getElementById due to the complexity of parsing CSS selectors, it is preferred for its flexibility when I only need to target a single, specific node.

   querySelectorAll: Similar to querySelector, this method accepts any CSS selector, but it returns all matching elements in a static NodeList. Unlike a live collection, this is a snapshot of the DOM at the moment the method was called; if the document changes later, the list will not update to include new elements or remove deleted ones.

2. How do you create and insert a new element into the DOM?

   Ans: To create and insert a new element, I will first use the document.createElement() method to generate a new HTML tag in the browser's memory. After creating the element, I will define its content or properties using properties like textContent for text or className for styling. Finally, I will attach the element to the visible webpage by using an insertion method such as appendChild() or prepend(), which places the new element inside a specified parent element in the DOM tree.

3. What is Event Bubbling? And how does it work?

   Ans: Event Bubbling is a type of event propagation in the HTML DOM where an event starts from the specific element that was clicked and then bubbles up to its parent elements in order. When an event occurs on an element, the browser first runs the handlers on that element, then on its parent, then all the way up to the ancestors and the window object. This behavior allows a single parent element to listen for and handle events that happen on any of its children, a technique commonly known as event delegation.
