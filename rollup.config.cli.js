import typescript from '@rollup/plugin-typescript'
export default {
    input:'./src/cli.ts',
    output:{
        file:'./dist/cli.js',
        format:'cjs'
    },
    plugins:[
        typescript()
    ]
}