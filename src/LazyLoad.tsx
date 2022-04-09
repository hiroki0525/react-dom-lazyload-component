import { useEffect, useRef, useState, ElementType } from 'react';

export type LazyLoadProps = {
  render: (isVisible: boolean) => JSX.Element | null;
  as?: ElementType;
  forceVisible?: boolean;
  rootId?: string;
  // eslint-disable-next-line
  [x: string]: any;
} & Omit<IntersectionObserverInit, 'root'>;

export default function LazyLoad({
  render,
  forceVisible = false,
  rootId,
  rootMargin,
  threshold,
  as: Tag = 'div',
  ...props
}: Readonly<LazyLoadProps>): ReturnType<typeof render> {
  const [isVisible, setIsVisible] = useState(forceVisible);
  const show = () => setIsVisible(true);
  const rootRef = useRef<HTMLElement>();
  const targetRef = useRef<HTMLElement>();

  useEffect(() => {
    if (rootId) {
      const rootElement = document.getElementById(rootId);
      if (rootElement) {
        rootRef.current = rootElement;
      }
    }
  }, [rootId]);

  useEffect(() => {
    setIsVisible(forceVisible);
  }, [forceVisible]);

  useEffect(() => {
    const el = targetRef.current;
    if (el) {
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
          show();
          observer.disconnect();
        }
      };
      const observer = new IntersectionObserver(
        checkInViewportAndShow,
        options
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    }
  }, [targetRef, rootRef]);

  return (
    <Tag ref={targetRef} {...props}>
      {render(isVisible)}
    </Tag>
  );
}
