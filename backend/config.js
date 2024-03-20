

// the port the server will run on
export const PORT = 5555;

// the URL to connect to the database
// export const mongoDBURL =
  // "mongodb+srv://bookKeeper:rooter@bookstore.8zyio4d.mongodb.net/books-collection?retryWrites=true&w=majority&appName=BookStore";

export const mongoDBURL = process.env.MONGODB_URI

console.log(mongoDBURL);