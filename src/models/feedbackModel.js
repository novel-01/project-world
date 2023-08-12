const { v4: uuid } = require("uuid");
class feedback {
  constructor(photo, title) {
    this.id = uuid();
    this.photo = photo;
    this.title = title;
  }
}
module.exports = feedback;
