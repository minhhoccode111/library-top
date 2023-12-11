import { Outlet, NavLink, Link } from "react-router-dom";
import { addData } from "./methods";

export const action = async ({ request }) => {
  const data = await request.formData();
  console.log(data);
  const book = Object.fromEntries(data);
  book.isDone = false;
  book.finishedPages = 0;
  return addData(book);
};

const Root: React.FC = () => {
  return (
    <>
      <header className="bg-slate-100 p-4 flex items-center justify-between text-amber-950">
        <Link to={"/"}>
          <h1 className="text-4xl">Library</h1>
        </Link>
        <nav className="flex gap-4 items-center justify-between">
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-slate-200 rounded-t-md px-2 py-1" : ""
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-slate-200 rounded-t-md px-2 py-1" : ""
            }
            to={"add"}
          >
            Add
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-slate-100 text-amber-950">
        <p>
          Make with love by{" "}
          <a
            className="underline decoration-dotted hover:decoration-double"
            href="https://github.com/minhhoccode111"
          >
            minhhoccode111
          </a>
        </p>
      </footer>
    </>
  );
};

export default Root;
