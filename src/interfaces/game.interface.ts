import { FiveCardHand } from "@/entities/five-card-hand.entity";

export interface Game {
  execute(): FiveCardHand[];
}
