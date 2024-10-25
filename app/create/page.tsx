export default function CreatePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Add New Interpretation</h2>
      <form className="flex gap-3 flex-col">
        <input
          type="text"
          name="term "
          className="py-1 px-4 border rounded-lg"
          placeholder="Term"
        />
        <textarea 
        name="interpretation"
         rows={4}
         placeholder="Interpretation"
         className="px-4 py-1 border rounded-md resize-none"
         >

         </textarea>
         <button className="bg-black text-white px-4 mt-5 py-2 rounded-md cursor-pointer">Add Interpretation</button>
      </form>
    </div>
  );
}
