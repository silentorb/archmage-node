"use strict"
require('source-map-support').install()

import assert = require('assert')
import archmage = require('../../projects/archmage')

describe('Load Project', () => {
    it('should work', () => {
        // assert.equal(-1, [1, 2, 3].indexOf(4))
        let registry = new archmage.Registry('test/resources/registry')
        let collection = new archmage.Collection(registry)
        archmage.load_project('test/resources/project.json', collection)
        assert.equal(2, Object.keys(collection.units).length)
    })
})