import React from 'react';
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios"
import logo from "../assets/logo.png"

import {
    Link
  } from "react-router-dom";

class NavBar extends React.Component {
    state =
    {
        auth : false
    }

    constructor(props)
    {
        super(props)
        var page = this
        axios.get("/api/auth")
        .then((response) =>
        {
            this.setState({auth: response.data.auth})
        })
    }

    render()
    {
        var page = this
        if (this.state.auth == false)
        {
            return (
                <div data-section-id="header" data-section-type="header-section">
                <header className="site-header border-bottom logo--left" role="banner">
                <div className="grid grid--no-gutters grid--table site-header__mobile-nav">
                <div className="grid__item medium-up--one-quarter logo-align--left">
                <div className="h2 site-header__logo">
                <Link to="/" className="site-header__logo-image">
                  <img src={logo}
                  style={{maxWidth: "250px"}}/>
                </Link>
                </div>
                </div>
                <nav className="grid__item medium-up--one-half small--hide" id="AccessibleNav" role="navigation">
                <ul className="site-nav list--inline " id="SiteNav">
                  <li>
                      <a href="https://www.sliceengineering.com/" className="site-nav__link site-nav__link--main" style={{textDecoration: "none"}}>
                      <span className="site-nav__label">Home</span>
                      </a>
                  </li>

                  {/* <li className="site-nav--has-dropdown" data-has-dropdowns="">
                      <button className="site-nav__link site-nav__link--main site-nav__link--button">
                          <span className="site-nav__label">Shop</span><svg aria-hidden="true" focusable="false" role="presentation" className="icon icon--wide icon-chevron-down" viewBox="0 0 498.98 284.49"><path className="cls-1" d="M80.93 271.76A35 35 0 0 1 140.68 247l189.74 189.75L520.16 247a35 35 0 1 1 49.5 49.5L355.17 511a35 35 0 0 1-49.5 0L91.18 296.5a34.89 34.89 0 0 1-10.25-24.74z" transform="translate(-80.93 -236.76)"></path></svg>
                      </button>
                  </li> */}

                  {/* <li>
                      <a href="https://www.sliceengineering.com/pages/partner" className="site-nav__link site-nav__link--main" style={{textDecoration: "none"}}>
                      <span className="site-nav__label">Partner</span>
                      </a>
                  </li> */}

                  {/* <li>
                      <a href="https://www.sliceengineering.com/pages/about-us" className="site-nav__link site-nav__link--main" style={{textDecoration: "none"}}>
                      <span className="site-nav__label">About Us</span>
                      </a>
                  </li> */}

                  <li>
                      <Link to="/" className="site-nav__link--active site-nav__link--main" style={{textDecoration: "none"}}>
                      <span className="site-nav__label">3D Printing Service Portal</span>
                      </Link>
                  </li>

                  {/* <li className="site-nav--has-dropdown" data-has-dropdowns="">
                      <button className="site-nav__link site-nav__link--main site-nav__link--button">
                          <span className="site-nav__label">Resources</span><svg aria-hidden="true" focusable="false" role="presentation" className="icon icon--wide icon-chevron-down" viewBox="0 0 498.98 284.49"><path className="cls-1" d="M80.93 271.76A35 35 0 0 1 140.68 247l189.74 189.75L520.16 247a35 35 0 1 1 49.5 49.5L355.17 511a35 35 0 0 1-49.5 0L91.18 296.5a34.89 34.89 0 0 1-10.25-24.74z" transform="translate(-80.93 -236.76)"></path></svg>
                      </button>
                  </li> */}
                </ul>
                </nav>

                <div className="grid__item medium-up--one-quarter text-right site-header__icons site-header__icons--plus">
                <div className="site-header__icons-wrapper">

                  {/* <a href="https://www.sliceengineering.com/account/login" className="site-header__icon site-header__account">
                      <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-login" viewBox="0 0 28.33 37.68"><path d="M14.17 14.9a7.45 7.45 0 1 0-7.5-7.45 7.46 7.46 0 0 0 7.5 7.45zm0-10.91a3.45 3.45 0 1 1-3.5 3.46A3.46 3.46 0 0 1 14.17 4zM14.17 16.47A14.18 14.18 0 0 0 0 30.68c0 1.41.66 4 5.11 5.66a27.17 27.17 0 0 0 9.06 1.34c6.54 0 14.17-1.84 14.17-7a14.18 14.18 0 0 0-14.17-14.21zm0 17.21c-6.3 0-10.17-1.77-10.17-3a10.17 10.17 0 1 1 20.33 0c.01 1.23-3.86 3-10.16 3z"></path></svg>
                      <span className="icon__fallback-text">Log in</span>
                  </a> */}

                  {/* <a href="https://www.sliceengineering.com/cart" className="site-header__icon site-header__cart">
                      <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-cart" viewBox="0 0 37 40"><path d="M36.5 34.8L33.3 8h-5.9C26.7 3.9 23 .8 18.5.8S10.3 3.9 9.6 8H3.7L.5 34.8c-.2 1.5.4 2.4.9 3 .5.5 1.4 1.2 3.1 1.2h28c1.3 0 2.4-.4 3.1-1.3.7-.7 1-1.8.9-2.9zm-18-30c2.2 0 4.1 1.4 4.7 3.2h-9.5c.7-1.9 2.6-3.2 4.8-3.2zM4.5 35l2.8-23h2.2v3c0 1.1.9 2 2 2s2-.9 2-2v-3h10v3c0 1.1.9 2 2 2s2-.9 2-2v-3h2.2l2.8 23h-28z"></path></svg>
                      <span className="icon__fallback-text">Cart</span>
                      <div id="CartCount" className="site-header__cart-count hide" data-cart-count-bubble="">
                          <span data-cart-count="">0</span>
                          <span className="icon__fallback-text medium-up--hide">items</span>
                      </div>
                  </a> */}

                  {/* <form method="post" action="https://www.sliceengineering.com/cart/update" id="currency_form" acceptCharset="UTF-8" className="currency-selector small--hide" encType="multipart/form-data">
                      <label htmlFor="CurrencySelector" className="visually-hidden">Currency</label>
                      <div className="currency-selector__input-wrapper select-group">
                      <select defaultValue={'USD'} name="currency" id="CurrencySelector" className="currency-selector__dropdown" aria-describedby="a11y-refresh-page-message a11y-selection-message" data-currency-selector="">

                          <option value="AUD">AUD</option>

                          <option value="CAD">CAD</option>

                          <option value="DKK">DKK</option>

                          <option value="EUR">EUR</option>

                          <option value="GBP">GBP</option>

                          <option value="JPY">JPY</option>

                          <option value="NZD">NZD</option>

                          <option value="USD">USD</option>

                      </select>
                      <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon--wide icon-chevron-down" viewBox="0 0 498.98 284.49"><path className="cls-1" d="M80.93 271.76A35 35 0 0 1 140.68 247l189.74 189.75L520.16 247a35 35 0 1 1 49.5 49.5L355.17 511a35 35 0 0 1-49.5 0L91.18 296.5a34.89 34.89 0 0 1-10.25-24.74z" transform="translate(-80.93 -236.76)"></path></svg>
                      </div>
                  </form> */}

                  <Link to="/login"><Button style={{marginLeft: "15px"}} variant="outline-success">Login</Button></Link>
                  <Link to="/sign-up"><Button className="ml-3" variant="outline-success">Signup</Button></Link>
                </div>
                </div>
                </div>
                </header>
          </div>
            )
        }

        else
        {
            return (
                <div data-section-id="header" data-section-type="header-section">
                      <header className="site-header border-bottom logo--left" role="banner">
                      <div className="grid grid--no-gutters grid--table site-header__mobile-nav">
                      <div className="grid__item medium-up--one-quarter logo-align--left">
                      <div className="h2 site-header__logo">
                      <Link to="/" className="site-header__logo-image">
                        <img src={logo}
                        style={{maxWidth: "250px"}}/>
                      </Link>
                      </div>
                      </div>
                      <nav className="grid__item medium-up--one-half small--hide" id="AccessibleNav" role="navigation">
                      <ul className="site-nav list--inline " id="SiteNav">
                        <li>
                            <a href="https://www.sliceengineering.com/" className="site-nav__link site-nav__link--main" style={{textDecoration: "none"}}>
                            <span className="site-nav__label">Home</span>
                            </a>
                        </li>

                        {/* <li className="site-nav--has-dropdown" data-has-dropdowns="">
                            <button className="site-nav__link site-nav__link--main site-nav__link--button">
                                <span className="site-nav__label">Shop</span><svg aria-hidden="true" focusable="false" role="presentation" className="icon icon--wide icon-chevron-down" viewBox="0 0 498.98 284.49"><path className="cls-1" d="M80.93 271.76A35 35 0 0 1 140.68 247l189.74 189.75L520.16 247a35 35 0 1 1 49.5 49.5L355.17 511a35 35 0 0 1-49.5 0L91.18 296.5a34.89 34.89 0 0 1-10.25-24.74z" transform="translate(-80.93 -236.76)"></path></svg>
                            </button>
                        </li> */}

                        {/* <li>
                            <a href="https://www.sliceengineering.com/pages/partner" className="site-nav__link site-nav__link--main" style={{textDecoration: "none"}}>
                            <span className="site-nav__label">Partner</span>
                            </a>
                        </li> */}

                        {/* <li>
                            <a href="https://www.sliceengineering.com/pages/about-us" className="site-nav__link site-nav__link--main" style={{textDecoration: "none"}}>
                            <span className="site-nav__label">About Us</span>
                            </a>
                        </li> */}

                        <li>
                            <Link to="/protected" className="site-nav__link--active site-nav__link--main" style={{textDecoration: "none"}}>
                            <span className="site-nav__label">3D Printing Service Portal</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/FAQ" className="site-nav__link--active site-nav__link--main" style={{textDecoration: "none"}}>
                            <span className="site-nav__label">FAQ</span>
                            </Link>
                        </li>

                        {/* <li className="site-nav--has-dropdown" data-has-dropdowns="">
                            <button className="site-nav__link site-nav__link--main site-nav__link--button">
                                <span className="site-nav__label">Resources</span><svg aria-hidden="true" focusable="false" role="presentation" className="icon icon--wide icon-chevron-down" viewBox="0 0 498.98 284.49"><path className="cls-1" d="M80.93 271.76A35 35 0 0 1 140.68 247l189.74 189.75L520.16 247a35 35 0 1 1 49.5 49.5L355.17 511a35 35 0 0 1-49.5 0L91.18 296.5a34.89 34.89 0 0 1-10.25-24.74z" transform="translate(-80.93 -236.76)"></path></svg>
                            </button>
                        </li> */}
                      </ul>
                      </nav>

                      <div className="grid__item medium-up--one-quarter text-right site-header__icons site-header__icons--plus">
                      <div className="site-header__icons-wrapper">

                        {/* <a href="https://www.sliceengineering.com/account/login" className="site-header__icon site-header__account">
                            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-login" viewBox="0 0 28.33 37.68"><path d="M14.17 14.9a7.45 7.45 0 1 0-7.5-7.45 7.46 7.46 0 0 0 7.5 7.45zm0-10.91a3.45 3.45 0 1 1-3.5 3.46A3.46 3.46 0 0 1 14.17 4zM14.17 16.47A14.18 14.18 0 0 0 0 30.68c0 1.41.66 4 5.11 5.66a27.17 27.17 0 0 0 9.06 1.34c6.54 0 14.17-1.84 14.17-7a14.18 14.18 0 0 0-14.17-14.21zm0 17.21c-6.3 0-10.17-1.77-10.17-3a10.17 10.17 0 1 1 20.33 0c.01 1.23-3.86 3-10.16 3z"></path></svg>
                            <span className="icon__fallback-text">Log in</span>
                        </a> */}

                        {/* <a href="https://www.sliceengineering.com/cart" className="site-header__icon site-header__cart">
                            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-cart" viewBox="0 0 37 40"><path d="M36.5 34.8L33.3 8h-5.9C26.7 3.9 23 .8 18.5.8S10.3 3.9 9.6 8H3.7L.5 34.8c-.2 1.5.4 2.4.9 3 .5.5 1.4 1.2 3.1 1.2h28c1.3 0 2.4-.4 3.1-1.3.7-.7 1-1.8.9-2.9zm-18-30c2.2 0 4.1 1.4 4.7 3.2h-9.5c.7-1.9 2.6-3.2 4.8-3.2zM4.5 35l2.8-23h2.2v3c0 1.1.9 2 2 2s2-.9 2-2v-3h10v3c0 1.1.9 2 2 2s2-.9 2-2v-3h2.2l2.8 23h-28z"></path></svg>
                            <span className="icon__fallback-text">Cart</span>
                            <div id="CartCount" className="site-header__cart-count hide" data-cart-count-bubble="">
                                <span data-cart-count="">0</span>
                                <span className="icon__fallback-text medium-up--hide">items</span>
                            </div>
                        </a> */}

                        {/* <form method="post" action="https://www.sliceengineering.com/cart/update" id="currency_form" acceptCharset="UTF-8" className="currency-selector small--hide" encType="multipart/form-data">
                            <label htmlFor="CurrencySelector" className="visually-hidden">Currency</label>
                            <div className="currency-selector__input-wrapper select-group">
                            <select defaultValue={'USD'} name="currency" id="CurrencySelector" className="currency-selector__dropdown" aria-describedby="a11y-refresh-page-message a11y-selection-message" data-currency-selector="">

                                <option value="AUD">AUD</option>

                                <option value="CAD">CAD</option>

                                <option value="DKK">DKK</option>

                                <option value="EUR">EUR</option>

                                <option value="GBP">GBP</option>

                                <option value="JPY">JPY</option>

                                <option value="NZD">NZD</option>

                                <option value="USD">USD</option>

                            </select>
                            <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon--wide icon-chevron-down" viewBox="0 0 498.98 284.49"><path className="cls-1" d="M80.93 271.76A35 35 0 0 1 140.68 247l189.74 189.75L520.16 247a35 35 0 1 1 49.5 49.5L355.17 511a35 35 0 0 1-49.5 0L91.18 296.5a34.89 34.89 0 0 1-10.25-24.74z" transform="translate(-80.93 -236.76)"></path></svg>
                            </div>
                        </form> */}

                        <Button style={{marginLeft: "15px"}} onClick={(event) =>
                            {
                                axios.post("/api/logout")
                                localStorage.removeItem('user_id')
                                window.location.reload();
                            }} variant="outline-success">Log Out</Button>

                      </div>
                      </div>
                      </div>
                      </header>
                </div>
            )
        }
    }
}

export default NavBar
