# react-dom-lazyload-component

[![npm version](https://badge.fury.io/js/react-dom-lazyload-component.svg)](https://badge.fury.io/js/react-dom-lazyload-component)

Lazyload your Components, Images or anything else. You can improve performance score lik Core Web Vitals.

## Features

- ⚡️ Optimized performance: Reuses Intersection Observer instances where possible
- 💥 Minimum bundle: Around ~1kB
- 🛠 TypeScript: It'll fit right into your existing TypeScript project
- 💡 Easy to understand: You don't have to know about complex Intersection Observer API
- 😽 React 18: Optimized using `Suspense` and `startTransition`

## Install

```
npm i react-dom-lazyload-component
yarn add react-dom-lazyload-component
pnpm add react-dom-lazyload-component
```

## Usage

```jsx
import { lazy } from 'react';
import LazyLoad, { useLazyLoad } from 'react-dom-lazyload-component';
import { Header, Main, Loading } from './MyComponents';

const Footer = React.lazy(() => import('./Footer'))

const App = () => (
    <>
        <Header />
        <Main />
        {/* Footer don't needed to be rendered first. */}
        {/* In this case, it will have been rendered in browser viewport. */}
        {/* This will optimize Core Web Vitals */}
        <LazyLoad
          as='footer'
          fallback={<Loading />}
          suspense
        >
          <Footer />
        </LazyLoad>
    </>
)

// You can also use hooks.
const App = () => {
    const { ref, isVisible } = useLazyLoad();

    return (
        <>
            <Header />
            <Main />
            <footer ref={ref}>{isVisible ? 'footer' : <Loading />}</footer>
        </>
    )
}
```

### Props

#### useLazyLoad

| Name         | Required | Type                           | Default    | Description                                                                                                                                                                                                                                                                                         |
|--------------|----------|--------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| rootId       | No       | string                         | -          | The id of element which is `IntersectionObserver`'s target. If `rootId` is not specified, then the bounds of the actual document viewport are used. This prop wraps [IntersectionObserver.root](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root) because of performance. |
| direction    | No       | 'vertical' &#124; 'horizontal' | 'vertical' | Direction which user will scroll.                                                                                                                                                                                                                                                                   |
| margin       | No       | string                         | '0px'      | Margin around the root element. For examples, if `direction` is `vertical` and `margin` is `200px`, [IntersectionObserver.thresholds](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds) is `200px 0px`.                                                             |
| forceVisible | No       | boolean                        | false      | You can forces the component to display regardless of whether the element is visible in the viewport.                                                                                                                                                                                               |
| once         | No       | boolean                        | true       | You can control whether the element in the viewport is shown at once or not.                                                                                                                                                                                                                        |

The return value is `ref` and `isVisible`.
You can use `ref` to attach to the element you want to observe, and `isVisible` to determine if the element is visible in the viewport.

#### LazyLoad

You can specify the following props in addition to the `useLazyLoad` props.

| Name         | Required | Type                           | Default    | Description                                                                                                                                                                                                                                                                                         |
|--------------|----------|--------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| children     | Yes      | ReactNode                      | -          | Component is rendered when it is in the viewport. Automatically enable `React.Suspense` if you use `React.lazy` .                                                                                                                                                                                   |
| fallback     | No       | ReactNode                      | -          | Component is rendered when it is not in the viewport.                                                                                                                                                                                                                                               |
| as           | No       | string                         | div        | You can specify tag name to `LazyLoad` component.                                                                                                                                                                                                                                                   |
| suspense     | No       | boolean                        | false      | You can use `React.Suspense` .                                                                                                                                                                                                                                                                      |
| onVisible    | No       | () => void                     | -          | Callback function called when the component has been visible.                                                                                                                                                                                                                                       |

`LazyLoad` also can be received props like `className`, `style` and `id`.

## Browser Support

Please see [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#browser_compatibility).

## Demo
https://hiroki0525.github.io/react-dom-lazyload-component/