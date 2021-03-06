# react-dom-lazyload-component

[![npm version](https://badge.fury.io/js/react-dom-lazyload-component.svg)](https://badge.fury.io/js/react-dom-lazyload-component)

## Install

```
npm i react-dom-lazyload-component
```

or

```
yarn add react-dom-lazyload-component
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-dom-lazyload-component';
import { Header, Main, Loading } from './MyComponents';

const Footer = React.lazy(() => import('./MyComponents'))

const App = () => (
    <>
        <Header />
        <Main />
        {/* Footer is not needed to be rendered first. */}
        {/* This will optimize Core Web Vitals */}
        <LazyLoad
          as='footer'
          InvisibleComponent={<Loading />}
          rootMargin='200px 0px'
        >
          <Footer />
        </LazyLoad>
    </>
)

ReactDOM.render(<App />, document.body);
```

### Props

#### LazyLoad

| Name                | Required | Type                   | Default | Description                                                                                                                                                                                                                                                                                         |
|---------------------|----------|------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| children            | Yes      | ReactNode              | -       | Component is rendered when it is in the viewport. Automatically enable `React.Suspense` if you use `React.lazy` .                                                                                                                                                                                   |
| InvisibleComponent  | No       | ReactNode              | null    | Component is rendered when it is not in the viewport.                                                                                                                                                                                                                                               |
| rootId              | No       | string                 | -       | The id of element which is `IntersectionObserver`'s target. If `rootId` is not specified, then the bounds of the actual document viewport are used. This prop wraps [IntersectionObserver.root](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root) because of performance. |
| rootMargin          | No       | string                 | -       | Please see [IntersectionObserver.rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin).                                                                                                                                                                     |
| threshold           | No       | number &#124; number[] | -       | Please see [IntersectionObserver.thresholds](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds).                                                                                                                                                                     |
| forceVisible        | No       | boolean                | false   | You can forces the component to display regardless of whether the element is visible in the viewport.                                                                                                                                                                                               |
| once                | No       | boolean                | true    | You can control whether the element in the viewport is shown at once or not.                                                                                                                                                                                                                        |
| autoCalculateHeight | No       | boolean                | false   | Automatically calculate the Component height and add style attribute to DOM when it is not in the viewport. See [below](#autoCalculateHeight) for more detail.                                                                                                                                      |
| onVisible           | No       | () => void             | -       | Callback function called when the component has been visible.                                                                                                                                                                                                                                       |
| as                  | No       | string                 | div     | You can specify tag name to `LazyLoad` component.                                                                                                                                                                                                                                                   |

`LazyLoad` also can be received props like `className`, `style` and `id`.

### autoCalculateHeight

If `autoCalculateHeight` is true, `LazyLoad` automatically calculate your Component height and add style attribute to DOM when your Component is not visible.
This will be good impact on Cumulative Layout Shift(CLS).
In the following cases, `autoCalculateHeight` should be false.

* You know your Component height in advance.
This is better in terms of performance.
* Your Component has side effects like fetching.
`LazyLoad` measures height rendering your Component, so it may cause unexpected side effects.

## Browser Support

Please see [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#browser_compatibility).

## Demo
https://hiroki0525.github.io/react-dom-lazyload-component/