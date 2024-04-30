/**
 * @jest-environment jsdom
 */

import { cleanup, render } from '@testing-library/react';
import LazyLoad, { LazyLoadParams, LazyLoadProps, useLazyLoad } from '../index';

describe('index', () => {
  const observe = jest.fn();
  const disconnect = jest.fn();
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe,
    disconnect,
  }));
  const visibleText = 'visible';
  const invisibleText = 'invisible';

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('useLazyLoad', () => {
    const TestComponent = (params?: LazyLoadParams) => {
      const { ref, isVisible } = useLazyLoad(params);
      return (
        <>
          {isVisible && <p>{visibleText}</p>}
          <button ref={ref}>Button</button>
        </>
      );
    };

    describe('render', () => {
      describe('without params', () => {
        it('called IntersectionObserver', () => {
          render(<TestComponent />);
          expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
        });

        it('invisible', () => {
          const { queryByText } = render(<TestComponent />);
          expect(queryByText(visibleText)).toBeNull();
        });
      });

      describe('with params', () => {
        describe('forceVisible is true', () => {
          it('visible', () => {
            const { getByText } = render(<TestComponent forceVisible />);
            expect(getByText(visibleText)).toBeDefined();
          });
        });
      });
    });

    describe('unmount', () => {
      it('called IntersectionObserver.disconnect ', () => {
        const { unmount } = render(<TestComponent />);
        unmount();
        expect(disconnect).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('LazyLoad', () => {
    type ExcludeChildrenLazyLoadProps = Omit<
      LazyLoadProps<'button'>,
      'children'
    >;

    const defaultProps: ExcludeChildrenLazyLoadProps = {
      fallback: invisibleText,
    };

    describe('render', () => {
      describe('without props', () => {
        it('invisible', () => {
          const { getByText } = render(
            <LazyLoad {...defaultProps}>{visibleText}</LazyLoad>
          );
          expect(getByText(invisibleText)).toBeDefined();
        });
      });

      describe('with props', () => {
        describe('as is button', () => {
          it('render button', () => {
            const expectedAs = 'button';
            const props: ExcludeChildrenLazyLoadProps = {
              ...defaultProps,
              as: expectedAs,
            };
            const { getByRole } = render(
              <LazyLoad {...props}>{visibleText}</LazyLoad>
            );
            const element = getByRole(expectedAs);
            expect(element.tagName.toLowerCase()).toBe(expectedAs);
          });
        });

        describe('forceVisible is true', () => {
          it('visible', () => {
            const props: ExcludeChildrenLazyLoadProps = {
              ...defaultProps,
              forceVisible: true,
            };
            const { getByText } = render(
              <LazyLoad {...props}>{visibleText}</LazyLoad>
            );
            expect(getByText(visibleText)).toBeDefined();
          });

          it('render div', () => {
            const props: ExcludeChildrenLazyLoadProps = {
              ...defaultProps,
              forceVisible: true,
            };
            const { getByText } = render(
              <LazyLoad {...props}>{visibleText}</LazyLoad>
            );
            const element = getByText(visibleText);
            expect(element.tagName.toLowerCase()).toBe('div');
          });
        });
      });
    });

    describe('rerender', () => {
      const mockOnVisible = jest.fn();

      describe('forceVisible is true', () => {
        it('called onVisible', () => {
          const propsWithoutForceVisible: ExcludeChildrenLazyLoadProps = {
            ...defaultProps,
            onVisible: mockOnVisible,
          };
          const { rerender } = render(
            <LazyLoad {...propsWithoutForceVisible}>{visibleText}</LazyLoad>
          );
          expect(mockOnVisible).toHaveBeenCalledTimes(0);
          const propsWithForceVisible: ExcludeChildrenLazyLoadProps = {
            ...defaultProps,
            onVisible: mockOnVisible,
            forceVisible: true,
          };
          rerender(
            <LazyLoad {...propsWithForceVisible}>{visibleText}</LazyLoad>
          );
          expect(mockOnVisible).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
