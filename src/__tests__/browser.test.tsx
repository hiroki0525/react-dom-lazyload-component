import 'expect-puppeteer';

describe('Browser', () => {
  jest.setTimeout(10000);

  beforeAll(async () => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => {
      console.log(error.message);
    });
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  });

  describe('LazyLoad', () => {
    const rowsLength = 10;
    const rowHeight = 100;
    const visibleText = 'Visible';
    const invisibleText = 'Invisible';
    let lazyLoadTexts: (string | null)[] = [];
    const setLazyLoadTexts = async (selectorId: string): Promise<void> => {
      lazyLoadTexts = await page.$$eval(`${selectorId} > li`, items =>
        items.map(({ textContent }) => textContent)
      );
    };
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
    };
    const getVisibleTexts = (): typeof lazyLoadTexts =>
      lazyLoadTexts.filter(text => text === visibleText);
    const getInvisibleTexts = (): typeof lazyLoadTexts =>
      lazyLoadTexts.filter(text => text === invisibleText);

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
          await scrollList(rootId, 2);
          await setLazyLoadTexts(rootId);
        });

        it('visible item is 7', () => {
          const visibleTexts = getVisibleTexts();
          expect(visibleTexts.length).toBe(7);
        });

        it('invisible item is 3', () => {
          const invisibleTexts = getInvisibleTexts();
          expect(invisibleTexts.length).toBe(3);
        });

        describe('scroll up', () => {
          beforeAll(async () => {
            await scrollList(rootId, 1);
            await setLazyLoadTexts(rootId);
          });

          it('visible item is 7', () => {
            const visibleTexts = getVisibleTexts();
            expect(visibleTexts.length).toBe(7);
          });

          it('invisible item is 3', () => {
            const invisibleTexts = getInvisibleTexts();
            expect(invisibleTexts.length).toBe(3);
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
          await scrollList(rootId, 2);
          await setLazyLoadTexts(rootId);
        });

        it('visible item is 5', () => {
          const visibleTexts = getVisibleTexts();
          expect(visibleTexts.length).toBe(5);
        });

        it('invisible item is 5', () => {
          const invisibleTexts = getInvisibleTexts();
          expect(invisibleTexts.length).toBe(5);
        });

        describe('scroll up', () => {
          beforeAll(async () => {
            await scrollList(rootId, 1);
            await setLazyLoadTexts(rootId);
          });

          it('visible item is 5', () => {
            const visibleTexts = getVisibleTexts();
            expect(visibleTexts.length).toBe(5);
          });

          it('invisible item is 5', () => {
            const invisibleTexts = getInvisibleTexts();
            expect(invisibleTexts.length).toBe(5);
          });
        });
      });
    });
  });
});
