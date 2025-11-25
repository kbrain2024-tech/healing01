import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { name: '홈', path: '/' },
        { name: 'AI 건강 루틴', path: '/routine' },
        { name: '건강 상담소', path: '/chat' },
    ];

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <Leaf className="h-8 w-8 text-primary group-hover:text-primaryDark transition-colors" />
                        <span className="text-2xl font-bold text-primary font-serif">K-웰니스 힐링</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${
                                    isActive(link.path)
                                        ? 'bg-secondary text-gray-900'
                                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 pb-4">
                    <div className="px-4 pt-2 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-3 rounded-lg text-lg font-medium ${
                                    isActive(link.path)
                                        ? 'bg-secondary text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;