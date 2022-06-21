import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
export default {
    input:'./src/cli.ts',
    output:{
        file:'./dist/cli.js',
        format:'es'
    },
    external:["inquirer"],
    plugins:[
        commonjs(),
        typescript(),
        json(),
        resolve()
    ]
}