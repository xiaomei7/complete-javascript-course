// NOTE Module Pattern
/*
1. set up different modules for each functionalities
2. the modeles are separated from each other
3. use IIFE for those modules to achieve ecapsulation
4. functions inside return are public functions, others are private
5. try not to use hard code inside the program (the select tag in this case)
6. (alomot) everything should be inside functions, not scatter around
7. use initialize function
*/

// Budget Controller
let budgetController = (function () {

})();

// UI Controller
let UIController = (function () {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    }

    // public function
    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be eitehr inc or exp

                description: document.querySelector(DOMstrings.inputDescription).value,

                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();

// Global App Controller
let controller = (function (budgetCtrl, UICtrl) {

    // private
    let setupEventListeners = function () {
        let DOM = UICtrl.getDOMstrings();
        //click
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        // press enter
        document.addEventListener('keypress', function (event) {
            // which for older browser
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    let ctrlAddItem = function () {
        // 1. get the filled input data
        let input = UICtrl.getinput();
        console.log(input);
        // 2. add the item to the budge controller
        // 3. add the item to the ui
        // 4. calculate the budget
        // 5. display the budget on the ui;
    };
    
    // public
    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();
