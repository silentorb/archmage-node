export class Version {
    primary: number
    secondary: number

    constructor(pattern: string){
        let match = pattern.match(/(\d+)\.(\d+)/)
        this.primary = parseInt(match[1])
        this.secondary = parseInt(match[2])
    }

    matches(version: Version) {
        return this.primary == version.primary
            && this.secondary == version.secondary
    }
}

export interface Version_Range {
    matches(version: Version): boolean
}

export class Single_Version_Range implements Version_Range {
    version: Version

    matches(version: Version): boolean {
        return this.version.matches(version)
    }

    constructor(version: Version) {
        this.version = version
    }
}