import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOK_PAGE_PATH, CALENDLY_PROFILE_URL } from './calendlyConfig';
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
import { getAssessmentConfig } from './assessmentsData';

const SCORE_SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const FULL_MARK = 10;

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
    hint: 'Your ideal state',
    tone: 'future',
    hintClass: 'text-emerald-800 bg-emerald-50',
    dotClass: 'bg-emerald-500'
  }
];

function IntroWheelGraphic({ domains, ariaLabel, className = '' }) {
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 12;
  const n = domains.length;
  const sampleValues = [6, 8, 9, 4, 8, 8, 10, 3, 7];

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
      aria-label={ariaLabel}
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
      {domains.map((domain, index) => (
        <path
          key={domain.name}
          d={wedgePath(sampleValues[index % sampleValues.length], index)}
          fill={domain.color}
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

function ScoreRow({ step, value, onSelect, lowLabel = 'Very Dissatisfied', highLabel = 'Fully Satisfied' }) {
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
        <span>{lowLabel} (1)</span>
        <span>{highLabel} (10)</span>
      </div>
    </div>
  );
}

export default function Assessment({ onClose, assessmentId = 'life-audit' }) {
  const navigate = useNavigate();
  const config = getAssessmentConfig(assessmentId) || getAssessmentConfig('life-audit');
  const domains = config.domains;
  const domainByName = useMemo(
    () => Object.fromEntries(domains.map((d) => [d.name, d])),
    [domains],
  );

  const allQuestions = useMemo(
    () =>
      domains.map((dim) => ({
        dimension: dim.name,
        now: dim.now,
        future: dim.future,
      })),
    [domains],
  );

  const scoreLowLabel = config.scoreLowLabel || 'Very Dissatisfied';
  const scoreHighLabel = config.scoreHighLabel || 'Fully Satisfied';

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
  const {
    dimension: currentDimension,
    now: nowQuestion,
    future: futureQuestion,
  } = currentQ;
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
    const finalScores = domains.map((dim) => {
      const ans = answers[dim.name] || {};
      const nowVal = ans.now || 0;
      const futureVal = ans.future || 0;
      return {
        dimension: dim.name,
        nowScore: nowVal,
        futureScore: futureVal,
        gap: Math.max(0, futureVal - nowVal),
        fullMark: FULL_MARK
      };
    });
    setScores(finalScores);
  };

  const scoresByGapDesc = [...scores].sort((a, b) => b.gap - a.gap);

  const getRecommendations = () => {
    if (!scores.length) return [];
    return scoresByGapDesc
      .filter((s) => s.gap > 0)
      .slice(0, 3)
      .map((s) => s.dimension);
  };

  const loadImage = (src) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Unable to load results logo'));
    image.src = src;
  });

  const PDF_PAGE_W = 595.28;
  const PDF_PAGE_H = 841.89;
  const PDF_SCALE = 3;
  const PDF_NAVY = '#203c61';
  const PDF_GRAY = '#566273';
  const PDF_ORANGE = '#ec751f';
  const PDF_DESIRED = '#4777b8';
  const PDF_PEACH = '#fff7e9';
  const PDF_ZEBRA = '#f8f9fa';
  const PDF_DIVIDER = '#e2e7eb';
  const PDF_BLOG_URL = 'https://up4growth.ch/blog/';

  const drawRoundRect = (ctx, x, y, w, h, r) => {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  };

  const drawResultsCanvas = async () => {
    const logo = await loadImage('/images/logo-clean.png');
    const S = PDF_SCALE;
    const width = Math.round(PDF_PAGE_W * S);
    const height = Math.round(PDF_PAGE_H * S);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const px = (pt) => pt * S;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.textBaseline = 'alphabetic';

    const marginX = px(42);
    const contentW = px(511);

    const logoH = px(53);
    const logoW = logoH * (logo.naturalWidth / logo.naturalHeight);
    ctx.drawImage(logo, px(39), px(26), logoW, logoH);

    ctx.fillStyle = PDF_NAVY;
    ctx.font = `bold ${px(22)}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText(config.pdfTitle, marginX, px(110));

    ctx.fillStyle = PDF_GRAY;
    ctx.font = `${px(10)}px Helvetica, Arial, sans-serif`;
    ctx.fillText(config.pdfSubtitle, marginX, px(130));

    ctx.strokeStyle = PDF_DIVIDER;
    ctx.lineWidth = px(0.7);
    ctx.beginPath();
    ctx.moveTo(marginX, px(144));
    ctx.lineTo(marginX + contentW, px(144));
    ctx.stroke();

    ctx.fillStyle = PDF_NAVY;
    ctx.font = `bold ${px(10)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('YOUR ASSESSMENT', marginX, px(166));

    const scoreByDim = Object.fromEntries(scores.map((row) => [row.dimension, row]));
    const chartRows = config.chartOrder.map((dim) => scoreByDim[dim]).filter(Boolean);
    const n = chartRows.length;
    const cx = px(175);
    const cy = px(275);
    const radius = px(91);

    const pointAt = (value, index) => {
      const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
      const r = (value / FULL_MARK) * radius;
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
    };

    for (let level = 1; level <= 5; level += 1) {
      ctx.beginPath();
      for (let i = 0; i < n; i += 1) {
        const [pxPt, pyPt] = pointAt((FULL_MARK * level) / 5, i);
        if (i === 0) ctx.moveTo(pxPt, pyPt);
        else ctx.lineTo(pxPt, pyPt);
      }
      ctx.closePath();
      ctx.strokeStyle = PDF_DIVIDER;
      ctx.lineWidth = px(0.65);
      ctx.stroke();
    }
    for (let i = 0; i < n; i += 1) {
      const [ex, ey] = pointAt(FULL_MARK, i);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = PDF_DIVIDER;
      ctx.lineWidth = px(0.65);
      ctx.stroke();
    }

    const drawPolygon = (key, stroke, fill) => {
      ctx.beginPath();
      chartRows.forEach((row, index) => {
        const [x, y] = pointAt(row[key], index);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = px(2.2);
      ctx.stroke();
    };

    drawPolygon('futureScore', PDF_DESIRED, 'rgba(71, 119, 184, 0.16)');
    drawPolygon('nowScore', PDF_ORANGE, 'rgba(236, 117, 31, 0.18)');

    ctx.fillStyle = PDF_GRAY;
    ctx.font = `${px(8)}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    chartRows.forEach((row, index) => {
      const [lx, ly] = pointAt(FULL_MARK + 1.55, index);
      const meta = domainByName[row.dimension];
      ctx.fillText(meta?.shortLabel || row.dimension, lx, ly);
    });
    ctx.textBaseline = 'alphabetic';

    const legendX = px(375);
    ctx.strokeStyle = PDF_ORANGE;
    ctx.lineWidth = px(2.3);
    ctx.beginPath();
    ctx.moveTo(legendX, px(186));
    ctx.lineTo(legendX + px(24), px(186));
    ctx.stroke();
    ctx.fillStyle = PDF_GRAY;
    ctx.font = `${px(10)}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText('Now', legendX + px(32), px(189));

    ctx.strokeStyle = PDF_DESIRED;
    ctx.beginPath();
    ctx.moveTo(legendX, px(209));
    ctx.lineTo(legendX + px(24), px(209));
    ctx.stroke();
    ctx.fillStyle = PDF_GRAY;
    ctx.fillText('Desired', legendX + px(32), px(212));

    ctx.fillStyle = PDF_NAVY;
    ctx.font = `bold ${px(12)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('Notice what stands out.', legendX, px(256));

    ctx.fillStyle = PDF_GRAY;
    ctx.font = `${px(9)}px Helvetica, Arial, sans-serif`;
    const insightLines = [
      'A larger gap can be a useful',
      'conversation starter. You decide',
      'what matters most right now.',
    ];
    insightLines.forEach((line, i) => {
      ctx.fillText(line, legendX, px(276 + i * 13));
    });

    ctx.font = `${px(8)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('Scores reflect your own assessment on a scale of 1-10.', marginX, px(400));

    ctx.fillStyle = PDF_NAVY;
    ctx.font = `bold ${px(10)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('YOUR RESULTS', marginX, px(426));

    const tableX = marginX;
    const tableW = contentW;
    const colLife = px(280);
    const colNum = (tableW - colLife) / 3;
    const headerH = px(22);
    const rowH = px(scores.length > 8 ? 17 : 19);
    const headerY = px(434);
    const tableRows = [...scores].sort((a, b) => b.gap - a.gap);

    ctx.fillStyle = PDF_NAVY;
    ctx.fillRect(tableX, headerY, tableW, headerH);
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${px(8)}px Helvetica, Arial, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(config.pdfAreaHeader, tableX + px(12), headerY + headerH / 2);
    ctx.textAlign = 'center';
    ctx.fillText('NOW', tableX + colLife + colNum / 2, headerY + headerH / 2);
    ctx.fillText('DESIRED', tableX + colLife + colNum * 1.5, headerY + headerH / 2);
    ctx.fillText('GAP', tableX + colLife + colNum * 2.5, headerY + headerH / 2);

    tableRows.forEach((row, index) => {
      const y = headerY + headerH + rowH * index;
      if (index % 2 === 0) {
        ctx.fillStyle = PDF_ZEBRA;
        ctx.fillRect(tableX, y, tableW, rowH);
      }
      ctx.strokeStyle = PDF_DIVIDER;
      ctx.lineWidth = px(0.7);
      ctx.beginPath();
      ctx.moveTo(tableX, y + rowH);
      ctx.lineTo(tableX + tableW, y + rowH);
      ctx.stroke();

      const meta = domainByName[row.dimension];
      ctx.fillStyle = PDF_NAVY;
      ctx.font = `${px(9)}px Helvetica, Arial, sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(meta?.tableLabel || row.dimension, tableX + px(12), y + rowH / 2);
      ctx.textAlign = 'center';
      ctx.fillText(String(row.nowScore), tableX + colLife + colNum / 2, y + rowH / 2);
      ctx.fillText(String(row.futureScore), tableX + colLife + colNum * 1.5, y + rowH / 2);
      ctx.fillText(String(row.gap), tableX + colLife + colNum * 2.5, y + rowH / 2);
    });
    ctx.textBaseline = 'alphabetic';

    const tableBottom = headerY + headerH + rowH * tableRows.length;
    const pauseY = Math.max(tableBottom + px(18), px(646));
    const pauseH = px(57);
    ctx.fillStyle = PDF_PEACH;
    drawRoundRect(ctx, tableX, pauseY, tableW, pauseH, px(6));
    ctx.fill();

    ctx.fillStyle = PDF_NAVY;
    ctx.font = `bold ${px(9)}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText('PAUSE & REFLECT', tableX + px(16), pauseY + px(20));
    ctx.font = `${px(10)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('Which area matters most to you now?', tableX + px(16), pauseY + px(40));
    ctx.font = `${px(9)}px Helvetica, Arial, sans-serif`;
    ctx.fillText(
      'What is one small step you could take?',
      tableX + px(250),
      pauseY + px(40),
    );

    const learnY = pauseY + pauseH + px(28);
    ctx.fillStyle = PDF_NAVY;
    ctx.font = `bold ${px(9)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('KEEP LEARNING', tableX, learnY);
    ctx.fillStyle = PDF_GRAY;
    ctx.font = `${px(9)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('Practical articles on personal and professional growth', tableX, learnY + px(16));
    ctx.fillStyle = PDF_ORANGE;
    ctx.font = `bold ${px(9)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('Read the Up4Growth blog  >', tableX, learnY + px(32));
    const blogLink = {
      x1: 42,
      y1: PDF_PAGE_H - (learnY / S + 34),
      x2: 225,
      y2: PDF_PAGE_H - (learnY / S + 16),
      uri: PDF_BLOG_URL,
    };

    const ctaX = px(319);
    const ctaY = learnY - px(2);
    const ctaW = px(234);
    const ctaH = px(42);
    ctx.fillStyle = PDF_ORANGE;
    drawRoundRect(ctx, ctaX, ctaY, ctaW, ctaH, px(5));
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${px(9)}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('BOOK A FREE DISCOVERY CALL', ctaX + ctaW / 2, ctaY + px(17));
    ctx.font = `${px(7)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('Personalized guidance and coaching', ctaX + ctaW / 2, ctaY + px(30));
    const ctaLink = {
      x1: 319,
      y1: PDF_PAGE_H - (ctaY / S + ctaH / S),
      x2: 553,
      y2: PDF_PAGE_H - ctaY / S,
      uri: CALENDLY_PROFILE_URL,
    };

    ctx.strokeStyle = PDF_DIVIDER;
    ctx.lineWidth = px(0.7);
    ctx.beginPath();
    ctx.moveTo(tableX, px(791));
    ctx.lineTo(tableX + tableW, px(791));
    ctx.stroke();

    ctx.fillStyle = PDF_GRAY;
    ctx.font = `${px(8)}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText('Up4Growth  |  Clarity. Intention. Growth.', tableX, px(808));
    ctx.textAlign = 'right';
    ctx.fillText('up4growth.ch', tableX + tableW, px(808));

    return { canvas, links: [blogLink, ctaLink] };
  };

  const canvasToPdfBlob = (canvas, links = []) => {
    const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.94);
    const jpegBase64 = jpegDataUrl.replace(/^data:image\/jpeg;base64,/, '');
    const binary = window.atob(jpegBase64);
    const jpegBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      jpegBytes[i] = binary.charCodeAt(i);
    }

    const pageWidth = PDF_PAGE_W;
    const pageHeight = PDF_PAGE_H;
    const drawW = pageWidth;
    const drawH = pageHeight;
    const drawX = 0;
    const drawY = 0;

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

    const escapePdfString = (value) =>
      value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

    append('%PDF-1.4\n');

    addObject(() => {
      append('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    });
    addObject(() => {
      append('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
    });

    const annotRefs = links.map((_, i) => `${6 + i} 0 R`).join(' ');
    addObject(() => {
      append(
        `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents 4 0 R /Resources << /XObject << /Im0 5 0 R >> >> /Annots [${annotRefs}] >>\nendobj\n`,
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

    links.forEach((link, index) => {
      addObject(() => {
        append(
          `${6 + index} 0 obj\n<< /Type /Annot /Subtype /Link /Rect [${link.x1.toFixed(2)} ${link.y1.toFixed(2)} ${link.x2.toFixed(2)} ${link.y2.toFixed(2)}] /Border [0 0 0] /A << /S /URI /URI (${escapePdfString(link.uri)}) >> >>\nendobj\n`,
        );
      });
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

  const handleDownloadResults = async () => {
    if (!scores.length || isDownloading) return;

    setIsDownloading(true);

    try {
      const { canvas, links } = await drawResultsCanvas();
      const blob = canvasToPdfBlob(canvas, links);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileSlug =
        assessmentId === 'career-audit'
          ? 'Up4Growth_Career_Audit_Results.pdf'
          : 'Up4Growth_Wheel_of_Life_Results.pdf';
      link.download = fileSlug;
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
          <h2 className="text-base sm:text-lg font-bold text-gray-800 truncate">{config.title}</h2>
          <button
            onClick={onClose}
            className="shrink-0 bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5 rounded-md transition-colors"
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
        className={`flex-1 min-h-0 overflow-y-auto`}
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
                      {config.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 mb-4 leading-relaxed max-w-md mx-auto lg:mx-0">
                      {config.summary}
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
                    <IntroWheelGraphic
                      domains={domains}
                      ariaLabel={config.chartAriaLabel}
                      className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] h-auto"
                    />
                  </div>
                </div>
              </div>

              <section className="life-audit-info" aria-labelledby="assessment-intro-info-title">
                <div className="container life-audit-info-grid">
                  <div className="life-audit-info-copy">
                    <h2 id="assessment-intro-info-title">{config.introInfoTitle}</h2>
                    {config.introInfoParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="life-audit-info-domains">
                    <h3>{config.domainsHeading}</h3>
                    <ul className="life-audit-domain-list">
                      {domains.map((domain) => (
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
              className="min-h-full flex flex-col justify-start max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 w-full"
            >
              <div className="life-audit-question-card bg-white rounded-2xl shadow-sm border border-gray-100 w-full text-center">
                <h3 className="life-audit-domain-title text-orange-500 tracking-wider uppercase font-bold">
                  {currentDimension}
                </h3>
                <p className="life-audit-domain-desc text-gray-500">
                  {domainByName[currentDimension]?.description}
                </p>

                <div className="life-audit-question-block">
                  <p className="life-audit-question-kicker">Current satisfaction</p>
                  <h2 className="life-audit-question-text font-bold text-gray-900 leading-snug">
                    {nowQuestion}
                  </h2>
                </div>

                <ScoreRow
                  step={ratingSteps[0]}
                  value={nowScore}
                  onSelect={(num) => handleAnswer('now', num)}
                  lowLabel={scoreLowLabel}
                  highLabel={scoreHighLabel}
                />

                <div className="life-audit-score-divider border-t border-gray-100 max-w-3xl mx-auto w-full"></div>

                <div className="life-audit-question-block">
                  <p className="life-audit-question-kicker life-audit-question-kicker--future">
                    Future satisfaction
                  </p>
                  <h2 className="life-audit-question-text font-bold text-gray-900 leading-snug">
                    {futureQuestion}
                  </h2>
                </div>

                <ScoreRow
                  step={ratingSteps[1]}
                  value={futureScore}
                  onSelect={(num) => handleAnswer('future', num)}
                  lowLabel={scoreLowLabel}
                  highLabel={scoreHighLabel}
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
                  {config.title}
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
                <div className="w-full overflow-x-auto border border-gray-300 bg-white shadow-sm">
                  <table className="w-full min-w-[420px] border-collapse text-sm sm:text-base">
                    <thead>
                      <tr>
                        <th
                          colSpan={5}
                          className="bg-[#1e3a5f] text-white text-center text-lg sm:text-xl font-bold py-3 tracking-wide"
                        >
                          {config.resultsTableTitle}
                        </th>
                      </tr>
                      <tr className="bg-[#f2c94c] text-gray-900">
                        <th className="border border-gray-300 px-2 py-2 font-bold w-14">S.No</th>
                        <th className="border border-gray-300 px-3 py-2 font-bold text-left">
                          {config.domainColumnLabel}
                        </th>
                        <th className="border border-gray-300 px-2 py-2 font-bold bg-[#9dc3e6]">Now</th>
                        <th className="border border-gray-300 px-2 py-2 font-bold bg-[#a9d08e]">Future</th>
                        <th className="border border-gray-300 px-2 py-2 font-bold">Gap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scoresByGapDesc.map((row, index) => (
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
                    {config.nextStepsCopy.includes('free discovery session') ? (
                      <>
                        {config.nextStepsCopy.split('free discovery session')[0]}
                        <strong>free discovery session</strong>
                        {config.nextStepsCopy.split('free discovery session')[1]}
                      </>
                    ) : (
                      config.nextStepsCopy
                    )}
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
