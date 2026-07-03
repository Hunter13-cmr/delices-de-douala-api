import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css'
})
export class StarRatingComponent {

  currentRating = input.required<number>();

  ratingChanged = output<number>();

  stars = [1,2,3,4,5];

  hoverRating = signal(0);

  thanksMessage = signal("");

  hoverMessage = computed(() => {

    switch (this.hoverRating()) {

      case 1: return "😖 À éviter";
      case 2: return "😕 Peut mieux faire";
      case 3: return "🙂 Bon restaurant";
      case 4: return "😋 Très bonne adresse";
      case 5: return "👑 Une adresse incontournable";
      default: return "";

    }

  });

  rate(rating:number){

    this.ratingChanged.emit(rating);

    const messages = [
      "",
      "💬 Merci pour votre franchise !",
      "📝 Merci, votre avis aidera les autres clients.",
      "👍 Merci pour votre retour !",
      "😊 Merci ! Vous recommandez ce restaurant.",
      "🎉 Merci ! Vous le recommandez vivement."
    ];

    this.thanksMessage.set(messages[rating]);

    setTimeout(() => {

      this.thanksMessage.set("");

    },2000);

  }

}