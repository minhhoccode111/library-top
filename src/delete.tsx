import { redirect } from "react-router-dom";
import { deleteData } from "./methods";

export const action = async ({ request }) => {
  const data = await request.formData();
  const obj = Object.fromEntries(data);
  const id = obj.id;
  await deleteData(id);
  return redirect("/");
};
