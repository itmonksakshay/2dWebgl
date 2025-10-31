export const ProjectSection = () => {
    return <section
        id="projects"
        className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
    >
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
            Featured Projects
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-2">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="min-w-[280px] flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg p-5 shadow-lg hover:scale-105 transform transition duration-300"
                >
                    <h3 className="text-lg font-semibold mb-2">
                        Project {i + 1}
                    </h3>
                    <p className="text-sm opacity-90 mb-3">
                        A short description of what you built — using React, WebGL, and
                        creative design.
                    </p>
                    <button className="bg-white text-indigo-600 font-medium px-3 py-1 rounded hover:bg-indigo-100 transition">
                        View Details
                    </button>
                </div>
            ))}
        </div>
    </section>
}