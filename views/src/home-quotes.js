/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
 import '@polymer/paper-button/paper-button.js';
 import '@polymer/iron-ajax/iron-ajax.js';
import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';


class HomeQuotes extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
      <h1>Quote</h1>
      <blockquote>[[quote]]</blockquote>
      <paper-button raised on-tap='getQuote' class='primary'>Get a new Quote</paper-button>
      </div>
  <iron-ajax
    id="getQuoteAjax"
    auto
    url="http://localhost:3001/api/random-quote"
    method="get"
    handle-as="text"
    last-response="{{quote}}">
</iron-ajax>
    `;
  }
  getQuote() {
      this.$.getQuoteAjax.generateRequest();
  }
}
window.customElements.define('home-quotes', HomeQuotes);
