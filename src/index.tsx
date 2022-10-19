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
  // eslint-disable-next-line
  [x: string]: any;
} & Omit<IntersectionObserverInit, 'root'>;

export default function LazyLoad({
  fallback,
  children,
  forceVisible = false,
  rootId,
  rootMargin,
  threshold,
  once = true,
  onVisible,
  suspense = false,
  as: Tag = 'div',
  ...props
}: LazyLoadProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(forceVisible);
  const rootRef = useRef<HTMLElement>();
  const targetRef = useRef<HTMLElement>();
  const observerRef = useRef<IntersectionObserver | null>(null);
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
    setIsVisible(forceVisible);
  }, [forceVisible]);

  useEffect(() => {
    isVisible && onVisible && onVisible();
  }, [isVisible, onVisible]);

  useEffect(() => {
    if (observerRef.current) {
      return;
    }
    const el = targetRef.current;
    if (!el) {
      return;
    }
    const options = {
      root: rootRef.current,
      rootMargin,
      threshold,
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
  }, [once, rootMargin, threshold]);

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
