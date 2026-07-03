/**
 * Modèle Plat - Représente un plat du menu
 * Tous les prix sont en FCFA (XAF)
 */
export interface Plat {
  id: string;
  nom: string;
  prix: number;
  categorie: string;
  disponible: boolean;
  image: string;
  restaurantId: number;
}