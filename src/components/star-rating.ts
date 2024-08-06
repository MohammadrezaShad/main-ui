// star-rating.ts

export class StarRating extends HTMLElement {
  private rating: number = 0;

  private totalStars: number = 10;

  private readonly: boolean = true;

  private stars: HTMLElement[] = [];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.render();
  }

  static get observedAttributes() {
    return ['rating', 'total-stars'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'rating':
          this.rating = Number(newValue);
          break;
        case 'total-stars':
          this.totalStars = Number(newValue);
          break;
        default:
          break;
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    const emptyStarSvg = `<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.0005 21.75C4.12052 21.75 0.150514 17.78 0.150514 12.9C0.120514 7.17 5.58051 2.4 7.9305 0.61C8.5605 0.13 9.4405 0.13 10.0705 0.61C12.4205 2.43 17.8805 7.26 17.8505 12.91C17.8505 17.78 13.8805 21.75 9.0005 21.75ZM9.0005 1.75C8.9505 1.75 8.8905 1.77 8.8405 1.81C7.1505 3.1 1.63052 7.71 1.66052 12.9C1.66052 16.96 4.96053 20.25 9.0105 20.25C13.0605 20.25 16.3605 16.96 16.3605 12.91C16.3905 7.79 10.8605 3.12 9.1605 1.81C9.1005 1.77 9.0505 1.75 9.0005 1.75Z" fill="#44BAEB"/>
</svg>`;

    const filledStarSvg = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.61026 0.21C9.25026 -0.07 8.75029 -0.07 8.39029 0.21C6.49029 1.66 0.880276 6.39 0.910276 11.9C0.910276 16.36 4.54028 20 9.01028 20C13.4803 20 17.1103 16.37 17.1103 11.91C17.1203 6.48 11.5003 1.67 9.61026 0.21Z" fill="#44BAEB"/>
</svg>`;

    const halfStarSvg = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.61026 0.21C9.25026 -0.07 8.75029 -0.07 8.39029 0.21C6.49029 1.66 0.880276 6.39 0.910276 11.9C0.910276 16.36 4.54028 20 9.01028 20C13.4803 20 17.1103 16.37 17.1103 11.91C17.1203 6.48 11.5003 1.67 9.61026 0.21Z" fill="url(#halfGradient)"  stroke="#44BAEB" stroke-width="1px" />
<defs>
  <linearGradient id="halfGradient" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="50%" style="stop-color: #44BAEB; stop-opacity: 1" />
    <stop offset="50%" style="stop-color: transparent; stop-opacity: 1" />
  </linearGradient>
</defs>
</svg>`;

    this.shadowRoot.innerHTML = `
          <style>
              .star {
                  cursor: pointer;
                  font-size: 2rem;
                  display: inline-block;
                  padding: 2px 4px;
              }
              .star-rating {
                  display: flex;
                  align-items: center;
                  gap: 8px;
              }
              .score {
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 18px;
                  color: #6E7072;
                  margin-left: 8px;
              }
          </style>
          <div class="star-rating">
            <div id="stars"></div>
            <span class="score">${this.rating}/${this.totalStars}</span>
          </div>
      `;

    const starsContainer = this.shadowRoot.getElementById('stars');
    if (starsContainer) {
      starsContainer.innerHTML = '';
      this.stars = [];

      for (let i = 1; i <= this.totalStars; i += 1) {
        const star = document.createElement('span');
        star.classList.add('star');

        if (i <= this.rating) {
          star.innerHTML = filledStarSvg;
        } else if (i > this.rating && i - this.rating < 1) {
          star.innerHTML = halfStarSvg;
        } else {
          star.innerHTML = emptyStarSvg;
        }

        if (!this.readonly) star.addEventListener('click', () => this.setRating(i));
        this.stars.push(star);
        starsContainer.appendChild(star);
      }
    }
  }

  private setRating(rating: number) {
    this.rating = rating;
    this.setAttribute('rating', rating.toString());
    this.render();
  }
}

customElements.define('star-rating', StarRating);
