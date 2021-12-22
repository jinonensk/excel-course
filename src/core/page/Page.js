export class Page {
  constructor(params) {
    this.params = params || Date.now().toString()
  }

  afterRender() {}

  getRoot() {
    throw new Error('Method "getRoot" should be implemented')
  }

  destroy() {}
}
