import {
  useEffect,
  useRef,
  useState,
  ElementType,
  ReactNode,
  Suspense,
  startTransition,
} from 'react';

export type LazyLoadProps = {
  fallback?: ReactNode;
  children: ReactNode;
  as?: ElementType;
  forceVisible?: boolean;
  rootId?: string;
  once?: boolean;
  onVisible?: () => void;
  suspense?: boolean;
  direction?: 'vertical' | 'horizontal';
  margin?: string;
  // eslint-disable-next-line
  [x: string]: any;
};

export default function LazyLoad({
  fallback,
  children,
  forceVisible = false,
  rootId,
  direction = 'vertical',
  margin = '0px',
  once = true,
  onVisible,
  suspense = false,
  as: Tag = 'div',
  ...props
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(forceVisible);
  const rootRef = useRef<HTMLElement>();
  const targetRef = useRef<HTMLElement>();
  const observerRef = useRef<IntersectionObserver | null>(null);

  if (!isVisible && forceVisible) {
    setIsVisible(true);
  }

  const cleanupObserver = (): void => {
    observerRef.current?.disconnect();
    observerRef.current = null;
  };

  useEffect(() => {
    if (!rootId) {
      return;
    }
    const rootElement = document.getElementById(rootId);
    rootElement && (rootRef.current = rootElement);
  }, [rootId]);

  useEffect(() => {
    isVisible && onVisible && onVisible();
  }, [isVisible, onVisible]);

  useEffect(() => {
    if (observerRef.current) {
      return;
    }
    if (once && isVisible) {
      return;
    }
    const el = targetRef.current;
    if (!el) {
      return;
    }
    const rootMargin =
      direction === 'vertical' ? `${margin} 0px` : `0px ${margin}`;
    const options = {
      root: rootRef.current,
      rootMargin,
      threshold: 0,
    };
    const checkInViewportAndShow: IntersectionObserverCallback = entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        startTransition(() => {
          setIsVisible(true);
        });
        once && cleanupObserver();
      } else {
        once ||
          startTransition(() => {
            setIsVisible(false);
          });
      }
    };
    observerRef.current = new IntersectionObserver(
      checkInViewportAndShow,
      options
    );
    observerRef.current.observe(el);
    return cleanupObserver;
  }, [direction, isVisible, margin, once]);

  const displayComponent = isVisible ? children : fallback;

  return (
    <Tag ref={targetRef} {...props}>
      {suspense ? (
        <Suspense fallback={fallback}>{displayComponent}</Suspense>
      ) : (
        displayComponent
      )}
    </Tag>
  );
}
