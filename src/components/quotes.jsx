/* eslint-disable react/no-danger */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React, { Component } from "react";
import { GitHub, Link, RefreshCw } from "react-feather";

const socialLinks = [
  {
    icon: "github",
    name: "Github",
    url: "https://github.com/soirs",
  },
  {
    icon: "link",
    name: "Portfolio",
    url: "https://frankrs.dk?ref=quote",
  },
];
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
              "<p>Minimalism is not a lack of something. It’s simply the perfect amount of something.</p>",
          },
          link: "https://quotesondesign.com/nicholas-burroughs-3/",
          title: { rendered: "Nicholas Burroughs" },
        },
      ],
      quotes: {},
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
        quotes: sessionStorageValue,
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
      "adobe-handwriting-tiffany",
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
    const url = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand";
    const response = await fetch(url);
    const data = await response.json();

    sessionStorage.setItem("quotes", JSON.stringify(data));
    return data;
  }

  render() {
    const { quote, isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <p>Please hold..</p>
        ) : (
          <div className="quotes">
            <p
              className="quotes__content"
              dangerouslySetInnerHTML={{ __html: quote.content.rendered }}
            />
            <p
              className="quotes__title"
              //  style={{ fontFamily: randomFont }}
            >
              &{quote.title.rendered}
            </p>
          </div>
        )}
        <footer className="footer">
          <div className="footer__icons">
            {socialLinks.map(social => {
              const { icon, name, url } = social;
              return (
                <a href={url} className="footer__icons--icon">
                  {icon === "github" ? <GitHub /> : <Link />}
                  {name}
                </a>
              );
            })}
          </div>
          <button
            className="footer__button--fetch"
            onClick={() => this.getNewQuote()}
            type="button"
          >
            <RefreshCw />
          </button>
        </footer>
      </>
    );
  }
}

export default Quotes;
