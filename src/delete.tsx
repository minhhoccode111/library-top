import { redirect } from "react-router-dom";
import { deleteData } from "./methods";

type Request = {
  formData: () => unknown;
};

export const action = async ({ request }: { request: Request }) => {
  const data = await request.formData();
  const obj = Object.fromEntries(data as Iterable<readonly [PropertyKey]>);
  const id = obj.id;
  await deleteData(id);
  return redirect("/");
};
