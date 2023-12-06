import { NextPage } from 'next';

interface IDashboardBoxProps {
  subject: string;
}

const DashboardBox: NextPage<IDashboardBoxProps> = ({ subject }) => {
  return (
    <div className="border h-36 flex flex-col items-center bg-gray-400 dark:bg-gray-900 divide-gray-600 text-white shadow-2xl border-gray-300 dark:border-gray-400 cursor-pointer hover:ring-2 ring-offset-4 ring-gray-500 dark:ring-offset-gray-900">
      <div className="h-1/2 w-full p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
      </div>
      <div className="h-1/2 w-full px-4 flex items-center justify-between bg-gray-400 dark:bg-gray-900">
        <div className="text-sm">
          <div>{subject}</div>
          <div className="text-xs text-gray-400">Voice AI</div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardBox;
