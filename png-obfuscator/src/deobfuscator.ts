import {PNG} from "pngjs";
import {createReadStream, createWriteStream} from "fs"
var height=459
var finb64:string=""
if (process.argv[3]==undefined || process.argv[2]==undefined || process.argv[4] == undefined || process.argv[5] == undefined){
    console.log("Usage: <input-img> <width> <height> <output-img>")
    process.exit(1)
}
createReadStream(process.argv[2])
.pipe(new PNG())
.on("parsed" , function () {
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < height; x++) {
            var idx=(height*y+x)
            var imgidx=idx<<2
            if(this.data[imgidx]!=0){
                finb64 += String.fromCharCode(this.data[imgidx])
            }
        }
    }
    var finpng=new PNG({width:parseInt(process.argv[3]),height:parseInt(process.argv[4])})
    finpng.data=Buffer.from(finb64,"base64")
    finpng.pack().pipe(createWriteStream(process.argv[5]))
})
