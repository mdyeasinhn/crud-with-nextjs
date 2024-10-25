import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="p-4 rounded-md border-b leading-9">
        <h2 className="font-bold">Natural language prossesing (NPL)</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          architecto enim beatae quia odio est alias numquam commodi molestias
          iste!
        </p>
        <div className="flex mt-4 gap-4 justify-end">
          <Link
            href={"/edit"}
            className="px-2 py-2 bg-slate-200  rounded-md  uppercase font-bold text-sm  tracking-widest"
          >
            Edit
          </Link>
          <Link
            href={"/delete"}
            className="px-2 py-2 text-white bg-red-500  rounded-md  uppercase font-bold text-sm  tracking-widest"
          >
          Delete
          </Link>
        </div>
      </div>
    </div>
  );
}
