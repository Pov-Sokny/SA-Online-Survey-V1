import QCMQuestion from "./QCMQuestion";

export default function Question() {
  return (
    <section className="w-screen min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-2xl font-bold py-4">Create Survey</h1>
      <div className="w-[95%] max-w-3xl bg-white border-t-8 border-emerald-500 rounded-t-2xl rounded-b-xl p-6 shadow-md">
        <div className="flex flex-col gap-4">
          
          <input
            type="text"
            defaultValue="Untitled form"
            className="text-2xl text-gray-800 font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent"
          />

          <input
            type="text"
            defaultValue="Description"
            className="text-base border-b-2 border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent"
          />

        </div>
      </div>

      <QCMQuestion/>

    </section>
  );
}