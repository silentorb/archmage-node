import fs = require('fs')
import {Collection} from "./Collection"
import {Unit} from "./Unit"
import {Version_Range, Version, Single_Version_Range} from "./Version"

export interface Unit_Source {
    name?: string
    dependencies: { [name: string]: string }
}

export function load_string(json: string, collection: Collection): Unit {
    let source: Unit_Source = JSON.parse(json)
    return load_unit(source, collection)
}

export function load_unit(source: Unit_Source, collection: Collection): Unit {
    let unit = collection.create_unit(source.name)
    for (let name in source.dependencies) {
        let version = create_version_range(source.dependencies [name])
        unit.add_dependency(collection.reference_dependency(name), version)
    }

    return unit
}

export function load_project(filename, collection: Collection) {
    const json = fs.readFileSync(filename, 'ascii')
    let project = JSON.parse(json)
    let dependencies = project.dependencies
    for (let name in dependencies) {
        let version = create_version_range(dependencies [name])
        collection.reference_dependency(name)
    }
}

export function load_unit_from_file(filename: string, collection: Collection): Unit {
    const json = fs.readFileSync(filename, 'ascii')
    return load_string(json, collection)
}

function create_version_range(pattern: string): Version_Range {
    let version = new Version(pattern)
    return new Single_Version_Range(version)
}