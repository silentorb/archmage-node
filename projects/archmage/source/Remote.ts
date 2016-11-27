import {Collection} from "./Collection"
import {Unit} from "./Unit"
import {directory_exists, make_directories} from "./File_Utility"
let Git = require('nodegit')

export function check_dependency(unit: Unit, path: string) {
    let base_path = path + (unit.path ? '/' + unit.path : '')
    let full_path = base_path + '/' + unit.name
    if (directory_exists(full_path))
        return

    // Don't make the full path because git clone will create the final folder.
    make_directories(base_path)

    Git.Clone()

}

export function clone_missing_dependencies(collection: Collection, path: string) {
    for (let name in collection.units) {
        check_dependency(collection.units [name], path)
    }
}