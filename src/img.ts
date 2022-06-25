import { PNG } from "pngjs";
import { forImage } from "./utils.js"
import { createReadStream, createWriteStream } from "fs"
export function obfuscatorImg(inputpath: string, outputpath: string) {
    createReadStream(inputpath)
        .pipe(new PNG())
        .on("parsed", function () {
            var b64 = this.data.toString("base64")
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
        })
}
export function deobfuscatorImg(inputpath: string, outputpath: string, width: number, height: number) {
    var finb64: string = "";
    createReadStream(inputpath)
        .pipe(new PNG())
        .on("parsed", function () {
            forImage(this.height, this.height, (idx, imgidx) => {
                if (this.data[imgidx] != 0) {
                    finb64 += String.fromCharCode(this.data[imgidx])
                }
            })
            var finpng = new PNG({ width: width, height: height })
            finpng.data = Buffer.from(finb64, "base64")
            finpng.pack().pipe(createWriteStream(outputpath))
        })
}

