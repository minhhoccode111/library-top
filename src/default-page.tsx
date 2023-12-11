import { useLoaderData, Form, useFetcher } from "react-router-dom";
import {
  IoIosCheckmarkCircleOutline,
  IoIosRadioButtonOff,
} from "react-icons/io";
import { getData, updateData } from "./methods";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

export const loader = async () => {
  const database = await getData();
  return { database };
};

export const action = async ({ request }) => {
  console.log(request);
  const data = await request.formData();
  const obj = Object.fromEntries(data);
  const array = Object.entries(obj);
  const [[id, value]] = array;
  console.log(id, value);
  return updateData(id, {
    isDone: value === "true",
  });
};

const Done = ({ book }) => {
  const fetcher = useFetcher();
  let done = book.isDone;
  // access the formData immediately the next render after the form submitted so we don't have to wait for network latency
  // if network fail or something, the the next render we will be back to real data
  if (fetcher.formData) {
    done = fetcher.formData.get(book.id) === "true";
  }

  return (
    <>
      <fetcher.Form method="post">
        <button
          className={
            "text-xl" + " " + (done ? "text-green-500" : "text-red-500")
          }
          value={done ? "false" : "true"}
          aria-label={done ? "Mark as pending" : "Mark as done"}
          name={book.id}
        >
          {done ? <IoIosCheckmarkCircleOutline /> : <IoIosRadioButtonOff />}
        </button>
      </fetcher.Form>
    </>
  );
};

const Rating = ({ book }) => {
  const fetcher = useFetcher();
  let rating = book.rating;

  return (
    <span className="flex gap-4">
      <fetcher.Form className="flex gap-4">
        <button
          className="text-2xl text-red-500"
          value={"minus"}
          name={book.id}
        >
          <CiSquareMinus />
        </button>
        <button
          className="text-2xl text-green-500"
          value={"plus"}
          name={book.id}
        >
          <CiSquarePlus />
        </button>
      </fetcher.Form>
      <span className="">{rating}</span>
    </span>
  );
};

const DefaultPage = () => {
  const { database } = useLoaderData();
  return (
    <ul className="flex items-center gap-4 flex-wrap p-4">
      {database.map((book) => (
        <li
          key={book.id}
          className="border rounded p-4 min-w-[300px] max-w-sm whitespace-nowrap"
        >
          <p className="text-xl py-4 text-slate-900 overflow-x-auto">
            {book.title}
          </p>
          <div className="text-right">
            <p className="text-slate-700 overflow-x-auto">{book.author}</p>
            <p className="text-sm text-slate-500">
              {book.pages} page{book.pages > 1 ?? "s"}
            </p>
            <div className="pt-2">
              <Done book={book} />
            </div>
            <div
              className={
                "flex items-center justify-end" +
                " " +
                (book.rating < 2
                  ? "text-red-500"
                  : book.rating < 4
                    ? "text-yellow-500"
                    : "text-green-500")
              }
            >
              <Rating book={book} />
              <span className="text-slate-500">/5 rating</span>
            </div>
          </div>
          <p>Id: {book.id}</p>
        </li>
      ))}
    </ul>
  );
};

export default DefaultPage;
