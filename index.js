let vm = new Vue({
    el: "#app",
    data() {
        return {
            squares: {
                first: false,
                second: false,
                third: false,
                fourth: false,
            },            
            colors: ['first', 'second', 'third', 'fourth'],
            score: 0,
            sequence: [],
            copySequence: [],
        }
    },
    
    methods: {
        addNewElementToSequence() {
            this.sequence.push(this.colors[Math.floor(Math.random() * 4)]);
            this.copySequence = this.sequence.slice();
        },

        clearColors() {
            //clear all colors
            for (color in this.squares) {
                this.squares[color] = false;
            }
        },

        newGame() {
            this.score = 0;
            this.sequence = [];
            this.nextTurn();
            
        },

        toggleColor() {
            setTimeout(function () {
                    vm.clearColors();
            }, 400)
        },

        playerChoise(value) {
            
            if (value === this.copySequence[0]) {
                this.squares[value] = true;
                setTimeout(function () {
                    vm.clearColors();
                    vm.copySequence.shift();
                    if (!vm.copySequence[0]) {
                        setTimeout(function () {
                            vm.nextTurn();                          
                        }, 500)
                        vm.score++;
                    }
                }, 300)
            } else {
                alert('Game Over... You Loose !!')
            } 
        },

        nextTurn() {
            this.addNewElementToSequence();
            this.clearColors();
            
            this.playSequence(this.copySequence[0]);
        },

        playSequence(value) {
            this.squares[value] = true;
            
            setTimeout(function () {
                vm.clearColors();
                vm.copySequence.shift();
                if (vm.copySequence[0]) {
                    setTimeout(function(){
                        vm.playSequence(vm.copySequence[0]);
                    }, 400);
                } else {
                    vm.copySequence = vm.sequence.slice();
                }
            }, 400)
        },
    }

})