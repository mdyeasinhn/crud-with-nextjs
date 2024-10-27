"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretation {
  _id: string; // Use _id for MongoDB
  term: string;
  interpretation: string;
}

export default function Home() {
  const [interpretations, setInterpretations] = useState<IInterpretation[]>([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterpretation = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/items`); // Ensure this matches your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch interpretation");
        }
        const data = await response.json();
        setInterpretations(data);
      } catch (error: any) { // Explicitly type the error
        console.error("Error fetching interpretations:", error);
        setError("Failed to load interpretation. Please try reloading the page");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterpretation();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500 py-4">{error}</p>}
      {isLoading ? (
        <p>Loading interpretation...</p>
      ) : (
        <div>
          {interpretations.map((interpretation) => (
            <div key={interpretation._id} className="p-4 rounded-md border-b leading-9">
              <h2 className="font-bold">{interpretation.term}</h2>
              <p>{interpretation.interpretation}</p>
              <div className="flex mt-4 gap-4 justify-end">
                <Link
                  href={`/edit/${interpretation._id}`} // Use _id instead of $id
                  className="px-2 py-2 bg-slate-200 rounded-md uppercase font-bold text-sm tracking-widest"
                >
                  Edit
                </Link>
                <Link
                  href={`/delete/${interpretation._id}`} // Use _id instead of $id
                  className="px-2 py-2 text-white bg-red-500 rounded-md uppercase font-bold text-sm tracking-widest"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
