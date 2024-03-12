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

  type ExcludeChildrenLazyLoadProps = Omit<LazyLoadProps<'button'>, 'children'>;

  const defaultProps: ExcludeChildrenLazyLoadProps = {
    rootId,
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
      describe('as is button', () => {
        it('render button', () => {
          const expectedAs = 'button';
          const props: ExcludeChildrenLazyLoadProps = {
            ...defaultProps,
            as: expectedAs,
          };
          render(<LazyLoad {...props}>{visibleText}</LazyLoad>);
          const element = screen.getByRole(expectedAs);
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
    });
  });

  describe('rerender', () => {
    const mockOnVisible = jest.fn();

    describe('forceVisible is true', () => {
      it('visible', () => {
        const baseProps = { ...defaultProps, onVisible: mockOnVisible };
        const { rerender, getByText } = render(
          <LazyLoad {...baseProps}>{visibleText}</LazyLoad>
        );
        expect(getByText(invisibleText)).toBeDefined();
        expect(mockOnVisible).toHaveBeenCalledTimes(0);
        const props: ExcludeChildrenLazyLoadProps = {
          ...baseProps,
          forceVisible: true,
        };
        rerender(<LazyLoad {...props}>{visibleText}</LazyLoad>);
        expect(getByText(visibleText)).toBeDefined();
        expect(mockOnVisible).toHaveBeenCalledTimes(1);
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
