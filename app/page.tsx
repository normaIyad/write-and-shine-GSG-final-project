import HomePage from "./Home_page/page";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen bg-gray-100 px-4 sm:px-20 pb-10 sm:pb-20 font-geist-sans">
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start sm:gap-8 mt-2 sm:mt-4">
        <HomePage />
      </main>
      <footer className="row-start-3 flex gap-4 sm:gap-6 flex-wrap items-center justify-center bg-gray-200 py-4">
        {/* Footer Content */}
      </footer>
    </div>
  );
}
