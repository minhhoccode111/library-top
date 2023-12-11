import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl text-slate-500">Oopss! Something went wrong!</h1>
      <h2 className="text-4xl text-slate-500">
        {error.statusText || error.message}
      </h2>
      <h2 className="text-4xl text-slate-500">Please go back</h2>
      <button
        type="button"
        className="border-0 text-6xl underline decoration-dotted hover:decoration-double uppercase text-sky-500"
        onClick={() => navigate(-1)}
      >
        Click here
      </button>
    </div>
  );
};

export default ErrorPage;
