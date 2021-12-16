export class Page {
  constructor(params) {
    this.params = params
  }

  afterRender() {}

  getRoot() {
    throw new Error('Method "getRoot" should be implemented')
  }

  destroy() {}
}
