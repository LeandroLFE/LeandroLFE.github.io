if(window!=self){
    self.onmessage = (e) =>{
        // the passed-in data is available via e.data
        console.log(e.data);
        self.postMessage({
            data: true
        })
    }
}