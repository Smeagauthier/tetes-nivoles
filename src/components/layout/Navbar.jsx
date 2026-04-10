import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { label: "Qui sommes-nous", href: "#about" },
        { label: "Nos activités", href: "#activities" },
        { label: "La troupe", href: "#troupe" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md text-white">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

                {/* Logo */}
                <div className="text-xl font-semibold tracking-wide">
                    Théâtre
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex gap-8">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="hover:text-gray-300 transition"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-black/90">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-300 transition"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}