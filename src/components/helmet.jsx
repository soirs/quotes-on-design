const typekit = 'https://use.typekit.net/qcn8ytc.css';
const featherIcons = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
const title = 'Quotes on Design';

const Helmet = {
  title,
  titleTemplate: '%s | Frank Richard Semakula - Frontend Developer',
  htmlAttributes: { lang: 'en' },
  link: [{ rel: 'stylesheet', href: typekit }],
  script: [{ src: featherIcons }],
};

export default Helmet;
