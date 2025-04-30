import { ArrowRight } from "lucide-react";

const stats = [
  {
    title: "TOTAL CLASSES",
    count: 0,
    color: "bg-blue-900",
  },
  {
    title: "TOTAL PARAMETERS",
    count: 0,
    color: "bg-green-400",
  },
  {
    title: "TOTAL SUBMISSION",
    count: 0,
    color: "bg-red-400",
  },
  {
    title: "TOTAL SUBJECTS",
    count: 0,
    color: "bg-blue-400",
  },
];

const CardBox = ({ title, count, color }: { title: string; count: number; color: string }) => (
  <div className="rounded-xl overflow-hidden shadow-sm border bg-white">
    <div className={`p-6 text-white flex flex-col items-center justify-center ${color}`}>
      <p className="text-3xl font-bold">{count}</p>
      <h2 className="mt-1 text-sm font-medium">{title}</h2>
    </div>
    <button className="w-full bg-gray-100 text-gray-700 flex items-center justify-center gap-2 text-sm py-2 font-medium hover:bg-gray-200 transition">
      FULL DETAIL <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

const page = () => {
  return (
    <div className="gap-10 flex flex-col  bg-white rounded-2xl">
      <div className="border-b border-slate-300 mb-4 pb-4">
        <h1 className="text-4xl font-medium ">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <CardBox key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export default page;
