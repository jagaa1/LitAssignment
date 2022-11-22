import { LitElement, html, css } from 'lit-element';
class LitToast extends LitElement {
  static get styles() {
    return css`
      :host {
        display: none;
        justify-content: center;
        width: 100%;
        /*visibility: hidden;*/
        position: fixed;
        z-index: var(--lt-z-index, 2);
        bottom: var(--lt-bottom, 40px);
      }
      :host(.show) {
        display: flex;
        /*visibility: visible;*/
        -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
      }
      div {
        min-width: 100px;
        color: var(--lt-color, #dddddd);
        text-align: center;
        font-size: var(--lt-font-size, 1em);
        font-family: var(--lt-font-family, sans-serif);
      @-webkit-keyframes fadeout {
        from {
          bottom: var(--lt-bottom, 40px);
          opacity: 1;
        }
        to {
          bottom: 0;
          opacity: 0;
        }
      }
      @keyframes fadeout {
        from {
          bottom: var(--lt-bottom, 40px);
          opacity: 1;
        }
        to {
          bottom: 0;
          opacity: 0;
        }
      }
    `;
  }
  static get properties() {
    return {
      _toastText: { type: String }
    };
  }
  constructor() {
    super();
    this._toastText = '';
  }
  render() {
    return html`
      <div role="alert">
        ${this._toastText}
      </div>
    `;
  }
  // To read out loud the toast
  firstUpdated() {
    this.style.setProperty('aria-live', 'assertive');
    this.style.setProperty('aria-atomic', 'true');
    this.style.setProperty('aria-relevant', 'all');
  }

  show(text = '', duration = 3000) {
    if (this.className === 'show') {
      // Do nothing, prevent spamming
    } else {
      // 1000ms to avoid both 0.5s animations to not interfere
      if (duration >= 1000) {
        this.style.animation = `fadein 0.5s, fadeout 0.5s ${duration - 500}ms`;
    return new Promise((resolve, reject) => {
      if (this.className === 'show') {
        // Do nothing, prevent spamming
      } else {
        // 1000ms to avoid both 0.5s animations to not interfere
        if (duration >= 1000) {
          this.style.animation = `fadein 0.5s, fadeout 0.5s ${duration -
            500}ms`;
        }
        this._toastText = text;
        this.className = 'show';
        setTimeout(() => {
          this.className = this.className.replace('show', '');
          resolve();
        }, duration);
      }
      this._toastText = text;
      this.className = 'show';
      setTimeout(() => {
        this.className = this.className.replace('show', '');
      }, duration);
    }
    });
  }
}
customElements.define('lit-toast', LitToast);
