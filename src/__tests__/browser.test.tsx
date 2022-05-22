import 'expect-puppeteer';

describe('Browser', () => {
  jest.setTimeout(10000);

  beforeAll(async () => {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  });

  afterAll(async () => {
    await page.reload({ waitUntil: 'networkidle0' });
  });

  describe('LazyLoad', () => {
    const visibleText = 'Visible';
    const invisibleText = 'Invisible';
    const rowHeight = 100;

    let lazyLoadTexts: (string | null)[] = [];
    const setLazyLoadTexts = async (selectorId: string): Promise<void> => {
      await page.waitForSelector(selectorId);
      lazyLoadTexts = await page.$$eval(`${selectorId} > li`, items =>
        items.map(({ textContent }) => textContent)
      );
    };
    const getVisibleTexts = (): typeof lazyLoadTexts =>
      lazyLoadTexts.filter(text => text === visibleText);
    const getInvisibleTexts = (): typeof lazyLoadTexts =>
      lazyLoadTexts.filter(text => text === invisibleText);
    const scrollList = async (
      selectorId: string,
      itemsLength = 1
    ): Promise<void> => {
      const rootDom = await page.$(selectorId);
      await page.evaluate(
        (el, rHeight, iLength) => {
          el.scrollTop = rHeight * iLength;
        },
        rootDom,
        rowHeight,
        itemsLength
      );
      await page.waitForTimeout(500);
    };

    describe('once is true(default) or false', () => {
      const rowsLength = 10;

      describe('once is true', () => {
        const rootId = '#onceIsTrue';

        describe('initial render', () => {
          beforeAll(async () => {
            await setLazyLoadTexts(rootId);
          });

          it(`item length is ${rowsLength}`, () => {
            expect(lazyLoadTexts.length).toBe(rowsLength);
          });
        });

        describe('scroll down', () => {
          beforeAll(async () => {
            await scrollList(rootId, 2.5);
            await setLazyLoadTexts(rootId);
          });

          it('visible item is 8', () => {
            const visibleTexts = getVisibleTexts();
            expect(visibleTexts.length).toBe(8);
          });

          it('invisible item is 2', () => {
            const invisibleTexts = getInvisibleTexts();
            expect(invisibleTexts.length).toBe(2);
          });

          describe('scroll up', () => {
            beforeAll(async () => {
              await scrollList(rootId, 1.5);
              await setLazyLoadTexts(rootId);
            });

            it('visible item is 8', () => {
              const visibleTexts = getVisibleTexts();
              expect(visibleTexts.length).toBe(8);
            });

            it('invisible item is 2', () => {
              const invisibleTexts = getInvisibleTexts();
              expect(invisibleTexts.length).toBe(2);
            });
          });
        });
      });

      describe('once is false', () => {
        const rootId = '#onceIsFalse';

        describe('initial render', () => {
          beforeAll(async () => {
            await setLazyLoadTexts(rootId);
          });

          it(`item length is ${rowsLength}`, () => {
            expect(lazyLoadTexts.length).toBe(rowsLength);
          });
        });

        describe('scroll down', () => {
          beforeAll(async () => {
            await scrollList(rootId, 2.5);
            await setLazyLoadTexts(rootId);
          });

          it('visible item is 6', () => {
            const visibleTexts = getVisibleTexts();
            expect(visibleTexts.length).toBe(6);
          });

          it('invisible item is 4', () => {
            const invisibleTexts = getInvisibleTexts();
            expect(invisibleTexts.length).toBe(4);
          });

          describe('scroll up', () => {
            beforeAll(async () => {
              await scrollList(rootId, 1.5);
              await setLazyLoadTexts(rootId);
            });

            it('visible item is 6', () => {
              const visibleTexts = getVisibleTexts();
              expect(visibleTexts.length).toBe(6);
            });

            it('invisible item is 4', () => {
              const invisibleTexts = getInvisibleTexts();
              expect(invisibleTexts.length).toBe(4);
            });
          });
        });
      });
    });

    describe('forceVisible', () => {
      const forceVisibleId = '#forceVisible';
      const timeout = 5000;

      describe('initial render', () => {
        beforeAll(async () => {
          await setLazyLoadTexts(forceVisibleId);
        });

        it('invisible', () => {
          const invisibleTexts = getInvisibleTexts();
          expect(invisibleTexts.length).toBe(5);
        });
      });

      describe(`after about ${timeout} ms`, () => {
        beforeAll(async () => {
          await page.waitForTimeout(timeout);
          await setLazyLoadTexts(forceVisibleId);
        });

        it('visible', () => {
          const visibleTexts = getVisibleTexts();
          expect(visibleTexts.length).toBe(5);
        });
      });
    });

    describe('Suspense', () => {
      const suspenseId = '#suspense';
      const suspenseExampleComponentName = 'SuspenseExample';
      let suspenseInnerText = '';
      let codeSplittedRequestUrl: string | null = null;

      const setSuspenseInnerText = async (): Promise<void> => {
        suspenseInnerText =
          (await page.$eval(suspenseId, ({ textContent }) => textContent)) ??
          '';
      };

      beforeAll(async () => {
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
          if (interceptedRequest.isInterceptResolutionHandled()) return;
          const requestUrl = interceptedRequest.url();
          if (requestUrl.indexOf(suspenseExampleComponentName) > -1) {
            codeSplittedRequestUrl = requestUrl;
          }
          interceptedRequest.continue();
        });
        await page.reload({ waitUntil: 'networkidle0' });
        await page.waitForSelector(suspenseId);
      });

      describe('initial render', () => {
        beforeAll(async () => {
          await setSuspenseInnerText();
        });

        it(`text is ${invisibleText}`, () => {
          expect(suspenseInnerText).toBe(invisibleText);
        });

        it('not called to request code splitted file', () => {
          expect(codeSplittedRequestUrl).toBeNull();
        });
      });

      describe('scroll', () => {
        beforeAll(async () => {
          await page.evaluate(() => {
            window.scrollTo(0, window.innerHeight);
          });
          await page.waitForTimeout(2000);
          await setSuspenseInnerText();
        });

        it(`text is ${visibleText}`, () => {
          expect(suspenseInnerText).toBe(visibleText);
        });

        it('not called to request code splitted file', () => {
          expect(codeSplittedRequestUrl).not.toBeNull();
        });
      });
    });

    describe('autoCalculateHeight is true', () => {
      const autoCalculateHeightId = '#autoCalculateHeight';
      let rowTextHeights: [string, string][] = [];
      const setRowTextHeights = async (): Promise<void> => {
        rowTextHeights = await page.$$eval(
          `${autoCalculateHeightId} > li`,
          items =>
            items.reduce<[string, string][]>((results, item) => {
              results.push([
                item.textContent ?? '',
                window.getComputedStyle(item).getPropertyValue('height'),
              ]);
              return results;
            }, [])
        );
      };
      const getVisibleHeights = (): typeof rowTextHeights =>
        rowTextHeights.filter(
          rowTextHeight =>
            rowTextHeight[0] === visibleText &&
            rowTextHeight[1] === `${rowHeight}px`
        );
      const getInvisibleHeights = (): typeof rowTextHeights =>
        rowTextHeights.filter(
          rowTextHeight =>
            rowTextHeight[0] === invisibleText &&
            rowTextHeight[1] === `${rowHeight}px`
        );

      describe('initial render', () => {
        beforeAll(async () => {
          await setRowTextHeights();
        });

        it('visible row height is 100px', () => {
          expect(getVisibleHeights().length).toBe(5);
        });

        it('invisible row height is 100px', () => {
          expect(getInvisibleHeights().length).toBe(5);
        });

        describe('scroll', () => {
          beforeAll(async () => {
            await scrollList(autoCalculateHeightId, 0.5);
            await setRowTextHeights();
          });

          it('visible row height is 100px', () => {
            expect(getVisibleHeights().length).toBe(6);
          });

          it('invisible row height is 100px', () => {
            expect(getInvisibleHeights().length).toBe(4);
          });
        });
      });
    });
  });
});
