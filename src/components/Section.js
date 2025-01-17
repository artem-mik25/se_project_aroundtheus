// components/Section.js

export default class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this._renderedItems = items; // Default to an empty array if no items are provided
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    if (!this._container) {
      throw new Error(`Section: Container with selector "${containerSelector}" not found`);
    }
  }

  // Render all items in the container
  renderItems() {
    this.clear(); // Clear existing items before rendering new ones
    this._renderedItems.forEach((item) => {
      this._renderer(item); // Call the renderer function for each item
    });
  }

  // Add a single element to the container
  addItem(element) {
    this._container.prepend(element); // Add the element at the beginning
  }

  // Set new items dynamically and render them
  setItems(items) {
    if (!Array.isArray(items)) {
      throw new Error('Section: Provided items must be an array');
    }
    this._renderedItems = items;
    this.renderItems();
  }

  // Clear all elements in the container
  clear() {
    this._container.innerHTML = ''; // Clear the container's inner HTML
  }
}
