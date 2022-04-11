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
  const testRender = (isVisible: boolean) =>
    isVisible ? visibleText : invisibleText;

  window.IntersectionObserver = mockIntersectionObserver;

  const rootId = 'rootId';
  const testId = 'testId';

  const defaultProps: LazyLoadProps = {
    render: testRender,
    rootId,
    'data-testid': testId,
  };

  afterEach(() => {
    cleanup();
    mockIntersectionObserver.mockClear();
  });

  describe('initial render', () => {
    it('called IntersectionObserver', () => {
      render(<LazyLoad {...defaultProps} />);
      expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
    });

    describe('default props', () => {
      it('invisible', () => {
        const { getByText } = render(<LazyLoad {...defaultProps} />);
        expect(getByText(invisibleText)).toBeDefined();
      });
    });

    describe('no default props', () => {
      describe('as is span', () => {
        it('render span', () => {
          const expectedAs = 'span';
          const props: LazyLoadProps = { ...defaultProps, as: expectedAs };
          render(<LazyLoad {...props} />);
          const element = screen.getByTestId(testId);
          expect(element.tagName.toLowerCase()).toBe(expectedAs);
        });
      });

      describe('forceVisible is true', () => {
        it('visible', () => {
          const props: LazyLoadProps = { ...defaultProps, forceVisible: true };
          const { getByText } = render(<LazyLoad {...props} />);
          expect(getByText(visibleText)).toBeDefined();
        });
      });
    });
  });

  describe('rerender', () => {
    describe('forceVisible is true', () => {
      it('visible', () => {
        const { rerender, getByText } = render(<LazyLoad {...defaultProps} />);
        expect(getByText(invisibleText)).toBeDefined();
        const props: LazyLoadProps = { ...defaultProps, forceVisible: true };
        rerender(<LazyLoad {...props} />);
        expect(getByText(visibleText)).toBeDefined();
      });
    });
  });

  describe('unmount', () => {
    it('called IntersectionObserver.disconnect ', () => {
      const { unmount } = render(<LazyLoad {...defaultProps} />);
      unmount();
      expect(disconnect).toBeCalledTimes(1);
    });
  });
});
