interface GamesReport {
  games_played: number;
  games_won: number;
}

class Game {
  private switch_doors: boolean;
  private n_doors: number;

  private games_played: number;
  private games_won: number;

  public constructor(
    switch_doors: boolean,
    n_doors: number,
  ) {
    this.switch_doors = switch_doors;
    this.n_doors = n_doors;
    this.games_played = 0;
    this.games_won = 0;
  }

  public playOneGame(): GamesReport {
    let door = Math.round(Math.random() * this.n_doors);
    let pick = Math.round(Math.random() * this.n_doors);

    if (
      (this.switch_doors && door !== pick) ||
      (!this.switch_doors && door === pick)
    ) {
      this.games_won += 1;
    }

    this.games_played += 1;

    return {
      games_played: this.games_played,
      games_won: this.games_won,
    };
  }
}

export { Game };
export type { GamesReport };
