import {
  useEffect,
  useRef,
  useState,
  ElementType,
  ReactNode,
  Suspense,
  startTransition,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
} from 'react';

export type LazyLoadParams = {
  forceVisible?: boolean;
  rootId?: string;
  once?: boolean;
  direction?: 'vertical' | 'horizontal';
  margin?: string;
};

export type LazyLoadProps<T extends ElementType = 'div'> = {
  fallback?: ReactNode;
  children: ReactNode;
  as?: T;
  suspense?: boolean;
  onVisible?: () => void;
} & ComponentPropsWithoutRef<T> &
  LazyLoadParams;

export function useLazyLoad(params?: LazyLoadParams) {
  const {
    forceVisible = false,
    rootId,
    direction = 'vertical',
    margin = '0px',
    once = true,
  } = params ?? {};
  const [isVisible, setIsVisible] = useState(forceVisible);
  const rootRef = useRef<HTMLElement>();
  const targetRef = useRef<ComponentPropsWithRef<ElementType>>(null);
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
    if (rootElement) {
      rootRef.current = rootElement;
    }
  }, [rootId]);

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

  return {
    ref: targetRef,
    isVisible,
  };
}

export default function LazyLoad<T extends ElementType = 'div'>({
  fallback,
  children,
  forceVisible,
  rootId,
  direction,
  margin,
  once,
  onVisible,
  suspense = false,
  as,
  ...props
}: LazyLoadProps<T>) {
  const prevVisible = useRef<boolean>();
  const { ref, isVisible } = useLazyLoad({
    forceVisible,
    rootId,
    direction,
    margin,
    once,
  });
  if (!prevVisible.current && isVisible && onVisible) {
    onVisible();
  }
  if (prevVisible.current !== isVisible) {
    prevVisible.current = isVisible;
  }

  const displayComponent = isVisible ? children : fallback;
  const Tag = as ?? 'div';

  return (
    <Tag ref={ref} {...props}>
      {suspense ? (
        <Suspense fallback={fallback}>{displayComponent}</Suspense>
      ) : (
        displayComponent
      )}
    </Tag>
  );
}
