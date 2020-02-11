/* eslint-disable react/no-danger */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React, { Component } from "react";

let randomFont;

class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fontSize: "4vmin",
      quote: [
        {
          id: 2177,
          content: {
            rendered:
              "<p>Minimalism is not a lack of something. It’s simply the perfect amount of something.</p>"
          },
          link: "https://quotesondesign.com/nicholas-burroughs-3/",
          title: {
            rendered: "Nicholas Burroughs"
          }
        }
      ],
      quotes: {}
    };
  }

  async componentDidMount() {
    this.getRandomBackgroundColor();
    this.getRandomQuoteFont();

    // if first session visit & sessionstorage empty
    if (!sessionStorage.getItem("quotes")) {
      await this.fetchQuotes().then(data =>
        console.log("data fetched :", data)
      );
    }
    const sessionStorageValue = JSON.parse(sessionStorage.getItem("quotes"));

    await this.setState(
      {
        quotes: sessionStorageValue
      },
      () => {
        const { quotes } = this.state;
        this.getNewQuote(quotes);
      }
    );
    // https://stackoverflow.com/questions/56024398/disable-double-tap-zoom-resize-on-safari-ios12/56393464#56393464
    document
      .getElementById("button-fetch")
      .addEventListener("click", event => {});
    document.addEventListener(
      "touchstart",
      event => {
        if (event.touches.length > 1) {
          console.log("zoom plz stahp");
          event.preventDefault();
          event.stopPropagation(); // maybe useless
        }
      },
      { passive: false }
    );
  }

  getRandomBackgroundColor = () => {
    const colors = [
      /* "orange", */ "green",
      /*  "mint", */ /* "blue",  */ "purple",
      "yellow",
      "black",
      "white"
    ];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.setAttribute("data-theme", bgColor);
  };

  //  stylistic to give the author a human touch
  //  not activated
  getRandomQuoteFont = () => {
    const fonts = [
      "adobe-handwriting-ernie",
      "adobe-handwriting-frank",
      "adobe-handwriting-tiffany"
    ];

    randomFont = fonts[Math.floor(Math.random() * fonts.length)];
  };

  getNewQuote = () => {
    this.getRandomBackgroundColor();
    this.getRandomQuoteFont();

    const { quotes, isLoading } = this.state;
    const keys = Object.keys(quotes);
    const randomIndex = keys[Math.floor(Math.random() * keys.length)];
    const item = quotes[randomIndex];
    this.setState({ quote: item, isLoading: false }, () => {
      const { isLoading } = this.state;
      isLoading ? null : this.fontAdjust();
    });

    return item;
  };

  async fetchQuotes() {
    const url =
      "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&per_page=100";
    const response = await fetch(url);
    const data = await response.json();

    sessionStorage.setItem("quotes", JSON.stringify(data));
    return data;
  }

  fontAdjust = value => {
    const { quote } = this.state;

    const quoteWordLength = quote.content.rendered.split(" ").length;
    const longQuote = quoteWordLength > 80; // over 400 chars.. rough estimate

    if (longQuote) {
      const quoteStyle = document
        .querySelectorAll(".quotes__content p")
        .forEach(el =>
          el.setAttribute("style", "font-size: 3.2vmin; line-height: 1.8rem;")
        );
      quoteStyle;
    }
  };

  render() {
    const { quote, quotes, isLoading } = this.state;
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
                dangerouslySetInnerHTML={{ __html: quote.content.rendered }}
              />
              <p
                className="quotes__title"
                dangerouslySetInnerHTML={{ __html: quote.title.rendered }}
              />
              {/*               <p
                className="quotes__title"
                dangerouslySetInnerHTML={{
                  __html: quote.content.rendered.split(' ').length,
                }} />
              */}

              {/* 
                stylistic to give the author a human touch
                 style={{ fontFamily: randomFont }} */}
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
              onClick={() => this.getNewQuote()}
              type="button"
            >
              New Quote
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Quotes;
