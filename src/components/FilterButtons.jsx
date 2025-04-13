export default function FilterButtons({ filter, setFilter, darkMode }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`flex-1 py-2 rounded transition ${
            filter === f.value
              ? darkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 text-white'
              : darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}