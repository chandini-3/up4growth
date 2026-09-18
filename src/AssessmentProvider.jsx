import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Assessment from './Assessment';

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!activeId) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
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
      {activeId === 'life-audit' && <Assessment onClose={() => setActiveId(null)} />}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  return useContext(AssessmentContext);
}
