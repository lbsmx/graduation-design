// @ts-ignore
class LowLevelComponent {
    name: string = '';
    constructor(name: string) {
        this.name = name;
    }
}

class Container {
    modules: any;
    constructor() {
        this.modules = {};
    }

    provide(key: string, module: any) {
        this.modules[key] = module;
    }

    get(key: string) {
        return this.modules[key];
    }
}

const container = new Container();

container.provide('lowlevel-1', new LowLevelComponent('lowlevel-1'));
container.provide('lowlevel-2', new LowLevelComponent('lowlevel-2'));

class HighLevelComponent_1 {
    name: string = '';
    constructor() {
        this.name = container.get('lowlevel-1').name;
        console.log('name', this.name);
    }
}
new HighLevelComponent_1();

class HighLevelComponent_2 {
    name: string = '';
    constructor() {
        this.name = container.get('lowlevel-2').name;
        console.log('name', this.name);
    }
}
new HighLevelComponent_2();
