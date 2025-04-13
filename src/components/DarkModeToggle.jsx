import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-full transition ${
        darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
      }`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
}