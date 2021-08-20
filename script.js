class Traveler {
    constructor(name) {
        this.name = name
        this._food = 1
        this.isHealthy = true
    }

    get food() {
        return this._food
    }

    set food(value) {
        if (this.food > 0){
            this._food -= 1
        }
        else {
            this._food = 0
            this.isHealthy = false
        }
    }

    hunt() {
        this._food += 2
        return `${this.name} hunted for 2 foods, ${this.food} foods left.`
    }

    eat() {
        if (this.food > 0) {
            this.food = 1
            this.isHealthy = true
            return `${this.name} ate 1 food. ${this.food} food(s) left.`
        }
        else {
            this.food = 1
            return `${this.name} doesn't have any food to eat. ${this.name} got sick.`
        }
    }
}

class Wagon {
    constructor(capacity) {
        this.capacity = capacity
        this._passengers = []
    }

    get passengers() {
        return this._passengers
    }

    set passengers(traveler) {
        this._passengers.push(traveler)
    }

    getAvailableSeatCount() {
        return `There's ${this.capacity - this.passengers.length} seat(s) left.`
    }

    join(traveler) {
        if (this.capacity - this.passengers.length > 0) {
            this.passengers = traveler
            return `${traveler.name} joined the wagon.`
        }
        return `The wagon is full, ${traveler.name} can't join in.`
    }

    shouldQuarantine() {
        const sick = this.passengers.find(({isHealthy}) => {
            if (isHealthy === false) {
                return true
            }
            return false
        })
        return sick ? true : false
    }

    totalFood() {
        let total = 0
        for (let i = 0; i < this.passengers.length; i++) {
            total += this.passengers[i].food
        }
        return `There's a total of ${total} food(s) in the wagon.`
    }
}


// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');

console.log(`${wagon.getAvailableSeatCount()} should be 2`);

wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);

wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);

henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)

console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);
