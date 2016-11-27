import {Unit} from "./Unit"

export interface Unit_Loader {
    get_unit(name: string, collection: Collection): Unit
}

export class Collection {
    // tiers: Tier [] = []
    units: { [name: string]: Unit } = {}
    incomplete_units: { [name: string]: Unit } = {}
    unit_source: Unit_Loader

    constructor(unit_source: Unit_Loader) {
        this.unit_source = unit_source
    }

    has_incomplete_references(): boolean {
        return Object.keys(this.incomplete_units).length > 0
    }

    create_unit(name: string): Unit {
        if (this.units [name])
            throw Error("Duplicate unit: " + name + ".")

        let unit: Unit
        if (this.incomplete_units [name]) {
            unit = this.incomplete_units [name]
            delete this.incomplete_units[name]
        }
        else {
            unit = new Unit(name)
        }

        this.units [name] = unit
        return unit
    }

    reference_dependency(name: string): Unit {
        if (this.units [name])
            return this.units [name]

        if (this.incomplete_units [name])
            return this.incomplete_units [name]

        let incomplete = this.unit_source.get_unit(name, this)
        this.incomplete_units [name] = incomplete
        return incomplete
    }
}