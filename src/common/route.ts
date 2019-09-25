export default {
  Routes: [] as any[],
  addRoute(route: any) {
    this.Routes.push(route)
  },
  getRoutes() {
    return this.Routes
  }
}
