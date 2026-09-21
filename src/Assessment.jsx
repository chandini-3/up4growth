import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOK_PAGE_PATH } from './calendlyConfig';
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { lifeAuditDomains } from './assessmentsData';

const SCORE_SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const FULL_MARK = 10;

const dimensionsKey = [
  'Career',
  'Health',
  'Financial Well-Being',
  'Relationships',
  'Fun and Recreation',
  'Physical Environment',
  'Personal Growth',
  'Spirituality'
];

const dimensionQuestions = {
  Career: 'How satisfied are you with your career now, and how confident are you about your future?',
  Health: 'How satisfied are you with your health now, and how confident are you about your future?',
  'Financial Well-Being': 'How secure do you feel financially today, and how ready are you for what lies ahead?',
  Relationships: 'How satisfied are you currently with your relationships, and how strong do you want them to become?',
  'Fun and Recreation': 'How satisfied are you currently with your fun & recreation, and how much joy do you want ahead?',
  'Physical Environment': 'How satisfied are you with your home and physical surroundings now, and in the future?',
  'Personal Growth': 'How intentional and consistent are you about your personal growth now, and in the future?',
  Spirituality: 'How connected and aligned do you feel with your sense of purpose or spirituality now, and in the future?'
};

const dimensionDescriptions = {
  Career: 'Your work direction, fulfillment, and professional progress.',
  Health: 'Your energy, wellbeing, and care for body and mind.',
  'Financial Well-Being': 'Your income, savings, security, and financial peace of mind.',
  Relationships: 'Your connection with family, friends, and people who matter.',
  'Fun and Recreation': 'Your leisure, hobbies, play, and enjoyment of life.',
  'Physical Environment': 'Your living space, workspace, and everyday surroundings.',
  'Personal Growth': 'Your learning, skills, self-awareness, and development.',
  Spirituality: 'Your meaning, values, inner peace, and sense of purpose.'
};

const ratingSteps = [
  {
    key: 'now',
    label: 'Now',
    hint: 'Where are you today?',
    tone: 'now',
    hintClass: 'text-orange-800 bg-orange-50',
    dotClass: 'bg-orange-500'
  },
  {
    key: 'future',
    label: 'Future (Ideal)',
    hint: 'Your ideal state in ~5 years',
    tone: 'future',
    hintClass: 'text-emerald-800 bg-emerald-50',
    dotClass: 'bg-emerald-500'
  }
];

const allQuestions = dimensionsKey.map((dim) => ({
  dimension: dim,
  question: dimensionQuestions[dim]
}));

/** Sample wedge levels for the intro Wheel of Life graphic (1–10 scale). */
const introWheelSegments = [
  { value: 6, color: '#ef4444' },
  { value: 8, color: '#f97316' },
  { value: 9, color: '#eab308' },
  { value: 4, color: '#a3e635' },
  { value: 8, color: '#22c55e' },
  { value: 8, color: '#38bdf8' },
  { value: 10, color: '#6366f1' },
  { value: 3, color: '#a855f7' }
];

function IntroWheelGraphic({ className = '' }) {
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 12;
  const n = introWheelSegments.length;

  const polar = (r, angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };

  const wedgePath = (value, index) => {
    const startAngle = (index * 360) / n;
    const endAngle = ((index + 1) * 360) / n;
    const r = (value / FULL_MARK) * maxR;
    const [x1, y1] = polar(r, startAngle);
    const [x2, y2] = polar(r, endAngle);
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Example Wheel of Life chart across eight life domains"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
        <circle
          key={level}
          cx={cx}
          cy={cy}
          r={(level / FULL_MARK) * maxR}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={level === 10 ? 1.75 : 1}
        />
      ))}
      {Array.from({ length: n }).map((_, index) => {
        const angle = (index * 360) / n;
        const [x, y] = polar(maxR, angle);
        return (
          <line
            key={`spoke-${index}`}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth="1.5"
          />
        );
      })}
      {introWheelSegments.map((segment, index) => (
        <path
          key={index}
          d={wedgePath(segment.value, index)}
          fill={segment.color}
          fillOpacity="0.78"
          stroke="#fff"
          strokeWidth="2"
        />
      ))}
      <circle cx={cx} cy={cy} r="3.5" fill="#9ca3af" />
    </svg>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
        <p className="font-semibold text-gray-800">{payload[0].payload.dimension}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-bold">
            {entry.name}: {entry.value} / {FULL_MARK}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function ScoreRow({ step, value, onSelect }) {
  return (
    <div className="life-audit-score-row">
      <div className="life-audit-score-row-head">
        <div className="life-audit-score-row-label">
          <span className={`life-audit-score-dot ${step.dotClass}`}></span>
          <p>{step.label}</p>
        </div>
        <span className={`life-audit-score-hint ${step.hintClass}`}>{step.hint}</span>
      </div>

      <div className={`life-audit-score-track life-audit-score-track--${step.tone}`}>
        {SCORE_SCALE.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onSelect(num)}
            className={`life-audit-score-btn life-audit-score-btn--${step.tone}${
              value === num ? ' is-selected' : ''
            }`}
            aria-pressed={value === num}
            aria-label={`Score ${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="life-audit-score-ends">
        <span>Very Dissatisfied</span>
        <span>Fully Satisfied</span>
      </div>
    </div>
  );
}

export default function Assessment({ onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState('intro');
  const [currentQuestionGlobalIndex, setCurrentQuestionGlobalIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const autoNextTimeoutRef = useRef(null);

  const clearAutoNext = () => {
    if (autoNextTimeoutRef.current) {
      clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = null;
    }
  };

  useEffect(() => () => clearAutoNext(), []);

  const handleStart = () => setStep('questions');

  const handleBookConsultation = () => {
    clearAutoNext();
    onClose?.();
    navigate(BOOK_PAGE_PATH);
  };

  const handleAnswer = (type, value) => {
    const { dimension } = allQuestions[currentQuestionGlobalIndex];
    setAnswers((prev) => {
      const newAns = { ...(prev[dimension] || {}), [type]: value };
      const updated = { ...prev, [dimension]: newAns };

      clearAutoNext();
      if (newAns.now !== undefined && newAns.future !== undefined) {
        autoNextTimeoutRef.current = setTimeout(() => {
          const nextBtn = document.getElementById('next-question-btn');
          if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
          }
        }, 500);
      }

      return updated;
    });
  };

  const currentQ = allQuestions[currentQuestionGlobalIndex] || allQuestions[0];
  const { dimension: currentDimension, question: currentQuestionText } = currentQ;
  const currentAnswerObj = answers[currentDimension] || {};
  const { now: nowScore, future: futureScore } = currentAnswerObj;

  const isCurrentComplete = nowScore !== undefined && futureScore !== undefined;
  const isLastQuestion = currentQuestionGlobalIndex === allQuestions.length - 1;
  const progressPercent = Math.round(
    ((currentQuestionGlobalIndex + (isCurrentComplete ? 1 : 0)) / allQuestions.length) * 100,
  );

  const handleNext = () => {
    clearAutoNext();
    if (!isLastQuestion) {
      setCurrentQuestionGlobalIndex((prev) => prev + 1);
      document.getElementById('assessment-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      calculateScores();
      setStep('results');
      document.getElementById('assessment-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    clearAutoNext();
    if (currentQuestionGlobalIndex > 0) {
      setCurrentQuestionGlobalIndex((prev) => prev - 1);
      document.getElementById('assessment-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setStep('intro');
  };

  const calculateScores = () => {
    const finalScores = dimensionsKey.map((dim) => {
      const ans = answers[dim] || {};
      const nowScore = ans.now || 0;
      const futureScore = ans.future || 0;
      return {
        dimension: dim,
        nowScore,
        futureScore,
        gap: Math.max(0, futureScore - nowScore),
        fullMark: FULL_MARK
      };
    });
    setScores(finalScores);
  };

  const getRecommendations = () => {
    if (!scores.length) return [];
    const sorted = [...scores]
      .filter((s) => s.futureScore > s.nowScore)
      .sort((a, b) => b.futureScore - b.nowScore - (a.futureScore - a.nowScore));
    return sorted.slice(0, 3).map((s) => s.dimension);
  };

  const drawResultsCanvas = () => {
    const width = 1600;
    const height = 900;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const tableX = 40;
    const tableY = 40;
    const tableW = 740;
    const rowH = 52;
    const headerH = 58;
    const colW = [70, 280, 130, 130, 130];

    // Title bar
    ctx.fillStyle = '#1e3a5f';
    ctx.fillRect(tableX, tableY, tableW, headerH);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Wheel of Life', tableX + tableW / 2, tableY + headerH / 2);

    // Column headers
    const headers = ['S.No', 'Life Domain', 'Now', 'Future', 'Gap'];
    const headerColors = ['#f2c94c', '#f2c94c', '#9dc3e6', '#a9d08e', '#f2c94c'];
    let x = tableX;
    const headerY = tableY + headerH;
    headers.forEach((header, index) => {
      ctx.fillStyle = headerColors[index];
      ctx.fillRect(x, headerY, colW[index], rowH);
      ctx.strokeStyle = '#d1d5db';
      ctx.strokeRect(x, headerY, colW[index], rowH);
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 18px Arial, Helvetica, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(header, x + colW[index] / 2, headerY + rowH / 2);
      x += colW[index];
    });

    // Rows
    scores.forEach((row, index) => {
      const y = headerY + rowH * (index + 1);
      const values = [
        String(index + 1),
        row.dimension,
        String(row.nowScore),
        String(row.futureScore),
        String(row.gap),
      ];
      const fills = [null, null, '#deebf7', '#e2efda', null];
      let cellX = tableX;
      values.forEach((value, colIndex) => {
        if (fills[colIndex]) {
          ctx.fillStyle = fills[colIndex];
          ctx.fillRect(cellX, y, colW[colIndex], rowH);
        }
        ctx.strokeStyle = '#d1d5db';
        ctx.strokeRect(cellX, y, colW[colIndex], rowH);
        ctx.fillStyle = '#111827';
        ctx.font = `${colIndex === 1 ? 'normal' : 'bold'} 17px Arial, Helvetica, sans-serif`;
        if (colIndex === 1) {
          ctx.textAlign = 'left';
          ctx.fillText(value, cellX + 14, y + rowH / 2);
        } else {
          ctx.textAlign = 'center';
          ctx.fillText(value, cellX + colW[colIndex] / 2, y + rowH / 2);
        }
        cellX += colW[colIndex];
      });
    });

    // Radar chart
    const chartBoxX = 820;
    const chartBoxY = 40;
    const chartBoxW = 740;
    const chartBoxH = 820;
    ctx.strokeStyle = '#d1d5db';
    ctx.strokeRect(chartBoxX, chartBoxY, chartBoxW, chartBoxH);

    // Legend
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(chartBoxX + 40, chartBoxY + 28);
    ctx.lineTo(chartBoxX + 80, chartBoxY + 28);
    ctx.stroke();
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 16px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Future', chartBoxX + 90, chartBoxY + 32);

    ctx.strokeStyle = '#ea580c';
    ctx.beginPath();
    ctx.moveTo(chartBoxX + 180, chartBoxY + 28);
    ctx.lineTo(chartBoxX + 220, chartBoxY + 28);
    ctx.stroke();
    ctx.fillStyle = '#111827';
    ctx.fillText('Now', chartBoxX + 230, chartBoxY + 32);

    const cx = chartBoxX + chartBoxW / 2;
    const cy = chartBoxY + chartBoxH / 2 + 10;
    const radius = 250;
    const n = scores.length;

    const pointAt = (value, index) => {
      const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
      const r = (value / FULL_MARK) * radius;
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
    };

    // Rings
    for (let level = 1; level <= 5; level += 1) {
      ctx.beginPath();
      for (let i = 0; i < n; i += 1) {
        const [px, py] = pointAt((FULL_MARK * level) / 5, i);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axes + labels
    scores.forEach((row, index) => {
      const [ex, ey] = pointAt(FULL_MARK, index);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;
      ctx.stroke();

      const [lx, ly] = pointAt(FULL_MARK + 1.25, index);
      ctx.fillStyle = '#374151';
      ctx.font = '14px Arial, Helvetica, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const words = row.dimension.split(' ');
      if (words.length > 1) {
        ctx.fillText(words[0], lx, ly - 8);
        ctx.fillText(words.slice(1).join(' '), lx, ly + 10);
      } else {
        ctx.fillText(row.dimension, lx, ly);
      }
    });

    const drawPolygon = (key, stroke, fill) => {
      ctx.beginPath();
      scores.forEach((row, index) => {
        const [px, py] = pointAt(row[key], index);
        if (index === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    drawPolygon('futureScore', '#2563eb', 'rgba(37, 99, 235, 0.12)');
    drawPolygon('nowScore', '#ea580c', 'rgba(234, 88, 12, 0.2)');

    return canvas;
  };

  const canvasToPdfBlob = (canvas) => {
    const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const jpegBase64 = jpegDataUrl.replace(/^data:image\/jpeg;base64,/, '');
    const binary = window.atob(jpegBase64);
    const jpegBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      jpegBytes[i] = binary.charCodeAt(i);
    }

    const pageWidth = 842;
    const pageHeight = 595;
    const margin = 24;
    const maxW = pageWidth - margin * 2;
    const maxH = pageHeight - margin * 2;
    const scale = Math.min(maxW / canvas.width, maxH / canvas.height);
    const drawW = canvas.width * scale;
    const drawH = canvas.height * scale;
    const drawX = (pageWidth - drawW) / 2;
    const drawY = (pageHeight - drawH) / 2;

    const encoder = new TextEncoder();
    const chunks = [];
    const offsets = [0];

    const append = (value) => {
      if (typeof value === 'string') {
        chunks.push(encoder.encode(value));
      } else {
        chunks.push(value);
      }
    };

    const currentLength = () => chunks.reduce((sum, chunk) => sum + chunk.length, 0);

    const addObject = (writeBody) => {
      offsets.push(currentLength());
      writeBody();
    };

    append('%PDF-1.4\n');

    addObject(() => {
      append('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    });
    addObject(() => {
      append('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
    });
    addObject(() => {
      append(
        '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Contents 4 0 R /Resources << /XObject << /Im0 5 0 R >> >> >>\nendobj\n',
      );
    });

    const contentStream = `q\n${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${drawX.toFixed(2)} ${drawY.toFixed(2)} cm\n/Im0 Do\nQ\n`;
    const contentBytes = encoder.encode(contentStream);
    addObject(() => {
      append(`4 0 obj\n<< /Length ${contentBytes.length} >>\nstream\n`);
      append(contentBytes);
      append('endstream\nendobj\n');
    });

    addObject(() => {
      append('5 0 obj\n');
      append(
        `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`,
      );
      append(jpegBytes);
      append('\nendstream\nendobj\n');
    });

    const xrefStart = currentLength();
    append(`xref\n0 ${offsets.length}\n`);
    append('0000000000 65535 f \n');
    for (let i = 1; i < offsets.length; i += 1) {
      append(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
    }
    append(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`);

    const total = currentLength();
    const output = new Uint8Array(total);
    let offset = 0;
    chunks.forEach((chunk) => {
      output.set(chunk, offset);
      offset += chunk.length;
    });
    return new Blob([output], { type: 'application/pdf' });
  };

  const handleDownloadResults = () => {
    if (!scores.length || isDownloading) return;

    setIsDownloading(true);

    try {
      const canvas = drawResultsCanvas();
      const blob = canvasToPdfBlob(canvas);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'life-audit-results.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download assessment PDF:', error);
      window.alert('Unable to download your results right now. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-white flex flex-col assessment-shell${
        step === 'questions' ? ' assessment-shell--questions' : ''
      }`}
      style={{ zIndex: 1100 }}
    >
      <div className="assessment-topbar shrink-0 border-b border-gray-100 bg-white px-5 sm:px-8 lg:px-10 pt-3 sm:pt-4 pb-3">
        <div className="w-full flex justify-between items-center gap-3">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 truncate">Life Audit Assessment</h2>
          <button
            onClick={onClose}
            className="shrink-0 text-gray-500 hover:text-gray-700 font-medium px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>

        {step === 'questions' && (
          <div className="assessment-progress w-full mt-3">
            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2 font-medium">
              <span>
                Domain {currentQuestionGlobalIndex + 1} of {allQuestions.length}
              </span>
              <span>{progressPercent}% Complete</span>
            </div>
            <div className="assessment-progress-track w-full bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
              <div
                className="assessment-progress-fill bg-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, progressPercent > 0 ? 2 : 0)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div
        id="assessment-scroll"
        className={`flex-1 min-h-0 ${
          step === 'questions' ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
      >
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-full flex flex-col"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full flex-grow flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="text-center lg:text-left order-2 lg:order-1">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                      Life Audit Assessment
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 mb-4 leading-relaxed max-w-md mx-auto lg:mx-0">
                      Get instant clarity on where your life feels aligned—and where it&apos;s asking for more.
                    </p>
                    <p className="text-base text-gray-500 mb-8 max-w-md mx-auto lg:mx-0">
                      Use a scale of 1 (very dissatisfied) to 10 (fully satisfied).
                    </p>
                    <div className="flex justify-center lg:justify-start">
                      <button
                        onClick={handleStart}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2"
                      >
                        Start Assessment <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                    <IntroWheelGraphic className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] h-auto" />
                  </div>
                </div>
              </div>

              <section className="life-audit-info" aria-labelledby="assessment-intro-info-title">
                <div className="container life-audit-info-grid">
                  <div className="life-audit-info-copy">
                    <h2 id="assessment-intro-info-title">What is the Life Audit Assessment?</h2>
                    <p>
                      The Wheel of Life is a tool to help you explore where you are in your life right now
                      and where you would like to be in the future.
                    </p>
                    <p>
                      Get a panoramic view of your well-being across eight key life areas. Use this free
                      assessment to spotlight your strengths, uncover blind-spots, and kick-start an action
                      plan that moves you forward.
                    </p>
                  </div>

                  <div className="life-audit-info-domains">
                    <h3>Life Domains</h3>
                    <ul className="life-audit-domain-list">
                      {lifeAuditDomains.map((domain) => (
                        <li key={domain.name}>
                          <span
                            className="life-audit-domain-swatch"
                            style={{ backgroundColor: domain.color }}
                            aria-hidden="true"
                          />
                          <span className="life-audit-domain-name">{domain.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {step === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col min-h-0 max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 w-full"
            >
              <div className="life-audit-question-card bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 min-h-0 flex flex-col justify-center text-center overflow-hidden">
                <h3 className="life-audit-domain-title text-orange-500 tracking-wider uppercase font-bold">
                  {currentDimension}
                </h3>
                <p className="life-audit-domain-desc text-gray-500">
                  {dimensionDescriptions[currentDimension]}
                </p>

                <h2 className="life-audit-question-text font-bold text-gray-900 leading-snug">
                  {currentQuestionText}
                </h2>

                <ScoreRow
                  step={ratingSteps[0]}
                  value={nowScore}
                  onSelect={(num) => handleAnswer('now', num)}
                />

                <div className="life-audit-score-divider border-t border-gray-100 max-w-3xl mx-auto w-full"></div>

                <ScoreRow
                  step={ratingSteps[1]}
                  value={futureScore}
                  onSelect={(num) => handleAnswer('future', num)}
                />
              </div>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-grow flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
                  Assessment
                </h2>
                <button
                  type="button"
                  onClick={handleDownloadResults}
                  disabled={isDownloading}
                  className="inline-flex items-center justify-center gap-2 self-start sm:self-auto bg-[#1e3a5f] hover:bg-[#152a45] disabled:opacity-70 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? 'Preparing PDF...' : 'Download Results'}
                </button>
              </div>

              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                {/* Wheel of Life table */}
                <div className="w-full overflow-x-auto border border-gray-300 bg-white shadow-sm">
                  <table className="w-full min-w-[420px] border-collapse text-sm sm:text-base">
                    <thead>
                      <tr>
                        <th
                          colSpan={5}
                          className="bg-[#1e3a5f] text-white text-center text-lg sm:text-xl font-bold py-3 tracking-wide"
                        >
                          Wheel of Life
                        </th>
                      </tr>
                      <tr className="bg-[#f2c94c] text-gray-900">
                        <th className="border border-gray-300 px-2 py-2 font-bold w-14">S.No</th>
                        <th className="border border-gray-300 px-3 py-2 font-bold text-left">Life Domain</th>
                        <th className="border border-gray-300 px-2 py-2 font-bold bg-[#9dc3e6]">Now</th>
                        <th className="border border-gray-300 px-2 py-2 font-bold bg-[#a9d08e]">Future</th>
                        <th className="border border-gray-300 px-2 py-2 font-bold">Gap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores.map((row, index) => (
                        <tr key={row.dimension} className="text-center">
                          <td className="border border-gray-300 px-2 py-2.5 font-medium text-gray-800">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 px-3 py-2.5 text-left font-medium text-gray-900">
                            {row.dimension}
                          </td>
                          <td className="border border-gray-300 px-2 py-2.5 bg-[#deebf7] font-semibold text-gray-900">
                            {row.nowScore}
                          </td>
                          <td className="border border-gray-300 px-2 py-2.5 bg-[#e2efda] font-semibold text-gray-900">
                            {row.futureScore}
                          </td>
                          <td className="border border-gray-300 px-2 py-2.5 font-semibold text-gray-900">
                            {row.gap}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Radar chart — Now vs Future */}
                <div className="w-full bg-white border border-gray-300 shadow-sm p-3 sm:p-4 h-[340px] sm:h-[420px] lg:h-full lg:min-h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="52%"
                      outerRadius={window.innerWidth < 768 ? '48%' : '68%'}
                      data={scores}
                      margin={{
                        top: 24,
                        right: window.innerWidth < 768 ? 36 : 28,
                        bottom: 16,
                        left: window.innerWidth < 768 ? 36 : 28
                      }}
                    >
                      <PolarGrid stroke="#d1d5db" />
                      <PolarAngleAxis
                        dataKey="dimension"
                        tick={(props) => {
                          const { x, y, payload, textAnchor } = props;
                          const words = payload.value.split(' ');
                          const isMobile = window.innerWidth < 768;

                          let shiftX = 0;
                          if (isMobile) {
                            if (textAnchor === 'end') shiftX = 10;
                            if (textAnchor === 'start') shiftX = -10;
                          }

                          if (words.length > 1) {
                            return (
                              <text
                                x={x + shiftX}
                                y={y}
                                textAnchor={textAnchor}
                                fill="#374151"
                                fontSize={isMobile ? 9 : 11}
                                fontWeight={500}
                              >
                                <tspan x={x + shiftX} dy="-0.4em">
                                  {words[0]}
                                </tspan>
                                <tspan x={x + shiftX} dy="1.15em">
                                  {words.slice(1).join(' ')}
                                </tspan>
                              </text>
                            );
                          }
                          return (
                            <text
                              x={x + shiftX}
                              y={y}
                              dy={4}
                              textAnchor={textAnchor}
                              fill="#374151"
                              fontSize={isMobile ? 9 : 11}
                              fontWeight={500}
                            >
                              {payload.value}
                            </text>
                          );
                        }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, FULL_MARK]}
                        tickCount={6}
                        tick={{ fill: '#6b7280', fontSize: 11 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        verticalAlign="top"
                        align="center"
                        iconType="plainline"
                        wrapperStyle={{ paddingBottom: 8, fontWeight: 600 }}
                      />
                      <Radar
                        name="Future"
                        dataKey="futureScore"
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.12}
                        strokeWidth={2}
                        animationDuration={1200}
                      />
                      <Radar
                        name="Now"
                        dataKey="nowScore"
                        stroke="#ea580c"
                        fill="#ea580c"
                        fillOpacity={0.2}
                        strokeWidth={2}
                        animationDuration={1200}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="w-full mt-8 space-y-6">
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Larger gaps between Now and Future show where focused attention can create the most
                    meaningful change.
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Biggest gaps to close:</h4>
                    <ul className="space-y-2">
                      {getRecommendations().map((req, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-orange-800 bg-white px-4 py-2 rounded-lg text-sm font-medium border border-orange-100 shadow-sm"
                        >
                          <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs">
                            {i + 1}
                          </span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    If you&apos;d like personalized support to close the gap between where you are and your
                    ideal life balance, schedule a <strong>free discovery session</strong> with one of our
                    coaches.
                  </p>
                  <button
                    type="button"
                    onClick={handleBookConsultation}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    BOOK A FREE CONSULTATION
                  </button>
                </div>

                <div className="flex justify-start pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      clearAutoNext();
                      setStep('questions');
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" /> Previous
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step === 'questions' && (
        <div className="shrink-0 border-t border-gray-100 bg-white px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="max-w-6xl mx-auto flex justify-between gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" /> Previous
            </button>
            <button
              id="next-question-btn"
              onClick={handleNext}
              disabled={!isCurrentComplete}
              className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm
                ${
                  !isCurrentComplete
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200 shadow-lg'
                }`}
            >
              {isLastQuestion ? 'See Results' : 'Next'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
