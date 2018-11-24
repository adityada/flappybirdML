function Bird() {
    this.y = height/2;
    this.x = width/4;

    this.gravity = 0.8;
    this.lift = -25;
    this.velocity = 0;
    this.airResistance = 0.9;
    this.data = []
    this.jump = false;
    this.data_id = 307;

    this.show = function() {
        fill(255)
        ellipse(this.x, this.y, 32, 32)
    }

    this.up = function() {
        this.velocity += this.lift;
    }

    this.within = function(pipe1, pipe2) {
        targetPos = []
        for(var i = this.x; i < this.x + Math.floor(pipe1.calcDist(pipe2)/6); i++) {
            //postTarget(this.x, pipe1.calcCoordinate(pipe2, i), this.data_id)
            targetPos.push([this.x, pipe1.calcCoordinate(pipe2, i), this.data_id])
        }
        //postData(this.y, this.jump)
        this.data.push([this.y, targetPos, this.jump])
        //print("HO!")
        if(this.jump){
            this.jump = false;
        } 
        this.data_id++;
    }

    // Applies gravity
    this.update = function() {
        this.velocity += this.gravity;
        this.velocity *= this.airResistance;
        this.y += this.velocity;

        // If bird reaches ground
        if(this.y > height) {
            this.y = height;
            this.velocity = 0;
        }
    }

}
