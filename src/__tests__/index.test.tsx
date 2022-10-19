/**
 * @jest-environment jsdom
 */

import { cleanup, screen, render } from '@testing-library/react';
import LazyLoad, { LazyLoadProps } from '../index';

describe('LazyLoad', () => {
  const observe = jest.fn();
  const disconnect = jest.fn();
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe,
    disconnect,
  });
  const visibleText = 'visible';
  const invisibleText = 'invisible';

  window.IntersectionObserver = mockIntersectionObserver;

  const rootId = 'rootId';
  const testId = 'testId';

  type ExcludeChildrenLazyLoadProps = Omit<LazyLoadProps, 'children'>;

  const defaultProps: ExcludeChildrenLazyLoadProps = {
    rootId,
    'data-testid': testId,
    fallback: invisibleText,
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('called IntersectionObserver', () => {
      render(<LazyLoad {...defaultProps}>{visibleText}</LazyLoad>);
      expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
    });

    describe('default props', () => {
      it('invisible', () => {
        const { getByText } = render(
          <LazyLoad {...defaultProps}>{visibleText}</LazyLoad>
        );
        expect(getByText(invisibleText)).toBeDefined();
      });
    });

    describe('no default props', () => {
      describe('as is span', () => {
        it('render span', () => {
          const expectedAs = 'span';
          const props: ExcludeChildrenLazyLoadProps = {
            ...defaultProps,
            as: expectedAs,
          };
          render(<LazyLoad {...props}>{visibleText}</LazyLoad>);
          const element = screen.getByTestId(testId);
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
      });

      describe('onVisible is specified', () => {
        const mockOnVisible = jest.fn();

        describe('visible', () => {
          it('onVisible will be called', () => {
            const props: ExcludeChildrenLazyLoadProps = {
              ...defaultProps,
              forceVisible: true,
              onVisible: mockOnVisible,
            };
            render(<LazyLoad {...props}>{visibleText}</LazyLoad>);
            expect(mockOnVisible).toHaveBeenCalledTimes(1);
          });
        });

        describe('invisible', () => {
          it('onVisible will not be called', () => {
            const props: ExcludeChildrenLazyLoadProps = {
              ...defaultProps,
              onVisible: mockOnVisible,
            };
            render(<LazyLoad {...props}>{visibleText}</LazyLoad>);
            expect(mockOnVisible).toHaveBeenCalledTimes(0);
          });
        });
      });
    });
  });

  describe('rerender', () => {
    describe('forceVisible is true', () => {
      it('visible', () => {
        const { rerender, getByText } = render(
          <LazyLoad {...defaultProps}>{visibleText}</LazyLoad>
        );
        expect(getByText(invisibleText)).toBeDefined();
        const props: ExcludeChildrenLazyLoadProps = {
          ...defaultProps,
          forceVisible: true,
        };
        rerender(<LazyLoad {...props}>{visibleText}</LazyLoad>);
        expect(getByText(visibleText)).toBeDefined();
      });
    });
  });

  describe('unmount', () => {
    it('called IntersectionObserver.disconnect ', () => {
      const { unmount } = render(
        <LazyLoad {...defaultProps}>{visibleText}</LazyLoad>
      );
      unmount();
      expect(disconnect).toBeCalledTimes(1);
    });
  });
});
