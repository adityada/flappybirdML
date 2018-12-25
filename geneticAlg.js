
function nextGeneration() {

    calculateFitness();

    for(let i = 0; i < TOTAL_POPULATION; i++) {
        birds[i] = getBirdByHighestFitness();
    }
    savedBirds = []

}

function getBirdByHighestFitness() {
    var index = 0;
    var randomNum = random(1);
    while (randomNum > 0) {
        randomNum -= savedBirds[index].fitness;
        index ++;
    }
    index--;

    let bird = savedBirds[index];
    let child = new Bird(bird.brain);
    child.mutate()
    return child;
}

function calculateFitness() {
     let sum = 0;

    for(let bird of savedBirds) {
        sum += bird.score;
    }

    for(let bird of savedBirds) {
        bird.fitness = bird.score / sum;
    }
}