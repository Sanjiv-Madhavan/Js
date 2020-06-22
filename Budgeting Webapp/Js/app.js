// 3 functions i came across
// map - use it to alter Elements of array on a Condition
// reduce - use it to sum up elements, it has previous and current values as parameters
// filter - use it to find the element for which the callback returned true


class UI {
    constructor() {
        this.budget_amount = document.getElementById("budget-amount");
        this.expenses_amount = document.getElementById("expenses-amount");
        this.balance_amount = document.getElementById("balance-amount");
        this.budget_amount_dollar = document.getElementById("budget-amount-dollar");
        this.expenses_amount_dollar = document.getElementById("expenses-amount-dollar");
        this.balance_amount_dollar = document.getElementById("balance-amount-dollar");
        this.budget_input = document.getElementById("budget");
        this.expense_name = document.getElementById("expense-name");
        this.expense_amount = document.getElementById("expense-amount");
        // this.expenses_value = document.getElementById("expenses-value");
        this.expenses_title_header = document.getElementById("expenses-title-header");
        this.budgetForm = document.getElementById("budget-form");
        this.expensesForm = document.getElementById("expenses-form");
        this.budgetFeedback = document.getElementById("budget-feedback");
        this.expensesFeedback = document.getElementById("expenses-feedback");
        this.expensesList = document.getElementById("expenses-list");
        this.itemList = [];
        this.itemID = 0;
    }
    budgetFormSubmit()
    {
        //why am I using this keyword 
        const value = this.budget_input.value;
        // console.log(this);
        // console.log("break");
        /*const obj = this;
        //this key is undefined inside a function nested inside a function
        /*function vanilla()
        {
            console.log(obj);
            console.log("break");
        }
        vanilla();*/
        if(value == '' || value < 0)
        {
            this.budgetFeedback.classList.add('showItem');
            this.budgetFeedback.innerHTML = '<p>Budget can\'t be empty or negative</p>';
            const self = this;
            //console.log(this);
            setTimeout(function(){
                //console.log(this);
                //console.log(self);
                self.budgetFeedback.classList.remove('showItem');
                self.budgetFeedback.innerHTML = "";
            }, 4000);
        }
        else
        {
            let val = parseFloat(value);
            this.budget_amount.textContent = val;
            this.budget_input.value = '';
            this.showBalance();
        }
    }

    showBalance() {
        let expenses = this.calculateTotalExpenses();
        const total = parseInt(this.budget_amount.textContent)  - expenses;
        this.balance_amount.textContent = total;
        if(total < 0)
        {
            this.balance_amount_dollar.style.color = "red";
            this.balance_amount.style.color = "red";
        }
        else if(total > 0)
        {
            this.balance_amount_dollar.style.color = "green";
            this.balance_amount.style.color = "green";
        }
        else if(total == 0)
        {
            this.balance_amount_dollar.style.color = "black";
            this.balance_amount.style.color = "black";
        }
    }

    calculateTotalExpenses()
    {
        let total = 0;
        if(this.itemList.length > 0)
        {
            total = this.itemList.reduce(function(acc, curr){
                // console.log(`total is ${acc} and curr is ${curr.amount}`);
                acc += curr.amount;
                return acc;
            },0);
        }
        this.expenses_amount.textContent = total;
        return total;
    }

    expensesFormSubmit()
    {
        const name = this.expense_name.value;
        const value = this.expense_amount.value;
        if(name == '' || value < 0 || value == '')
        {
            this.expensesFeedback.classList.add('showItem');
            this.expensesFeedback.innerHTML = '<p>Enter a valid input</p>'
            const self = this;
            setTimeout(function(){
                self.expensesFeedback.classList.remove('showItem');
                self.expensesFeedback.innerHTML = '';
            }, 4000)
        }
        else{
            //if i dont parse this as int...my total expenses is added as a string!
            let val = parseFloat(value);
            this.expense_name.value = '';
            this.expense_amount.value = '';
            let expenseItem = {
                id:this.itemID,
                title:name,
                amount:val,
            };
            this.itemID++;
            this.itemList.push(expenseItem);
            this.addExpense(expenseItem);
            // console.log(expenseItem);
        }
    }

    addExpense(expenseItem)
    {
        const div = document.createElement("div");
        div.classList.add("expense");
        div.innerHTML = 
        `
        <div class="expenses-summary">
        <div class="expenses-summary-item">
                    <h5 class="list-item">
                        ${expenseItem.title}
                    </h5>
                    <h5 class="list-item">
                        ${expenseItem.amount}
                    </h5>
                    
                    <a href="#" class="icons-edit" data-id="${expenseItem.id}">
                        <i class='far fa-edit' style='font-size:18px'></i>
                    </a>    
                    <a href="#" class="icons-trash" data-id="${expenseItem.id}">
                        <i class='far fa-trash-alt' style='font-size:18px'></i>
                    </a> 
        </div>
        </div>
        `;
        this.expensesList.appendChild(div);
        this.showBalance();
    }

    editExpense(event)
    {
        let id = parseInt(event.dataset.id);
        let parent = event.parentElement;
        // console.log(parent);
        parent.innerHTML = '';
        let expense_edited = this.itemList.filter(function(item){
            return item.id == id;
        });
        // we need [0] index since its an object array
       this.expense_name.value = expense_edited[0].title;
       this.expense_amount.value = expense_edited[0].amount;
        // console.log(expense_edited);    
        let expenses_remaining = this.itemList.filter(function(item){
            return item.id != id;
        });

        this.itemList = expenses_remaining;
        console.log(this.itemList);
        
        this.showBalance();
    }

    deleteExpense(event)
    {
        let id = parseInt(event.dataset.id);
        let parent = event.parentElement;
        // console.log(parent);
        parent.innerHTML = '';

        let expenses_remaining = this.itemList.filter(function(item){
            return item.id != id;
        });

        this.itemList = expenses_remaining;
        this.showBalance();
    }

}


function eventlisteners()
{
    var script = document.createElement("script"); 
    script.src = "https://kit.fontawesome.com/a076d05399.js";
    document.head.appendChild(script);
    const budgetForm = document.getElementById("budget-form");
    const expensesForm = document.getElementById("expenses-form");
    // const expenses_value = document.getElementById("expenses-value");
    this.expensesList = document.getElementById("expenses-list");

    const ui = new UI()

    budgetForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.budgetFormSubmit();
    })

    expensesForm.addEventListener('submit', function(){
        event.preventDefault();
        ui.expensesFormSubmit();
    })

    expensesList.addEventListener('click', function(event){
        // console.log(event.target);
        if(event.target.parentElement.classList.contains("icons-edit"))
        {
            ui.editExpense(event.target.parentElement);
        }
        else if(event.target.parentElement.classList.contains("icons-trash"))
        {
            ui.deleteExpense(event.target.parentElement);
        }
    })
}


document.addEventListener('DOMContentLoaded', function(){
    eventlisteners();
})