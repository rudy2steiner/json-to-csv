import { redirect } from "next/navigation";

export default function Home() {
  redirect("/json-to-csv");
  return null;
}