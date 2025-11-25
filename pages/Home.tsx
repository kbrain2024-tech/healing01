import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Sun, Play, Stethoscope, Droplet, Calendar, Youtube, Globe, ClipboardList } from 'lucide-react';

const Home: React.FC = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[650px] flex items-center bg-primary overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primaryDark opacity-90 z-0"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white space-y-8">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif">
                                나를 위한 시간,<br />
                                <span className="text-secondary">집에서 시작하는</span><br />
                                건강한 하루
                            </h1>
                            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-100">
                                50대 이후, 우리 몸은 더 세심한 관심이 필요합니다.<br />
                                매일 15분, 쉽고 편안한 홈케어로 활력 있는 일상을 되찾으세요.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/routine" className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-opacity-90 transition transform hover:scale-105 shadow-lg">
                                    무료 건강 루틴 받기
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <Link to="/chat" className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full text-xl font-bold hover:bg-secondary transition transform hover:scale-105 shadow-lg">
                                    AI 상담사와 대화하기
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-8 pt-8 border-t border-white border-opacity-30">
                                <div className="flex items-center space-x-2">
                                    <Star className="text-secondary w-6 h-6 fill-current" />
                                    <div>
                                        <p className="text-xl font-bold">12,000+</p>
                                        <p className="text-sm text-gray-200">만족한 회원</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Heart className="text-secondary w-6 h-6 fill-current" />
                                    <div>
                                        <p className="text-xl font-bold">98%</p>
                                        <p className="text-sm text-gray-200">추천 의향</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Doctor Profile Section */}
                        <div className="hidden lg:block relative">
                            {/* Decorative background for clinic atmosphere */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')] bg-cover bg-center rounded-3xl transform rotate-2 opacity-50 blur-[2px]"></div>
                            
                            <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500 border border-white/50">
                                <div className="flex flex-col items-center">
                                    {/* Profile Header */}
                                    <div className="flex flex-col items-center mb-5">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-lg mb-3 bg-gray-200">
                                            <img 
                                                src="https://img.youtube.com/vi/A0l2XkgFWTk/maxresdefault.jpg" 
                                                alt="박창혁 박사" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 font-serif">박창혁 박사</h3>
                                        <span className="bg-primary/10 text-primaryDark px-4 py-1 rounded-full text-sm font-bold mt-1">
                                            심신치유전공 Ph.D.
                                        </span>
                                    </div>

                                    {/* YouTube Embed with Thumbnail Cover */}
                                    <div className="w-full rounded-xl overflow-hidden shadow-md mb-4 bg-black relative aspect-video group cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                                        {!isVideoPlaying ? (
                                            <>
                                                <img 
                                                    src="https://img.youtube.com/vi/A0l2XkgFWTk/maxresdefault.jpg" 
                                                    alt="Video Thumbnail" 
                                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-80 transition duration-300"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300 border-2 border-white shadow-lg">
                                                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md text-white text-xs font-medium backdrop-blur-sm">
                                                    소개 영상 보기
                                                </div>
                                            </>
                                        ) : (
                                            <iframe 
                                                className="absolute top-0 left-0 w-full h-full"
                                                src="https://www.youtube.com/embed/A0l2XkgFWTk?autoplay=1" 
                                                title="박창혁 박사 소개" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen
                                            ></iframe>
                                        )}
                                    </div>

                                    <div className="text-center w-full">
                                        <p className="text-gray-600 text-sm font-medium leading-relaxed font-serif">
                                            "몸과 마음의 균형을 찾아드리는<br/>
                                            여러분의 건강 멘토입니다."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
                            당신의 건강 파트너
                        </h2>
                        <p className="text-xl text-gray-600">
                            시니어를 위해 특별히 설계된 웰니스 솔루션
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {/* AI Routine Card */}
                        <div className="bg-offWhite rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col">
                            <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Sun className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center font-serif">AI 맞춤 루틴</h3>
                            <p className="text-gray-600 text-center text-lg flex-grow">
                                그날의 컨디션에 따라<br/>가장 적합한 운동과 휴식을<br/>제안해 드립니다.
                            </p>
                        </div>
                        
                        {/* Natural Healing Card */}
                        <div className="bg-offWhite rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col">
                            <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Heart className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center font-serif">자연 치유법</h3>
                            <p className="text-gray-600 text-center text-lg flex-grow">
                                약에 의존하기보다<br/>자연의 힘으로 몸을<br/>다스리는 법을 배웁니다.
                            </p>
                        </div>

                        {/* Raphacell Clinic Card */}
                        <a href="https://raphacellclinic.com/29" target="_blank" rel="noopener noreferrer" className="block group h-full">
                            <div className="relative bg-offWhite rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-gray-100 h-full hover:-translate-y-1 transform flex flex-col">
                                {/* Homepage Icon Badge */}
                                <div className="absolute top-6 right-6 bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition z-10" title="홈페이지 방문">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                </div>
                                
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-100 transition">
                                    <Stethoscope className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center font-serif group-hover:text-primary transition">
                                    라파셀의원<br/>통증재활 클리닉
                                </h3>
                                <p className="text-gray-600 text-center text-lg flex-grow">
                                    박창혁 센터장님의<br/>전문 통증 치료와 재활 프로그램을<br/>만나보세요.
                                </p>
                            </div>
                        </a>

                        {/* Kanama Plus Card */}
                        <a href="https://www.youtube.com/watch?v=vLDNf2PnmpY" target="_blank" rel="noopener noreferrer" className="block group h-full">
                            <div className="relative bg-offWhite rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-gray-100 h-full hover:-translate-y-1 transform flex flex-col">
                                {/* YouTube Icon Badge */}
                                <div className="absolute top-6 right-6 bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition z-10" title="영상 보기">
                                    <Youtube className="w-5 h-5 text-red-600" />
                                </div>

                                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-cyan-200 transition">
                                    <Droplet className="w-8 h-8 text-cyan-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center font-serif group-hover:text-primary transition">
                                    카나마 플러스<br/>(pH 조절제)
                                </h3>
                                <p className="text-gray-600 text-center text-lg flex-grow">
                                    내 몸을 살리는 골든 밸런스.<br/>
                                    산성 체질을 약알칼리성으로<br/>
                                    리셋하여 통증을 케어하세요.
                                </p>
                            </div>
                        </a>

                        {/* Free Education Card */}
                        <div className="bg-offWhite rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col h-full">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Calendar className="w-8 h-8 text-green-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center font-serif">
                                박창혁 박사의<br />셀프케어 & 홈케어 무료 교육
                            </h3>
                            <div className="flex-grow flex flex-col justify-center">
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex flex-col text-center">
                                        <span className="font-bold text-gray-900 mb-1">일시</span>
                                        <span>매주 일요일 오후 3시 ~ 4시</span>
                                    </li>
                                    <li className="flex flex-col text-center">
                                        <span className="font-bold text-gray-900 mb-1">장소</span>
                                        <span>라파셀의원 세미나실</span>
                                        <span className="text-sm mt-1 text-gray-500">서울 강남구 압구정로28길 24, D&C빌딩 2층<br/>(압구정역 4번출구 60m)</span>
                                    </li>
                                    <li className="flex flex-col text-center mt-2">
                                        <span className="font-bold text-accent mb-1">사전 예약 (선착순)</span>
                                        <span className="text-lg font-bold">010-9726-7012</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Treatment Protocol Card (Static) */}
                        <div className="bg-offWhite rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1 group">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-200 transition">
                                <ClipboardList className="w-8 h-8 text-purple-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center font-serif group-hover:text-primary transition">
                                박창혁 박사의<br />치료 프로토콜
                            </h3>
                            <div className="flex-grow">
                                <ul className="space-y-2 text-gray-600 text-left list-disc pl-5">
                                    <li>희망과 안도감 제공</li>
                                    <li>지속적인 치료와 격려</li>
                                    <li>환자 상태 파악</li>
                                    <li>전압치료(파나셀치료)</li>
                                    <li>신경치료, 도수치료, 영양수액</li>
                                    <li>pH 조절, 식사요법, 보충제요법</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;