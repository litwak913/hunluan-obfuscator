function forImage(height:number,width:number,callback:(idx:number,imgidx:number) => void){
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var idx=(width*y+x)
            var imgidx=idx<<2
            callback(idx,imgidx)
        }
    }
}