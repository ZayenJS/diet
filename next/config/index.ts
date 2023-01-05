export abstract class Config {
  public static readonly PORT: number = Number(process.env.PORT || 7999);
  public static readonly RECIPES_PER_PAGE: number = 9;
  public static readonly TAGS_TO_DISPLAY_ON_RECIPE = {
    desktop: 3,
    mobile: 1,
  };
}
