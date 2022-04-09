# react-dom-lazyload-component

[![npm version](https://badge.fury.io/js/react-dom-lazyload-component.svg)](https://badge.fury.io/js/react-dom-lazyload-component)

## Note

Version 0.X.X is experimental, but you can use this library.

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
import { Header, Main, Footer, Loading } from './MyComponents';

const App = () => (
    <>
        <Header />
        <Main />
        {/* Footer is not needed to be rendered first. */}
        {/* This will optimize Core Web Vitals */}
        <LazyLoad
          as='footer'
          render={(isVisible) => isVisible ? <Footer /> : <Loading />}
          rootMargin: '200px 0px'
        />
    </>
)

ReactDOM.render(<App />, document.body);
```

### Props

#### LazyLoad

| Name           | Required | Type                              | Default | Description                                                                                                                                                                                                                                                                          |
|----------------|----------|-----------------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| render         | Yes      | (isVisible: boolean) => ReactNode | -       | `isVisible` is whether the component is in the viewport or not.                                                                                                                                                                                                                      |
| rootId | No       | string                            | -       | The id of element which is `IntersectionObserver`'s target. If `rootId` is not specified, then the bounds of the actual document viewport are used. This prop wraps [IntersectionObserver.root](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root). |
| rootMargin     | No       | string                            | -       | Please see [IntersectionObserver.rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin).                                                                                                                                                      |
| threshold      | No       | number &#124; number[]            | -       | Please see [IntersectionObserver.thresholds](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds).                                                                                                                                                      |
| forceVisible   | No       | boolean                           | false   | You can forces the component to display regardless of whether the element is visible in the viewport.                                                                                                                                                                                |
| as             | No       | string                            | -       | You can specify tag name to `LazyLoad` component.                                                                                                                                                                                                                                    |

`LazyLoad` also can be received props like `className`, `style` and `id`.

## Browser Support

Please see [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#browser_compatibility).

## Demo
https://hiroki0525.github.io/react-dom-lazyload-component/