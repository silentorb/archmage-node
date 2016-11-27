/// <reference path="../../../node_modules/@types/node/index.d.ts" />

import {Collection, Unit_Loader} from "./Collection"
import {load_unit_from_file} from "./Loader"
import {Unit} from "./Unit"

export class Registry implements Unit_Loader {
    path: string
    url: string

    constructor(path: string){
        this.path = path
    }

    get_unit(name: string, collection: Collection): Unit {
        return load_unit_from_file(this.path + '/' + name + '.json', collection)
    }
}