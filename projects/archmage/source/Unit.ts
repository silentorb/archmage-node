import {Version, Version_Range} from "./Version"

export class Unit {
    name: string
    dependencies: Unit_Reference [] = []
    dependents: Unit [] = []
    // tier: Tier
    versions: Version [] = []
    url: string
    path: string

    constructor(name: string) {
        this.name = name
    }

    add_dependency(unit: Unit, version: Version_Range) {
        this.dependencies.push(new Unit_Reference(unit, version))
        unit.dependents.push(this)
    }
}

export class Unit_Reference {
    unit: Unit
    version: Version_Range

    constructor(unit: Unit, version: Version_Range) {
        this.unit = unit
        this.version = version
    }
}