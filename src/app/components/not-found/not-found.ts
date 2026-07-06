import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <h1>Page non trouvée</h1>
        <p class="not-found-description">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <p class="not-found-hint">
          Vérifiez l'URL ou retournez à l'accueil pour découvrir nos restaurants.
        </p>
        <a routerLink="/" class="home-link">
          ← Retour à l'accueil
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .not-found-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 70vh;
        padding: 2rem;
      }
      .not-found-content {
        text-align: center;
        max-width: 500px;
      }
      .error-code {
        font-size: 6rem;
        font-weight: 900;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1.2;
        margin-bottom: 1rem;
      }
      h1 {
        font-size: 1.8rem;
        color: var(--text-primary);
        margin-bottom: 0.8rem;
      }
      .not-found-description,
      .not-found-hint {
        color: var(--text-secondary);
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        line-height: 1.6;
      }
      .home-link {
        display: inline-block;
        margin-top: 1.5rem;
        padding: 0.8rem 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      .home-link:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      }
    `,
  ],
})
export class NotFoundComponent {}