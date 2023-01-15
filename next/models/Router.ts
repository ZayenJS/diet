export enum RouteName {
  HOME = 'HOME',
  RECIPES = 'RECIPES',
  FOOD = 'FOOD',
  ADD_RECIPE = 'ADD_RECIPE',
  ADD_FOOD = 'ADD_FOOD',
  UPLOADER_UPLOAD = 'UPLOADER_UPLOAD',
}

class Router {
  constructor(routes?: Record<RouteName, Route>) {
    if (routes) {
      this.routes = routes;
    }
  }
  private routes: Record<RouteName, Route> | undefined;

  public getRoutes(): Record<RouteName, Route> {
    if (!this.routes) {
      throw new Error('Routes were not set.');
    }

    return this.routes;
  }

  public getRoutesArray(): Route[] {
    if (!this.routes) {
      throw new Error('Routes were not set.');
    }

    return Object.values(this.routes);
  }

  public getRoute(name: RouteName): Route {
    if (!this.routes) {
      throw new Error('Routes were not set.');
    }

    const route = this.routes[name];
    if (!route) {
      throw new Error(`Route ${name} was not found.`);
    }

    return route;
  }

  public getRouteHref(name: RouteName): string {
    if (!this.routes) {
      throw new Error('Routes were not set.');
    }

    const href = this.getRoute(name).href;

    if (!href) {
      throw new Error(`Route ${name} has no href.`);
    }

    return href;
  }
}

export class Route {
  private _name: RouteName;
  private _text: string;
  private _href: string;

  constructor(name: RouteName, text: string, href: string) {
    this._name = name;
    this._text = text;
    this._href = href;
  }

  public get name(): RouteName {
    return this._name;
  }

  public get text(): string {
    return this._text;
  }

  public get href(): string {
    return this._href;
  }
}

export const router = new Router({
  [RouteName.HOME]: new Route(RouteName.HOME, 'Accueil', '/'),
  [RouteName.RECIPES]: new Route(RouteName.RECIPES, 'Recettes', '/recettes'),
  [RouteName.ADD_RECIPE]: new Route(RouteName.ADD_RECIPE, 'Ajouter Recette', '/recettes/ajouter'),
  [RouteName.ADD_FOOD]: new Route(RouteName.ADD_FOOD, 'Ajouter Aliment', '/aliments/ajouter'),
  [RouteName.FOOD]: new Route(RouteName.FOOD, 'Aliments', '/aliments'),
  [RouteName.UPLOADER_UPLOAD]: new Route(RouteName.UPLOADER_UPLOAD, 'Uploader', '/upload'),
});
