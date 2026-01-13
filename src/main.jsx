import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Handle GitHub Pages 404.html redirects
(function() {
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
})();

// Handle query string redirects from 404.html
(function() {
  var search = window.location.search;
  if (search && search.indexOf('?/') === 0) {
    var path = search.slice(2).split('&')[0].replace(/~and~/g, '&');
    var newPath = '/portfolio-website' + path;
    history.replaceState(null, null, newPath);
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
