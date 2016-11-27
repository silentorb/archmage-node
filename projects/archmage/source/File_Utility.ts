import fs = require('fs')

export function directory_exists(path: string): boolean {
    if (fs['existsSync']) {
        return fs['existsSync'](path)
    }
    else {
        try {
            return fs.statSync(path).isDirectory();
        }
        catch (err) {
            return false;
        }
    }
}

export function make_directories(path: string) {
    let directories = path.split('/')
    let current_path = ''
    for (let i = 0; i < directories.length; ++i) {
        if (i > 1)
            current_path += '/'

        current_path += directories [i]
        if (!directory_exists(current_path)) {
            fs.mkdirSync(current_path)
        }
    }
}