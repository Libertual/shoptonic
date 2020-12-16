export class List {
  _id?: string;
  name?: string;
  description?: string;

  constructor(name?: string, description?: string) {
    name ? this.name = name : null;
    description ? this.description = description : null;
  }
}