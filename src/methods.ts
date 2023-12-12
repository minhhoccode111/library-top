import { v4 as uuid } from "uuid";

const defaultDatabase = [
  {
    title: "The book of five rings",
    author: "Miyamoto Musashi",
    pages: 105,
    finishedPages: 105,
    isDone: true,
    rating: 4,
    id: uuid().slice(0, 8),
  },
  {
    title: "Think like a Programmer",
    author: "Spraul, V.Anton",
    pages: 332,
    finishedPages: 105,
    isDone: false,
    rating: 4,
    id: uuid().slice(0, 8),
  },
  {
    title: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
    author: "Ashlee Vance",
    pages: 458,
    finishedPages: 0,
    isDone: false,
    rating: 5,
    id: uuid().slice(0, 8),
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    pages: 239,
    finishedPages: 50,
    isDone: false,
    rating: 5,
    id: uuid().slice(0, 8),
  },
  {
    title: "Algorithms (fourth edition)",
    author: "Robert Sedgewick, Kevin Wayne",
    pages: 990,
    finishedPages: 100,
    isDone: false,
    rating: 4,
    id: uuid().slice(0, 8),
  },
];

const set = (database: Array<object>) => {
  localStorage.setItem("books", JSON.stringify(database));
};

export const getData = () => {
  const database = localStorage.getItem("books");
  if (database === null) {
    return defaultDatabase;
  } else {
    return JSON.parse(database);
  }
};

type Book = {
  id: string;
};

export const getBook = (id: string) => {
  const database = getData();
  const book = database.find((book: Book) => book.id === id);
  return book;
};

export const addData = (book: Book) => {
  const database = getData();
  database.push(Object.assign(book, { id: uuid().slice(0, 8) }));
  set(database);
  return database;
};

export const updateData = (id: keyof Book, updates: object) => {
  const database = getData();
  const book = database.find((book: Book) => book.id === id);
  if (!book) throw new Error(`That book doesn't exist`);
  Object.assign(book, updates);
  set(database);
  return database;
};

export const deleteData = (id: keyof Book) => {
  const database = getData();
  const index = database.findIndex((book: Book) => book.id === id);
  if (index > -1) {
    database.splice(index, 1);
    set(database);
    return true;
  }
  return false;
};
