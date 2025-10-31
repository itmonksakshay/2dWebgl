export const Header = () => {
    return <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold text-indigo-600">My Portfolio</h1>
            <nav className="flex gap-6 text-gray-700 font-medium">
                <a href="#about" className="hover:text-indigo-500">
                    About
                </a>
                <a href="#projects" className="hover:text-indigo-500">
                    Projects
                </a>
                <a href="#contact" className="hover:text-indigo-500">
                    Contact
                </a>
            </nav>
        </div>
    </header>
}