import Header from "@/app/(site)/components/Header";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import Featured from "./components/Featured";
import RecentlyPlayed from "./components/RecentlyPlayed";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-emerald-800 h-1/2">
      <Header />
      <Featured />
      <h2 className="py-5 mx-8 text-3xl font-bold">Good Evening</h2>
      <RecentlyPlayed />
      <h2 className="pt-10 pb-5 mx-8 text-3xl font-bold">Made For You</h2>
    </div>
  );
}
