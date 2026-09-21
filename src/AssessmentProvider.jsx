import { createContext, useContext, useEffect, useMemo, useState, lazy, Suspense } from 'react';

const Assessment = lazy(() => import('./Assessment'));

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!activeId) {
      document.body.style.overflow = '';
      return undefined;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous || '';
    };
  }, [activeId]);

  const value = useMemo(
    () => ({
      isAssessmentOpen: Boolean(activeId),
      activeAssessmentId: activeId,
      openAssessment: (id = 'life-audit') => setActiveId(id),
      closeAssessment: () => setActiveId(null),
    }),
    [activeId],
  );

  return (
    <AssessmentContext.Provider value={value}>
      {children}
      {activeId === 'life-audit' ? (
        <Suspense fallback={null}>
          <Assessment onClose={() => setActiveId(null)} />
        </Suspense>
      ) : null}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  return useContext(AssessmentContext);
}
