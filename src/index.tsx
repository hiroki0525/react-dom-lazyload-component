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
  InvisibleComponent?: ReactNode;
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
  InvisibleComponent = null,
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
    const el = targetRef.current;
    if (!el) {
      return;
    }
    const options = {
      root: rootRef.current,
      rootMargin,
      threshold,
    };
    const checkInViewportAndShow: IntersectionObserverCallback = (
      entries,
      observer
    ) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        startTransition(() => {
          setIsVisible(true);
        });
        once && observer.disconnect();
      } else {
        once ||
          startTransition(() => {
            setIsVisible(false);
          });
      }
    };
    const observer = new IntersectionObserver(checkInViewportAndShow, options);
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  const displayComponent = isVisible ? children : InvisibleComponent;

  return (
    <Tag ref={targetRef} {...props}>
      {suspense ? (
        <Suspense fallback={InvisibleComponent}>{displayComponent}</Suspense>
      ) : (
        displayComponent
      )}
    </Tag>
  );
}
