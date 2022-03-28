import { ReactNode, useEffect, useRef, useState } from 'react';

export type LazyLoadProps = {
  readonly render: (isVisible: boolean) => ReactNode;
  readonly forceVisible: boolean;
  readonly visibleCallback?: Function;
} & IntersectionObserverInit;

export default function LazyLoad({
  render,
  forceVisible = false,
  root,
  rootMargin,
  threshold,
}: LazyLoadProps): ReactNode {
  const [isVisible, setIsVisible] = useState(forceVisible);
  const show = () => setIsVisible(true);
  const ref = useRef();

  useEffect(() => {
    setIsVisible(forceVisible);
  }, [forceVisible]);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const options = {
        root,
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
  }, [ref.current]);

  return render(isVisible);
}
