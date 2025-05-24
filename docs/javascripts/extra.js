window.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("typewriter-paragraph");
  if (!target) return;

  const original = target.cloneNode(true); // copy the full element and its HTML structure
  const children = Array.from(original.childNodes); // mix of text and HTML elements

  target.innerHTML = ""; // clear original paragraph

  let currentNodeIndex = 0;
  let charIndex = 0;

  function typeNext() {
    if (currentNodeIndex >= children.length) return;

    const node = children[currentNodeIndex];

    if (node.nodeType === Node.TEXT_NODE) {
      // Animate text content
      if (charIndex < node.textContent.length) {
        target.appendChild(document.createTextNode(node.textContent.charAt(charIndex)));
        charIndex++;
        setTimeout(typeNext, 35);
      } else {
        charIndex = 0;
        currentNodeIndex++;
        typeNext();
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Copy full HTML element (e.g., <a>)
      const clone = node.cloneNode(true);
      target.appendChild(clone);
      currentNodeIndex++;
      typeNext();
    } else {
      // Skip unknown node types
      currentNodeIndex++;
      typeNext();
    }
  }

  typeNext();
});
