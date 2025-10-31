export const Footer = () => {
    return <footer className="bg-gray-900 text-gray-100 mt-auto">
        <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
            </p>
            <div className="flex gap-4">
                <a href="#" className="hover:text-indigo-400 text-sm">
                    GitHub
                </a>
                <a href="#" className="hover:text-indigo-400 text-sm">
                    LinkedIn
                </a>
                <a href="#" className="hover:text-indigo-400 text-sm">
                    Twitter
                </a>
            </div>
        </div>
    </footer>
}