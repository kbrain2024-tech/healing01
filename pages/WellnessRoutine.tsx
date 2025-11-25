import React, { useState } from 'react';
import { generateWellnessRoutine } from '../services/geminiService';
import { WellnessRoutineResponse, LoadingState } from '../types';
import { Sun, Coffee, Book, Activity, Moon, RefreshCw, Smile, Utensils, Share2, Check } from 'lucide-react';

const WellnessRoutine: React.FC = () => {
    const [condition, setCondition] = useState('');
    const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
    const [routine, setRoutine] = useState<WellnessRoutineResponse | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerate = async () => {
        if (!condition.trim()) return;
        
        setStatus(LoadingState.LOADING);
        setRoutine(null);

        const result = await generateWellnessRoutine(condition);
        
        if (result) {
            setRoutine(result);
            setStatus(LoadingState.SUCCESS);
        } else {
            setStatus(LoadingState.ERROR);
        }
    };

    const handleShare = async () => {
        if (!routine) return;

        const shareText = `[K-웰니스 힐링] 오늘의 맞춤 루틴\n\n🌿 ${routine.title}\n✨ 집중 포인트: ${routine.focus}\n\n${routine.steps.map((step, i) => `${i + 1}. ${step.activity} (${step.time})\n   ${step.description}`).join('\n\n')}\n\n건강한 하루 되세요!`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'K-웰니스 힐링 맞춤 루틴',
                    text: shareText,
                });
            } catch (error) {
                console.log('Error sharing', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareText);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy!', err);
            }
        }
    };

    const getIcon = (iconName: string) => {
        const lower = iconName.toLowerCase();
        if (lower.includes('sun')) return <Sun className="w-6 h-6 text-orange-500" />;
        if (lower.includes('coffee')) return <Coffee className="w-6 h-6 text-brown-500" />;
        if (lower.includes('book')) return <Book className="w-6 h-6 text-blue-500" />;
        if (lower.includes('stretch') || lower.includes('activity')) return <Activity className="w-6 h-6 text-green-500" />;
        if (lower.includes('moon')) return <Moon className="w-6 h-6 text-purple-500" />;
        if (lower.includes('eat') || lower.includes('food')) return <Utensils className="w-6 h-6 text-red-400" />;
        return <Smile className="w-6 h-6 text-primary" />;
    };

    return (
        <div className="min-h-screen bg-offWhite py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif mb-4">
                        오늘의 맞춤 건강 루틴
                    </h1>
                    <p className="text-lg text-gray-600">
                        현재 컨디션을 알려주시면, 딱 맞는 15분 루틴을 만들어 드립니다.
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
                    <label className="block text-xl font-bold text-gray-800 mb-4">
                        지금 기분이나 몸 상태가 어떠신가요?
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            placeholder="예: 어깨가 뻐근해요, 소화가 안 돼요, 우울해요"
                            className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg"
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={status === LoadingState.LOADING || !condition.trim()}
                            className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primaryDark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                        >
                            {status === LoadingState.LOADING ? (
                                <RefreshCw className="animate-spin w-6 h-6" />
                            ) : (
                                '루틴 만들기'
                            )}
                        </button>
                    </div>
                    {/* Quick Suggestions */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {['무릎이 아파요', '잠이 안 와요', '활력이 필요해요', '눈이 침침해요'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setCondition(tag)}
                                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary hover:text-gray-800 transition"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Section */}
                {status === LoadingState.ERROR && (
                    <div className="bg-red-50 text-red-800 p-4 rounded-xl text-center">
                        죄송합니다. 루틴을 생성하는 중에 오류가 발생했습니다. 다시 시도해 주세요.
                    </div>
                )}

                {status === LoadingState.SUCCESS && routine && (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">
                        <div className="bg-secondary p-8 text-center relative">
                            <button
                                onClick={handleShare}
                                className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition text-gray-700 hover:text-primary"
                                title={navigator.share ? "공유하기" : "복사하기"}
                            >
                                {isCopied ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5" />}
                            </button>

                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-serif mb-2">
                                {routine.title}
                            </h2>
                            <p className="text-gray-700 font-medium text-lg">
                                집중 포인트: {routine.focus}
                            </p>
                        </div>
                        <div className="p-6 sm:p-10 space-y-8">
                            {routine.steps.map((step, index) => (
                                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition">
                                    <div className="flex-shrink-0 bg-offWhite p-3 rounded-full border border-gray-200">
                                        {getIcon(step.icon)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-xl font-bold text-gray-800">{step.activity}</h3>
                                            <span className="bg-primary bg-opacity-10 text-primaryDark px-3 py-1 rounded-full text-sm font-bold">
                                                {step.time}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                            <p className="text-gray-500 text-sm">
                                * 이 루틴은 AI가 생성한 제안입니다. 통증이 심하면 의사와 상담하세요.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WellnessRoutine;
