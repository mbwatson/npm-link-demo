export default class MyModule {
  constructor(name) {
    this.name = name;
  }

  logger() {
    console.log(`${ this.name }  --  YES`);
  }
}
