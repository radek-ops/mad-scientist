class Background extends Moveables {

  /**
   * Creates a background image.
   * @param {string} imgPath - The image path
   * @param {number} x - The x position
   * @param {number} y - The y position
   * @param {number} width - The width
   * @param {number} height - The height
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