/* eslint-disable react/no-danger */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

const url = 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&per_page=100';
const quoteDefault = {
  id: 2177,
  content: {
    rendered:
        '<p>Minimalism is not a lack of something. It’s simply the perfect amount of something.</p>',
  },
  link: 'https://quotesondesign.com/nicholas-burroughs-3/',
  title: {
    rendered: 'Nicholas Burroughs',
  },
};
const sessionStorageValue = JSON.parse(sessionStorage.getItem('quotes'));

const Quotes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useState(quoteDefault);

  const getRandomBackgroundColor = () => {
    const colors = [
      /* "orange", */ 'green',
      /*  "mint", */ /* "blue",  */ 'purple',
      'yellow',
      'black',
      'white',
    ];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.setAttribute('data-theme', bgColor);
  };

  const fontAdjust = () => {
    const quoteWordLength = quotes.content.rendered.split(' ').length;
    const longQuote = quoteWordLength > 80; // over 400 chars.. rough estimate

    if (longQuote) {
      document
        .querySelectorAll('.quotes__content p')
        .forEach((el) => el.setAttribute('style', 'font-size: 3.2vmin; line-height: 3.7vmin;'));
    }
  };

  const getNewQuote = () => {
    getRandomBackgroundColor();

    const keys = Object.keys(sessionStorageValue);
    const randomIndex = keys[Math.floor(Math.random() * keys.length)];
    const item = sessionStorageValue[randomIndex];

    setQuotes(item);
    setIsLoading(false);
    fontAdjust();
  };

  const fetchQuotes = () => {
    const quoteObject = fetch(url)
      .then((response) => response.json());

    sessionStorage.setItem('quotes', JSON.stringify(quoteObject));
  };

  useEffect(() => {
    getRandomBackgroundColor();

    if (!sessionStorage.getItem('quotes')) {
      fetchQuotes();
    }

    getNewQuote();
  }, []);

  return (
    <>
      <div className="quotes">
        {isLoading ? (
          <span className="quotes__content">
            <p>Please hold..</p>
          </span>
        ) : (
          <>
            <span
              className="quotes__content"
              dangerouslySetInnerHTML={{ __html: quotes.content.rendered }}
            />
            <p
              className="quotes__title"
              dangerouslySetInnerHTML={{ __html: quotes.title.rendered }}
            />
          </>
        )}
      </div>
      <div className="footer">
        <div className="footer__content">
          <a
            title="Frank Richard Semakula Github"
            href="https://github.com/soirs/quotes-on-design"
            className="footer__item"
          >
            Github Repo
          </a>
          <a
            title="Frank Richard Semakula Portfolio"
            href="https://frankrs.dk"
            className="footer__item footer__item--frs"
          >
            frs
          </a>
          <button
            title="Fetch new quote"
            id="button-fetch"
            className="footer__button--fetch"
            onClick={() => getNewQuote()}
            type="button"
          >
            New Quote
          </button>
        </div>
      </div>
    </>
  );
};

export default Quotes;
