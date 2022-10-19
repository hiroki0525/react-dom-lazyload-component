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
