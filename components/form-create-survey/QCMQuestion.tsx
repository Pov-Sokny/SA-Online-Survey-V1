export default function QCMQuestion() {
  return (
    <div className="w-[95%] max-w-3xl bg-white border-t-8 border-emerald-500 rounded-t-2xl p-6 shadow-md mt-6">
      
      {/* Question title */}
      <input
        type="text"
        placeholder="Untitled Question"
        className="w-full text-xl font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent pb-2 mb-4"
      />

      {/* Options */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input type="radio" disabled />
          <input
            type="text"
            placeholder="Option 1"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <input type="radio" disabled />
          <input
            type="text"
            placeholder="Option 2"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <input type="radio" disabled />
          <input
            type="text"
            placeholder="Option 3"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <input type="radio" disabled />
          <input
            type="text"
            placeholder="Option 4"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent"
          />
        </div>
      </div>

    </div>
  );
}