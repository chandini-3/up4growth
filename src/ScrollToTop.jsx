import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function shouldKeepHashScroll(pathname, hash) {
  return pathname === '/' && Boolean(hash) && hash !== '#';
}

function resetScroll() {
  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';

  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  html.scrollTop = 0;
  document.body.scrollTop = 0;

  html.style.scrollBehavior = previousBehavior;
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    if (shouldKeepHashScroll(pathname, hash)) return undefined;

    resetScroll();

    const frame = requestAnimationFrame(resetScroll);
    const timeouts = [0, 50, 150, 400].map((delay) => setTimeout(resetScroll, delay));

    const onLoad = () => resetScroll();
    const onPageShow = () => resetScroll();
    window.addEventListener('load', onLoad);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      cancelAnimationFrame(frame);
      timeouts.forEach(clearTimeout);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [pathname, hash]);

  return null;
}
