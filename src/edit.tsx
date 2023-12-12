import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { getBook } from "./methods";

export const loader = async ({ params }) => {
  const id = params.bookId;
  const book = await getBook(id);
  return book;
};

const Edit = () => {
  const book = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <h1 className="p-4 text-2xl text-amber-950 text-center">
        Edit book with title: {book.title}
      </h1>
      <div className="max-w-[400px] mx-auto p-8 text-amber-950 shadow-md shadow-amber-950 m-4">
        <Form
          method="post"
          action={"/edit/" + book.id + "/submit"}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="flex items-center justify-between gap-4">
              *Title:{" "}
              <input
                required
                type="text"
                name="title"
                className="border rounded max-w-[200px] float-right focus:outline-none shadow-sm focus:shadow-amber-950 pl-2 py-1"
                placeholder="Book's title"
                defaultValue={book.title}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center justify-between gap-4">
              *Author:{" "}
              <input
                required
                type="text"
                name="author"
                className="border rounded max-w-[200px] float-right focus:outline-none shadow-sm focus:shadow-amber-950 pl-2 py-1"
                placeholder="Book's author"
                defaultValue={book.author}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center justify-between gap-4">
              *Pages:{" "}
              <input
                required
                type="number"
                name="pages"
                className="border rounded max-w-[200px] float-right focus:outline-none shadow-sm focus:shadow-amber-950 pl-2 py-1"
                placeholder="Book's pages"
                min={1}
                max={10000}
                defaultValue={book.pages}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center justify-between gap-4">
              *Rating:{" "}
              <input
                required
                name="rating"
                type="number"
                className="border rounded max-w-[200px] float-right focus:outline-none shadow-sm focus:shadow-amber-950 pl-2 py-1"
                min={0}
                max={5}
                placeholder="Rating 0 - 5"
                defaultValue={book.rating}
              />
            </label>
          </div>
          <input
            type="text"
            readOnly
            hidden
            aria-hidden
            name="id"
            value={book.id}
          />
          <button
            className="block w-full border p-4 hover:bg-green-100 focus:bg-green-100 active:bg-green-950 active:text-white"
            type="submit"
          >
            Submit
          </button>
          <button
            className="block text-red-500 w-full border p-4 hover:bg-red-100 focus:bg-red-100 active:bg-red-950 active:text-white"
            onClick={() => navigate(-1)}
            type="button"
          >
            Cancel
          </button>
        </Form>
      </div>
    </>
  );
};

export default Edit;
