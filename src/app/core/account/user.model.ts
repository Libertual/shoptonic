export class User {
  id: string;
  username: string;
  password: string;
  name: string;
  lastName: string;
  token: string;
  email: string;

  constructor(username, password, name, email) {
    this.username = username || undefined;
    this.password = password || undefined;
    this.name = name || undefined;
    this.email = email || undefined;
  }
}