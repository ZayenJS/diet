import { Difficulty as DifficultyEnum } from '@prisma/client';

export class Difficulty {
  public static getAll() {
    return Object.values(DifficultyEnum);
  }

  public static getDifficultyLabel(difficulty: DifficultyEnum) {
    switch (difficulty) {
      case DifficultyEnum.EASY:
        return "Un jeu d'enfant!";
      case DifficultyEnum.MEDIUM:
        return 'Un peu de pratique.';
      case DifficultyEnum.HARD:
        return 'Cordon bleu.';
      default:
        return 'Inconnu';
    }
  }

  public static getDifficultyLevel(difficulty: DifficultyEnum) {
    switch (difficulty) {
      case DifficultyEnum.EASY:
        return 1;
      case DifficultyEnum.MEDIUM:
        return 2;
      case DifficultyEnum.HARD:
        return 3;
      default:
        return 0;
    }
  }

  public static getDifficultyClassName(difficulty: DifficultyEnum) {
    return `difficulty_icon--${difficulty.toLowerCase()}`;
  }

  public static getDifficultyMarkup(difficulty: DifficultyEnum, classes?: string) {
    const difficultyLevel = Difficulty.getDifficultyLevel(difficulty);

    let markup = '';

    for (let i = 0; i < difficultyLevel; i++) {
      markup += `
        <span class="${classes}"></span>
      `;
    }

    return markup;
  }
}
