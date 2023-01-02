## [4.1.4](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v4.1.3...v4.1.4) (2023-01-02)


### Bug Fixes

* enable to import `LazyLoadProps` ([2237822](https://github.com/hiroki0525/react-dom-lazyload-component/commit/2237822c5089d85b942a8480f203d58f752d9e9a))

## [4.1.3](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v4.1.2...v4.1.3) (2023-01-02)


### Bug Fixes

* remove multiple index.d.ts ([bf9178b](https://github.com/hiroki0525/react-dom-lazyload-component/commit/bf9178bbed9b238e9ea3a9b5195f77fadcad6675))

## [4.1.2](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v4.1.1...v4.1.2) (2023-01-02)


### Bug Fixes

* enable to import `LazyLoadProps` ([7c0a016](https://github.com/hiroki0525/react-dom-lazyload-component/commit/7c0a0160280cf2b69932fdc1cccc7de105650052))

## [4.1.1](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v4.1.0...v4.1.1) (2023-01-02)


### Bug Fixes

* add index.d.ts.map ([29de8d1](https://github.com/hiroki0525/react-dom-lazyload-component/commit/29de8d1d8e1dee90e8ce41fe27a15de5bfe15c45))

# [4.1.0](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v4.0.0...v4.1.0) (2023-01-02)


### Features

* support not only cjs but also esm and umd ([1fbe49c](https://github.com/hiroki0525/react-dom-lazyload-component/commit/1fbe49c050d24f22a52185898ac4de0df33818e1))
* transpile ES2017 ([0ea69ea](https://github.com/hiroki0525/react-dom-lazyload-component/commit/0ea69ea5e3ea2d8f0594731d5559f2eda4eb5b84))


### Performance Improvements

* add.minify ([#100](https://github.com/hiroki0525/react-dom-lazyload-component/issues/100)) ([402347b](https://github.com/hiroki0525/react-dom-lazyload-component/commit/402347bc3bf1f1e19701d462ddd0bd762a49d93d))

# [4.0.0](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v3.0.1...v4.0.0) (2022-10-19)


### Code Refactoring

* remove threshold ([a5e3eba](https://github.com/hiroki0525/react-dom-lazyload-component/commit/a5e3ebaa0d042f13031860a6a019b5d2be9a15ab))
* rename `InvisibleComponent` to `fallback` ([0b25cfe](https://github.com/hiroki0525/react-dom-lazyload-component/commit/0b25cfeeeb290560673f44abb3cc3091a031da9b))


### Features

* add suspense prop ([19fc57c](https://github.com/hiroki0525/react-dom-lazyload-component/commit/19fc57cefe018bfc0921ebc7ce13d848701edadc))
* change props to make easy to use IntersectionObserver ([851ac6d](https://github.com/hiroki0525/react-dom-lazyload-component/commit/851ac6d2c9b579d362220ddddc83353f217daf13))


### Performance Improvements

* cache IntersectionObserver ([2cd4473](https://github.com/hiroki0525/react-dom-lazyload-component/commit/2cd447317144a0c9b9fa6ac8060abd5c7d092158))


### BREAKING CHANGES

* Please use `direction` and `margin` props instead of `rootMargin` .
* remove `threshold` props. `threshold` is always `0` .
* You should rename `InvisibleComponent` to `fallback` .
* no longer automatically add Suspense. you should add `suspense` if you need it.

## [3.0.1](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v3.0.0...v3.0.1) (2022-10-19)


### Performance Improvements

* remove autoCalculateHeight props ([3b3b2ac](https://github.com/hiroki0525/react-dom-lazyload-component/commit/3b3b2ac8d1929cfa31c6bdca1a2a80273d4bdff6))
* remove forceVisible effect ([c88fb1b](https://github.com/hiroki0525/react-dom-lazyload-component/commit/c88fb1bb4c0f9ba0cf4fa0f331705b4a880f5098))

# [3.0.0](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v2.3.0...v3.0.0) (2022-05-25)


### Performance Improvements

* add transition ([7e1d8ca](https://github.com/hiroki0525/react-dom-lazyload-component/commit/7e1d8ca02d9110108af87367d4f89ae583dd7b42))


### BREAKING CHANGES

* `LazyLoad` internally use `startTransition`. It is necessary to install React v18.

# [2.3.0](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v2.2.0...v2.3.0) (2022-05-22)


### Features

* add autoCalculateHeight ([891589b](https://github.com/hiroki0525/react-dom-lazyload-component/commit/891589bab7010f65a1276b4af21dff57902c5d7a))

# [2.2.0](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v2.1.0...v2.2.0) (2022-05-10)


### Features

* add onVisible prop ([de2abdf](https://github.com/hiroki0525/react-dom-lazyload-component/commit/de2abdfa809ae3cbbd8b27c71a6d41bc2dbc90dd)), closes [#33](https://github.com/hiroki0525/react-dom-lazyload-component/issues/33)

# [2.1.0](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v2.0.0...v2.1.0) (2022-05-05)


### Features

* automatically enable React.Suspense ([92ee132](https://github.com/hiroki0525/react-dom-lazyload-component/commit/92ee13261f356170ddebc02dab6471d11d8bc670))

# [2.0.0](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v1.0.1...v2.0.0) (2022-05-04)


* Merge pull request #28 from hiroki0525/feature-add-suspense ([bf315ad](https://github.com/hiroki0525/react-dom-lazyload-component/commit/bf315ad7a86470ced0ca6c5eacb7ddfdbe34ac98)), closes [#28](https://github.com/hiroki0525/react-dom-lazyload-component/issues/28)


### Performance Improvements

* remove render prop ([42c956c](https://github.com/hiroki0525/react-dom-lazyload-component/commit/42c956c8145b1c780c75a7986ec3f1433a1a0c35))


### BREAKING CHANGES

* Remove render prop and Add InvisibleComponent and children props
* `render` prop has been removed because of feature release like #25 .
Please use `InvisibleComponent` and `children` props instead of 'render' .

## [1.0.1](https://github.com/hiroki0525/react-dom-lazyload-component/compare/v1.0.0...v1.0.1) (2022-04-20)


### Bug Fixes

* remove console.log ([546537f](https://github.com/hiroki0525/react-dom-lazyload-component/commit/546537f432395a18c6ffbcfd4b8cf07c5ad7e93a))
* script and project dependencies ([e807969](https://github.com/hiroki0525/react-dom-lazyload-component/commit/e8079698d0f0f81037080c0e50bc6b247f29c641))
