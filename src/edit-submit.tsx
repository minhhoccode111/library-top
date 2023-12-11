import { updateData } from "./methods";
import { redirect } from "react-router-dom";

export const action = async ({ request }) => {
  console.log("action submit");
  const data = await request.formData();
  const book = Object.fromEntries(data);
  await updateData(book.id, book);
  return redirect("/");
};
