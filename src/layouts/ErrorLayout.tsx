import { Link } from "react-router-dom";

export const ErrorLayout = () => (
  <main className="flex flex-col items-center justify-center w-full h-screen bg-white dark:bg-dark-bg">
    <h1 className="font-extrabold tracking-widest text-black dark:text-white text-9xl">
      404
    </h1>
    <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
      Page Not Found
    </div>
    <button className="mt-5" type="button">
      <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />

        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
          <Link to="/">Go Home</Link>
        </span>
      </a>
    </button>
  </main>
);
