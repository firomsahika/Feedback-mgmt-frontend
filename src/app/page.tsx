const page = () => {
  return (
    <main className="flex items-center justify-center max-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="text-center flex flex-col items-center space-y-5 max-w-2xl lg:pt-30">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Empower Your Feedback Journey <br />
          <span className="text-blue-600">with Simplicity</span>
        </h1>

        <p className="text-lg text-gray-600">
          A clean and effective way to gather, analyze, and improve feedback
          from students, teachers, and teams.
        </p>

        <a
          href="/auth/login/student"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </main>
  );
};

export default page;
