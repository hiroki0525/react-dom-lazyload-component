import {
  useEffect,
  useRef,
  useState,
  ElementType,
  ReactNode,
  Suspense,
  isValidElement,
} from 'react';

export type LazyLoadProps = {
  InvisibleComponent?: ReactNode;
  children: ReactNode;
  as?: ElementType;
  forceVisible?: boolean;
  rootId?: string;
  once?: boolean;
  onVisible?: () => void;
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
    if (rootElement) {
      rootRef.current = rootElement;
    }
  }, [rootId]);

  useEffect(() => {
    setIsVisible(forceVisible);
  }, [forceVisible]);

  useEffect(() => {
    if (isVisible) {
      onVisible && onVisible();
    }
  }, [isVisible]);

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
        setIsVisible(true);
        once && observer.disconnect();
      } else {
        once || setIsVisible(false);
      }
    };
    const observer = new IntersectionObserver(checkInViewportAndShow, options);
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [targetRef, rootRef]);

  const isLazyChildren =
    isValidElement(children) &&
    // TODO: TypeScript can't check $$typeof
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    children.type.$$typeof === Symbol.for('react.lazy');

  return (
    <Tag ref={targetRef} {...props}>
      {isLazyChildren ? (
        <Suspense fallback={InvisibleComponent}>
          {isVisible ? children : InvisibleComponent}
        </Suspense>
      ) : isVisible ? (
        children
      ) : (
        InvisibleComponent
      )}
    </Tag>
  );
}
