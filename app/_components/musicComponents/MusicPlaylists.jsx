import Link from "next/link";

const MusicPlaylists = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-5/6 px-2 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <Link
            href="/music/playlist/Love"
            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm py-10 text-center me-2 mb-2 flex items-center justify-center transition-transform transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8a4 4 0 014-4 4 4 0 014 4 4 4 0 014-4 4 4 0 014 4c0 4.418-7 11-10 11S3 12.418 3 8z"
              />
            </svg>
            Love
          </Link>
          <Link
            href="/music/playlist/Sad"
            className="text-white bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 dark:focus:ring-gray-800 font-medium rounded-lg text-sm py-10 text-center me-2 mb-2 flex items-center justify-center transition-transform transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zM15 9H9a4 4 0 00-4 4v1h14v-1a4 4 0 00-4-4z"
              />
            </svg>
            Sad
          </Link>
          <Link
            href="/music/playlist/Happy"
            className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm py-10 text-center me-2 mb-2 flex items-center justify-center transition-transform transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h.01M15 12h.01M12 16.5c1.38 0 2.5-.72 2.5-1.5H9.5c0 .78 1.12 1.5 2.5 1.5z"
              />
            </svg>
            Happy
          </Link>
          <Link
            href="/music/playlist/Pop"
            className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-10 text-center me-2 mb-2 flex items-center justify-center transition-transform transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18v4H3v-4zM3 17h18v2H3v-2zM5 3h14v2H5V3z"
              />
            </svg>
            Pop
          </Link>
          <Link
            href="/music/playlist/Break-Up"
            className="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm py-10 text-center me-2 mb-2 flex items-center justify-center transition-transform transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7 3.134-7 7-7zm0 10.5c.904 0 1.68.776 1.68 1.68 0 .935-.672 1.82-1.68 1.82-1.005 0-1.68-.885-1.68-1.82 0-.904.776-1.68 1.68-1.68zM12 6l1.5 1.5-1.5 1.5-1.5-1.5L12 6z"
              />
            </svg>
            Break-Up
          </Link>
          <Link
            href="/music/playlist/Relaxed"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm py-10 text-center me-2 mb-2 flex items-center justify-center transition-transform transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9V3m0 0H6m4 0h4M10 15v-6m-4 4h8M12 3v6m0 0h8m-8 0H6M3 18h3v3H3z"
              />
            </svg>
            Relaxed
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MusicPlaylists;
