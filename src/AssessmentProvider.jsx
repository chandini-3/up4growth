import { createContext, useContext, useEffect, useMemo, lazy, Suspense } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { getAssessmentBySlug, getAssessmentConfig, getAssessmentPath } from './assessmentsData';

const Assessment = lazy(() => import('./Assessment'));

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMatch = matchPath({ path: '/assessments/:slug', end: true }, location.pathname);
  const slug = routeMatch?.params?.slug;
  const routedAssessment = getAssessmentBySlug(slug);
  const activeId = routedAssessment?.id ?? null;

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
      openAssessment: (id = 'life-audit') => {
        navigate(getAssessmentPath(id));
      },
      closeAssessment: () => {
        navigate('/assessments');
      },
    }),
    [activeId, navigate],
  );

  const hasAssessment = Boolean(activeId && getAssessmentConfig(activeId));

  return (
    <AssessmentContext.Provider value={value}>
      {children}
      {hasAssessment ? (
        <Suspense fallback={null}>
          <Assessment assessmentId={activeId} onClose={() => navigate('/assessments')} />
        </Suspense>
      ) : null}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  return useContext(AssessmentContext);
}
