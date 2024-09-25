// components/Section.js
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Method to render all items on the page
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);  // Call the renderer function for each item
    });
  }

  // Method to add a single card element to the container
  addItem(element) {
    this._container.prepend(element);
  }
}
