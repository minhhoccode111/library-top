import { updateData } from "./methods";
import { redirect } from "react-router-dom";

type Request = {
  formData: () => unknown;
};

export const action = async ({ request }: { request: Request }) => {
  const data = await request.formData();
  const book = Object.fromEntries(data as Iterable<readonly [PropertyKey]>);
  await updateData(book.id, book);
  return redirect("/");
};
