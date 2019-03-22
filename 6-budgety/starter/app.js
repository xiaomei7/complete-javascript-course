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

// build a structure before coding!

// Budget Controller
let budgetController = (function () {
    // Capital letter for function constructor 
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    // one function only have one purpose
    Expense.prototype.calculatePercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    // function constructor
    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let calculateTotal = function (type) {
        let sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });

        // the properties inside an object can be accessed by dot notation or brackets notation 
        data.totals[type] = sum;
    };

    // create an object 
    let data = {
        allItems: {
            expense: [], // array
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: -1
    };

    // public functions inside return; otherwise private function
    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            if (data.allItems[type].length > 0) {
                // create a new id based on the id of the last element in the array
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            // create entry based on the type
            if (type === "expense") {
                newItem = new Expense(ID, des, val);
            } else {
                newItem = new Income(ID, des, val);
            }

            // put the entry inside data according to type
            data.allItems[type].push(newItem);

            return newItem;
        },

        deleteItem: function (type, id) {
            let ids, index;

            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {
            // 1. calculate total income and expenses
            calculateTotal('income');
            calculateTotal('expense');

            // 2. caulculate budget = income - expenses
            data.budget = data.totals.income - data.totals.expense;

            // 3. calculate the percentage of the income that we spent
            if (data.totals.income > 0) {
                data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
            }
        },

        calculatePercentages: function () {
            data.allItems.expense.forEach(function (cur) {
                cur.calculatePercentage(data.totals.income);
            });
        },

        getPercentages: function () {
            let allPerc = data.allItems.expense.map(cur => cur.getPercentage());
            return allPerc;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totalExpense: data.totals.expense,
                percentage: data.percentage
            };
        },

        testing: function () {
            console.log(data);
        }
    }

})();

// UI Controller
let UIController = (function () {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    let formatNumber = function (num, type) {
        // + or - before the number
        // 2 decimal points
        // comma separates the thousands

        let numSplit, int, dec, sign, numLen;

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');

        int = numSplit[0];
        
        numLen = int.length;
        
        for (let i = 0; i < Math.floor(numLen / 3.0); i++) {
            int = int.substr(0, numLen - (i + 1) * 3) + ',' + int.substr(numLen - (i + 1) * 3);
        }

        dec = numSplit[1];

        type === 'expense' ? sign = '-' : sign = '+';

        return sign + ' ' + int + '.' + dec;
    };

    let nodeListForEach = function (list, callback) {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    // public function
    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be eitehr income or expense

                description: document.querySelector(DOMstrings.inputDescription).value,

                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // create html string with placeholder text
            if (type === 'income') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            } else {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }

            // replace placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // insert html with DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorId) {
            let el = document.getElementById(selectorId);
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            let fields, fieldsArr;

            // NOTE NodeList objects are collections of nodes, usually returned by properties such as Node.childNodes and methods such as document.querySelectorAll().
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue); // NodeList

            fieldsArr = Array.prototype.slice.call(fields); // turn list into array?

            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            let type;
            obj.budget > 0 ? type = 'income' : type = 'expense';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'income');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExpense, 'expense');


            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function (percentages) {
            let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            /*
                 let nodeListForEach = function (list, callback) {
                    for (let i = 0; i < list.length; i++) {
                        callback(list[i], i);
                    }
                };
            */

            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayDate: function () {
            let now, year, month, months;
            now = new Date();

            months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            year = now.getFullYear();
            month = months[now.getMonth()];

            document.querySelector(DOMstrings.dateLabel).textContent = month + ', ' + year;
        },

        changeType: function () {
            let fields = document.querySelectorAll(
                DOMstrings.inputType + ', ' +
                DOMstrings.inputDescription + ', ' +
                DOMstrings.inputValue
            );

            /* 
                In Javascript you can pass less or even more arguments to the function.
                If you pass less arguments then the value of the rest of arguments will be set to undefined .
                If you pass more arguments than you define, you can access them by arguments object. 
            */

            /*
                 let nodeListForEach = function (list, callback) {
                    for (let i = 0; i < list.length; i++) {
                        callback(list[i], i);
                    }
                };
            */
            nodeListForEach(fields, function (cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
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
            // which: for older browser
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };

    let updateBudget = function () {
        // 1. calculate the budget
        budgetCtrl.calculateBudget();

        // 2. return the budget
        let budget = budgetCtrl.getBudget();

        // 3. display the budget on the ui;
        UICtrl.displayBudget(budget);
    };

    let updatePercentages = function () {
        // 1. calculate percentage
        budgetCtrl.calculatePercentages();

        // 2. read percentages from budget controller
        let percentages = budgetCtrl.getPercentages();

        // 3. update ui with new percentages
        UICtrl.displayPercentages(percentages);
    }

    let ctrlAddItem = function () {
        let input, newItem;
        // 1. get the filled input data
        input = UICtrl.getinput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. add the item to the budge controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. add the item to the ui
            UICtrl.addListItem(newItem, input.type);

            // 3.1 clear the fields
            UICtrl.clearFields();

            // 4. calculate and update budget
            updateBudget();

            // 5. calculate and update percentages 
            updatePercentages();
        }
    };

    let ctrlDeleteItem = function (event) {
        let itemID, splitID, type, id;

        // event delegation 
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-'); // array
            type = splitID[0];
            id = parseInt(splitID[1]);

            // 1. delete the item from data structure
            budgetCtrl.deleteItem(type, id);

            // 2. delete the item from user interface
            UICtrl.deleteListItem(itemID);

            // 3. update new budget
            updateBudget();
        }
    };

    // public
    return {
        init: function () {
            console.log('Application has started.');

            UICtrl.displayDate();

            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpense: 0,
                percentage: -1
            });

            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();
