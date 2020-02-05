/* eslint-disable react/no-danger */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React, { Component } from "react";
import { GitHub, Minus, Plus, RefreshCw } from "react-feather";
import FontSizeChanger from "react-font-size-changer";

let randomFont;

class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      quote: [
        {
          id: 2177,
          content: {
            rendered:
              "<p>Minimalism is not a lack of something. It’s simply the perfect amount of something.</p>"
          },
          link: "https://quotesondesign.com/nicholas-burroughs-3/",
          title: { rendered: "Nicholas Burroughs" }
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
  }

  getRandomBackgroundColor = () => {
    const colors = ["red", "green", "mint", "blue", "purple"];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.setAttribute("data-theme", bgColor);
  };

  getRandomQuoteFont = () => {
    const fonts = [
      "adobe-handwriting-ernie",
      "adobe-handwriting-frank",
      "adobe-handwriting-tiffany"
    ];

    randomFont = fonts[Math.floor(Math.random() * fonts.length)];
  };

  getNewQuote = prop => {
    this.getRandomBackgroundColor();
    this.getRandomQuoteFont();

    const { quotes } = this.state;
    const keys = Object.keys(quotes);
    const randomIndex = keys[Math.floor(Math.random() * keys.length)];
    const item = quotes[randomIndex];
    this.setState({ quote: item, isLoading: false });
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

  render() {
    const { quote, isLoading } = this.state;
    const { content, title } = quote;
    // const { rendered: quoteText } = content;
    // const { rendered: quoteAuthor } = title;
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
              {/* 
                stylistic to give the author a human touch
                 style={{ fontFamily: randomFont }} */}
            </>
          )}
        </div>
        <div className="footer">
          <div className="footer__content">
            <div className="footer__list">
              <a
                href="https://github.com/soirs/quotes-on-design"
                className="footer__item"
              >
                <GitHub size="30" />
              </a>
            </div>
            <FontSizeChanger
              className="footer__button--fetch"
              targets={[".quotes__content p"]}
              options={{
                stepSize: 5,
                range: 25
              }}
              customButtons={{
                up: <Plus size="30" />,
                down: <Minus size="30" />,
                style: {
                  cursor: "pointer",
                  // backgroundColor: "red",
                  // color: "white",
                  // WebkitBoxSizing: "border-box",
                  // WebkitBorderRadius: "5px",
                  height: "30px",
                  width: "30px",
                  border: "none"
                },
                buttonsMargin: 20
              }}
            />

            <button
              className="footer__button--fetch"
              onClick={() => this.getNewQuote()}
              type="button"
            >
              <RefreshCw size="30" />
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Quotes;
