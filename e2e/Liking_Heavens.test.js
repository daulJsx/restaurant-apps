/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Heavens');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  // I.seeElement('.query'); --> menyebabkan error

  I.see('Tidak ada restaurant untuk ditampilkan', '.heaven-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.heaven-item__not__found');

  I.amOnPage('/');

  // pause();

  I.seeElement('.restaurant__name');
  const firstHeaven = locate('.restaurant__name').first();
  const firstHeavenTitle = await I.grabTextFrom(firstHeaven);
  I.click(firstHeaven);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.heaven__card');
  const likedHeavenTitle = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstHeavenTitle, likedHeavenTitle);
});

Scenario('searching restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.heaven-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name');

  const titles = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__name').at(i));

    I.seeElement('#likeButton');
    I.click('#likeButton');

    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.restaurant__name'));

    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
  I.seeElement('#query');

  const visibleLikedHeavens = await I.grabNumberOfVisibleElements('.heaven__card');
  assert.strictEqual(titles.length, visibleLikedHeavens);

  const searchQuery = titles[1].substring(1, 3);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  // mendapatkan daftar restaurant yang sesuai dengan searchQuery
  const matchingHeavens = titles.filter(
    (title) => title.indexOf(searchQuery) !== -1,
  );
  const visibleSearchedLikedHeavens = await I.grabNumberOfVisibleElements(
    '.heaven__card',
  );

  assert.strictEqual(matchingHeavens.length, visibleSearchedLikedHeavens);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < matchingHeavens.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleTitle = await I.grabTextFrom(
      locate('.restaurant__name').at(i + 1),
    );

    assert.strictEqual(matchingHeavens[i], visibleTitle);
  }
});
