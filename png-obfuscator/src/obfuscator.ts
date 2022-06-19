import {PNG} from "pngjs";
import {createReadStream, createWriteStream} from "fs"
if (process.argv[3]==undefined || process.argv[2]==undefined){
    console.log("Usage: <input-img> <output-img>")
    process.exit(1)
}
createReadStream(process.argv[2])
.pipe(new PNG())
.on("parsed" , function () {
    var b64=this.data.toString("base64")
    var height=Math.ceil(Math.sqrt(b64.length))
    var finimg=new PNG({
        width:height,
        height:height
    })
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < height; x++) {
            var idx=(height*y+x)
            var imgidx=idx<<2
            finimg.data[imgidx]=b64.charCodeAt(idx)
            finimg.data[imgidx+1]=b64.charCodeAt(idx)
            finimg.data[imgidx+2]=b64.charCodeAt(idx)
            finimg.data[imgidx+3]=255
        }
    }
    finimg.pack().pipe(createWriteStream(process.argv[3]))
})
