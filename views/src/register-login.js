/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import '@polymer/paper-input/paper-input.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-localstorage/iron-localstorage.js';
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class RegisterLogin extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
<app-location route={{route}}></app-location>
      <div class="card">
    <div id="unauthenticated" hidden$="[[storedUser.loggedin]]">
        <h1>Log In</h1>

    <p><strong>Log in</strong> or <strong>sign up</strong> to access secret Chuck Norris quotes!</p>
    <template is="dom-if" if="[[error]]">
    <p class="alert-error"><strong>Error:</strong> [[error]]</p>
</template>
    <paper-input-container>
      <label slot="input">Username</label>
      <iron-input slot="input" bind-value="{{formData.username}}">
        <input id="username" type="text" value="{{formData.username}}" placeholder="Username">
      </iron-input>
    </paper-input-container>

    <paper-input-container>
      <label>Password</label>
      <iron-input slot="input" bind-value="{{formData.password}}">
        <input id="password" type="password" value="{{formData.password}}" placeholder="Password">
      </iron-input>
    </paper-input-container>

    <div class="wrapper-btns">
      <paper-button raised class="primary" on-tap="postLogin">Log In</paper-button>
      <paper-button class="link" on-tap="postRegister">Sign Up</paper-button>
    </div>
</div>
<div id="authenticated" hidden$=[[!storedUser.loggedin]]>
  <h2>Hello, [[storedUser.name]]</h2>
  <p>you can access <a href="[[routPath]]secret-quotes">Secret Quotes</a>
  </div>
<iron-ajax
id="registerLoginAjax"
method="post"
content-type="application/json"
handle-as="text"
on-response="handleUserResponse"
on-error="handleUserError"></iron-ajax>
<iron-localstorage name="user-storage" value="{{storedUser}}"></iron-localstorage>
    `;
  }
  static get properties(){
    return {
      formData:{
        type:Object,
        value:{}
      },
      storedUser:Object,
      error:String
    }
  }
  _setReqBody(){
    this.$.registerLoginAjax.body=this.formData;
  }
  postLogin(){
    this.$.registerLoginAjax.url='http://localhost:3001/users';
    this._setReqBody();
    this.$.registerLoginAjax.generateRequest();
  }
  postRegister(){
    this.$.registerLoginAjax.url='http://localhost:3001/sessions/create';
    this._setReqBody();
    this.$.registerLoginAjax.generateRequest();
  }
  handleUserError(e){
    this.error=e.detail.request.xhr.response
  };
  handleUserResponse(e){
    let res=JSON.parse(e.detail.response)
    if(res.id_token){
      this.error='';
      this.storedUser={
      name: this.formData.username,
      id_token: res.id_token,
      access_token: res.access_token,
      loggedin: true
      }
      this.set('route.path' , '/secret-quotes')
    }
  };
}

window.customElements.define('register-login', RegisterLogin);
