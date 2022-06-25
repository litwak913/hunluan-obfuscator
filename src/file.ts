import { PNG } from "pngjs";
import { createReadStream, createWriteStream, readFileSync, writeFileSync } from "fs"
import { forImage } from "./utils.js";
export function obfuscatorFile(inputpath: string, outputpath: string) {
    var b64 = readFileSync(inputpath).toString("base64")
    var height = Math.ceil(Math.sqrt(b64.length))
    var finimg = new PNG({
        width: height,
        height: height
    })
    forImage(height, height, (idx, imgidx) => {
        finimg.data[imgidx] = b64.charCodeAt(idx)
        finimg.data[imgidx + 1] = b64.charCodeAt(idx)
        finimg.data[imgidx + 2] = b64.charCodeAt(idx)
        finimg.data[imgidx + 3] = 255
    })
    finimg.pack().pipe(createWriteStream(outputpath))
}
export function deobfuscatorFile(inputpath: string, outputpath: string) {
    var finb64: string = ""
    createReadStream(inputpath)
        .pipe(new PNG())
        .on("parsed", function () {
            forImage(this.height, this.height, (idx, imgidx) => {
                if (this.data[imgidx] != 0) {
                    finb64 += String.fromCharCode(this.data[imgidx])
                }
            })
            writeFileSync(outputpath, Buffer.from(finb64, "base64"))
        })
}