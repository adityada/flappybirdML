class Bird {
    constructor(brain) {
        this.y = height/2;
        this.x = width/4;
    
        this.gravity = 0.8;
        this.lift = -25;
        this.velocity = 0;
        this.airResistance = 0.9;
        this.jump = false;
    
        this.score = 0;
        this.fitness = 0;
        if(!brain) {
            this.brain = new NeuralNetwork(4, 4, 2);
        } else {
            this.brain = brain.copy();
        }
    }


    show() {
        fill(255, 50)
        stroke(255)
        ellipse(this.x, this.y, 32, 32)
    }

    up() {
        this.velocity += this.lift;
    }

    within(pipe1, pipe2) {
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

    think(pipes) {
        let inputs = [];

        // Find the closest pipe
        let closest = null;
        let closestD = Infinity;
        for(let i = 0; i < pipes.length; i++) {
            let d = pipes[i].x - this.x;
            if(d < closestD && d > 0) {
                closest = pipes[i]
                closestD = d;
            }
        }
        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;

        let outputs = this.brain.predict(inputs);
        if(outputs[0] > outputs[1]) {
            this.up();
        }
    }

    mutate() {
        this.brain.copy();
    }

    // Applies gravity
    update() {
        this.score++;

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
