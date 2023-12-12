import { Outlet, NavLink, Link } from "react-router-dom";
import { addData } from "./methods";

export const action = async ({ request }) => {
  const data = await request.formData();
  const book = Object.fromEntries(data);
  book.isDone = false;
  book.finishedPages = 0;
  return addData(book);
};

const Root: React.FC = () => {
  return (
    <>
      <header className="bg-slate-100 p-4 flex items-center justify-between text-amber-950 rounded-b-3xl mx-auto max-w-lg">
        <Link to={"/"}>
          <h1 className="text-4xl">Library</h1>
        </Link>
        <nav className="flex gap-4 items-center justify-between font-bold">
          <div className="underline decoration-dotted decoration-amber-950">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-200 rounded-b-md px-2 py-1 decoration-solid"
                  : ""
              }
              to={"/"}
            >
              Home
            </NavLink>
          </div>
          <div className="underline decoration-dotted decoration-amber-950">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-200 rounded-b-md px-2 py-1 decoration-solid"
                  : ""
              }
              to={"add"}
            >
              Add
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="grid place-items-center">
        <Outlet />
      </main>
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-slate-100 text-amber-950 max-w-lg mx-auto rounded-t-3xl">
        <p className="font-bold">
          Make with love by{" "}
          <a
            className="underline decoration-dotted hover:decoration-solid"
            href="https://github.com/minhhoccode111"
            target="_blank"
            rel="noreferrer"
          >
            minhhoccode111
          </a>
        </p>
      </footer>
    </>
  );
};

export default Root;
