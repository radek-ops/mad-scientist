class Background extends Moveables {

  /**
   * Creates a single background layer image.
   * @param {string} imgPath - The path to the image file
   * @param {number} x - The x position in pixels
   * @param {number} y - The y position in pixels
   * @param {number} width - The width in pixels
   * @param {number} height - The height in pixels
   */
  constructor(imgPath, x, y = 0, width = 1283, height = 720) {
    super();
    this.loadImages(imgPath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;


  }
}