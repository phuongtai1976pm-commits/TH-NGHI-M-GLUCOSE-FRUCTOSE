import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/chemistryData';
import { CheckCircle, XCircle, Award, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];
  const isAnswered = selectedAnswers[currentIdx] !== undefined;
  const isCorrect = selectedAnswers[currentIdx] === question.correctAnswer;

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentIdx] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-amber-500" />
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              Ngân Hàng Trắc Nghiệm Củng Cố Hóa Học 12
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Các câu hỏi bám sát ma trận đề thi SGK Hóa 12 (2018) - Bài 4 Carbohydrate: Glucose & Fructose.
          </p>
        </div>

        {!showResult && (
          <div className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] uppercase text-slate-500 font-bold block">Tiến độ làm bài</span>
            <span className="text-sm font-bold text-indigo-700">
              Câu {currentIdx + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
        )}
      </div>

      {/* Main Quiz Area */}
      {!showResult ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          {/* Question Title & Level Badge */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                question.difficulty === 'Nhận biết'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : question.difficulty === 'Thông hiểu'
                  ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                Mức độ: {question.difficulty}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 mt-2 leading-snug">
                Câu {currentIdx + 1}: {question.question}
              </h3>
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {question.options.map((opt, optIdx) => {
              const selected = selectedAnswers[currentIdx] === optIdx;
              const isOptionCorrect = optIdx === question.correctAnswer;

              let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 cursor-pointer';
              if (isAnswered) {
                if (isOptionCorrect) {
                  btnStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold shadow-xs';
                } else if (selected) {
                  btnStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-950 font-bold shadow-xs';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-mono font-bold text-slate-700 flex items-center justify-center shrink-0 shadow-xs">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="font-medium">{opt}</span>
                  </div>

                  {isAnswered && isOptionCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {isAnswered && selected && !isOptionCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center space-x-1.5 font-bold mb-1">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>{isCorrect ? 'Chính xác!' : 'Chưa đúng — Lời giải chi tiết:'}</span>
              </div>
              <p className="font-medium">{question.explanation}</p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              ← Câu Trước
            </button>

            {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                disabled={!isAnswered}
                className="px-5 py-2 bg-indigo-700 hover:bg-indigo-800 disabled:opacity-40 text-white rounded-lg text-xs font-bold shadow-xs transition flex items-center space-x-1 cursor-pointer"
              >
                <span>Câu Tiếp Theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowResult(true)}
                disabled={!isAnswered}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
              >
                Xem Kết Quả Luyện Tập
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Result Summary Score Card */
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 bg-amber-100 border border-amber-300 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-10 h-10 text-amber-600" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800">Kết Quả Bài Luyện Tập</h3>
            <p className="text-3xl font-extrabold text-amber-600 mt-2">
              {calculateScore()} / {QUIZ_QUESTIONS.length}
            </p>
            <p className="text-xs text-slate-600 mt-2 font-medium">
              {calculateScore() >= 6
                ? 'Xuất sắc! Bạn đã nắm rất vững kiến thức bài Carbohydrate (Glucose & Fructose).'
                : 'Bạn cần ôn lại kĩ hơn phần phản ứng tráng bạc và phân biệt bằng nước Bromine nhé!'}
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center space-x-2 mx-auto cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại Bài Luyện Tập</span>
          </button>
        </div>
      )}
    </div>
  );
};

