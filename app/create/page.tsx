"use client";
 
import { useState } from "react";


export default function CreatePage() {
  // State to capture form inputs with explicit types
  const [term, setTerm] = useState<string>('');
  const [interpretation, setInterpretation] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation
    if (!term || !interpretation) {
      setError('Please fill out both fields.');
      return;
    }

    try {
      // Reset error and success states
      setError('');
      setSuccess(false);

      // Send POST request to your API
      const res = await fetch('/api/interpretation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ term, interpretation }),
      });

      if (!res.ok) {
        throw new Error('Failed to add interpretation');
      }

      // Clear form and show success message
      setTerm('');
      setInterpretation('');
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Add New Interpretation</h2>

      {/* Show error or success message */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Interpretation added successfully!</p>}

      <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="term"
          className="py-1 px-4 border rounded-lg"
          placeholder="Term"
          value={term}
          onChange={(e) => setTerm(e.target.value)} // Update state on input change
        />
        <textarea
          name="interpretation"
          rows={4}
          placeholder="Interpretation"
          className="px-4 py-1 border rounded-md resize-none"
          value={interpretation}
          onChange={(e) => setInterpretation(e.target.value)} // Update state on input change
        />
        <button className="bg-black text-white px-4 mt-5 py-2 rounded-md cursor-pointer" type="submit">
          Add Interpretation
        </button>
      </form>
    </div>
  );
}
