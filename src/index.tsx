import { useEffect, useRef, useState, ElementType, ReactNode } from 'react';

export type LazyLoadProps = {
  render: (isVisible: boolean) => ReactNode;
  as?: ElementType;
  forceVisible?: boolean;
  rootId?: string;
  once?: boolean;
  // eslint-disable-next-line
  [x: string]: any;
} & Omit<IntersectionObserverInit, 'root'>;

export default function LazyLoad({
  render,
  forceVisible = false,
  rootId,
  rootMargin,
  threshold,
  once = true,
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

  return (
    <Tag ref={targetRef} {...props}>
      {render(isVisible)}
    </Tag>
  );
}
