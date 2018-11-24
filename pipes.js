function Pipe() {
    this.top = random(height/2);
    this.bottom = random(height/2);
    this.lineSlope;
    this.b;

    if(this.top < height/3) {
        this.top = height/3;
    } else if (this.top > height/3 - height/8) {
        this.top = height/3 - height/8;
    }
    if(this.bottom < height/4) {
        this.bottom = height/4;
    } else if(this.bottom >height/2 - height/6) {
        this.bottom = height/2 - height/6;
    }
    this.x = width;
    this.width = 40;
    this.speed = 3;
    this.pipeTarget = ((height-this.bottom) + this.top)/2

    this.show = function() {
        fill(255);
        rect(this.x, 0, this.width, this.top)
        rect(this.x, height - this.bottom, this.width, this.bottom )
        ellipse(this.x + this.width/2, this.pipeTarget, 10, 10)
    }

    this.update = function() {
        this.x -= this.speed;
    }
    this.offscreen = function() {
        return this.x < -this.width*5;
    }
    this.hits = function(bird) {
        if(bird.y < this.top || bird.y > height - this.bottom) {
            if(bird.x > this.x && bird.x < this.x + this.width) {
                return true;
            }
        }
        return false;
    }
    this.lineConnect = function(pipe) {
        stroke(255);
        line(this.x + this.width/2, this.pipeTarget, pipe.x + pipe.width/2, pipe.pipeTarget)
    }

    this.calcDist = function(pipe) {
        return Math.sqrt(((pipe.x + pipe.width/2) - (this.x + this.width/2))**2 + ((pipe.pipeTarget) - (this.pipeTarget)))
    }

    this.calcCoordinate = function(pipe, xCor) {
        this.lineSlope = ((pipe.pipeTarget - this.pipeTarget) / (pipe.x + pipe.width/2 - this.x + this.width/2))
        this.b = this.pipeTarget - (this.lineSlope*(this.x+this.width/2))
        return (this.lineSlope * xCor) + this.b
    } 
}