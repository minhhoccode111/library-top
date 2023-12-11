import { v4 as uuid } from "uuid";

const database = [
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
];

export async function getData() {
  await fakeNetwork();
  return database;
}

export async function getBook(id) {
  const database = await getData();
  const book = database.find((book) => book.id === id);
  return book;
}

export async function addData(obj) {
  await fakeNetwork();
  const database = await getData();
  database.push(Object.assign(obj, { id: uuid().slice(0, 8) }));
  return database;
}

export async function updateData(id, updates) {
  await fakeNetwork();
  const database = await getData();
  const book = database.find((book) => book.id === id);
  if (!book) throw new Error(`That book doesn't exist`);
  Object.assign(book, updates);
  return database;
}

export async function deleteData(id) {
  await fakeNetwork();
  const database = await getData();
  const index = database.findIndex((book) => book.id === id);
  if (index > -1) {
    database.splice(index, 1);
    return true;
  }
  return false;
}

async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, 200);
  });
}
