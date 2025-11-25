import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="text-3xl">🌿</span>
                            <span className="text-2xl font-bold text-white font-serif">K-웰니스 힐링</span>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            50-70대 시니어를 위한<br />
                            전문 홈케어 & 셀프케어 플랫폼입니다.<br />
                            오늘도 건강하고 행복한 하루 되세요.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4 font-serif">고객센터 안내</h4>
                        <ul className="space-y-3 text-base">
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-accent" />
                                <span>010-9726-7012</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-accent" />
                                <span>emotionbrain@naver.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Clock size={18} className="text-accent" />
                                <span>평일 09:00 - 18:00</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; 2024 K-웰니스 힐링. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;