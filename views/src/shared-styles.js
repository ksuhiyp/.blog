/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
    .wrapper-btns {
    margin-top: 15px;
}
paper-button.link {
    color: #757575;
}
.alert-error {
    background: #ffcdd2;
    border: 1px solid #f44336;
    border-radius: 3px;
    color: #333;
    font-size: 14px;
    padding: 10px;
}
      .card {
        margin: 24px;
        padding: 16px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      :root {
  --primary-color: #4285f4;
}
a,
paper-button {
  font-weight: bold;
}
a {
  color: var(--primary-color);
}
paper-button {
  color: #fff;
}
paper-button.primary {
  background: var(--primary-color);
}
blockquote {
  border-left: 4px solid #eee;
  margin-left: 4px;
  padding-left: 20px;
}

      h1 {
        margin: 16px 0;
        color: #212121;
        font-size: 22px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
