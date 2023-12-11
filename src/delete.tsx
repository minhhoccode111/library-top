import { redirect } from "react-router-dom";
import { deleteData } from "./methods";

export const action = async ({ request, params }) => {
  console.log(request);
  const data = await request.formData();
  console.log(data);
  const obj = Object.fromEntries(data);
  console.log(obj);
  const id = obj.id;
  await deleteData(id);
  return redirect("/");
};
