const budgetForm_form = document.querySelector(".budget-form");
const budgetMainInput_input = document.querySelector(".budgetMain-input");
const expenseForm_form = document.querySelector(".expense-form");
const expenseMainInput_input = document.querySelector(".expensesInput");
const budgetAmount = document.querySelector(".budget-amount");
const itemsMainInput_input = document.querySelector(".itemsMain-input");
let expenseItem_input = document.querySelectorAll(".expensesitem");
const budget2Inner_div = document.querySelector(".budget-2inner");
const budgetTopContentAmount_h1 = document.querySelector(
  ".budgetTopContent-amount"
);
const cautionDiv_div = document.querySelector(".cautionDiv");
const font_font = document.querySelector("font");
const helpSign2_h1 = document.querySelector(".helpSign2");

const ol = document.createElement("ol");

budgetMainInput_input.focus();

const expenseArray = [];

let mainAlertMsg = false;

let originalBudgetValue = 0;

let tempbudget = 0;

let isEditMode = false;

let expenseId = 0;

let currentExpenses;

let fonts;

let allExpenseData;
//<Functions Container>

const handleMouse = () => {
  helpSign2_h1.style.display = "block";
};

const handleMouseOut = () => {
  helpSign2_h1.style.display = "none";
};

const maxValue = (value) => {
  if (value.length > 17) {
    return false;
  }
  return true;
};

const display_budget = (input, tempbudget, originalBudgetValue) => {
  if (budgetMainInput_input.value === "") {
    alert("enter budget");
  } else {
    00;
    budgetAmount.textContent = `$${input}.00`;
    expenseMainInput_input.focus();
  }

  let halfOfTempbudget = originalBudgetValue / 2;
  let one10thofTempbudget = originalBudgetValue / 10;
  if (tempbudget <= halfOfTempbudget) {
    budgetAmount.classList.add("budgetTopContent-amount2nd");
  } else {
    budgetAmount.classList.remove("budgetTopContent-amount2nd");
  }

  if (tempbudget <= one10thofTempbudget) {
    budgetAmount.classList.add("budgetTopContent-amount3rd");
  } else {
    budgetAmount.classList.remove("budgetTopContent-amount3rd");
  }
};

// const handleEdit = (currentExpenses) => {};

const handleDelete = (id, expensesList_li, editmode) => {
  if (!isEditMode) {
    const index = expenseArray.findIndex((expense) => {
      if (`${expense.id}`.trim() === `${id}`.trim()) {
        return true;
      }

      return false;
    });

    ol.removeChild(expensesList_li);
    currentExpenses = expenseArray[index];

    // expenseItem_input.value = 000;

    if (editmode && !isEditMode) {
      expenseMainInput_input.value = Number(currentExpenses.amount);
      itemsMainInput_input.value = currentExpenses.items;
      isEditMode = true;
    }

    fonts = expensesList_li.children[0].childNodes[5];

    expenseArray.splice(index, 1);

    tempbudget += Number(currentExpenses.amount);
    display_budget(tempbudget, tempbudget, originalBudgetValue);

    // return currentExpenses;
  }
};

const handleExpenses = (event) => {
  event.preventDefault();

  let altMsg;

  //   if (!budgetMainInput_input.value) {
  //     alert("enter budget");
  //   }

  expenseItem_input.forEach((expenses) => {
    let expensesInput = expenses.value;
    if (!expensesInput) {
      let name = expenses.name;
      altMsg = "enter " + name;
    } else if (expensesInput && !altMsg) {
      altMsg = false;
    }
  });

  mainAlertMsg = altMsg;

  if (!originalBudgetValue) {
    mainAlertMsg = "enter budget";
  }

  if (mainAlertMsg) {
    alert(mainAlertMsg);
  } else {
    allExpenseData = {
      id: expenseId,
      amount: expenseMainInput_input.value,
      items: itemsMainInput_input.value,
    };

    let handleMaxValue = maxValue(allExpenseData.items);
    if (!handleMaxValue) {
      cautionDiv_div.classList.add("cautionDiv2");

      setTimeout(
        (handleCautionAlert = () => {
          cautionDiv_div.classList.remove("cautionDiv2");
        }),
        4000
      );
    } else {
      expenseId += 1;

      expenseArray.push(allExpenseData);
      expenseMainInput_input.value = "";
      itemsMainInput_input.value = "";

      let result = 0;

      let data = "";

      const handleExpense = (expensedata) => {
        result = result + Number(expensedata.amount);

        data += `       <li class="expenses-list" data-id= "${expensedata.id}">
                  <div class="expenses-list-inner">
                    <section class="expenses-item">
                      <p>${expensedata.items}</p>
                    </section>
                    <section class="expenses">
                      <h2>${expensedata.amount}</h2>
                    </section>
                    <section class="expenses-fonts">
                      <div>
                        <span class="font-trash font"
                          ><i class="fa trash fa-trash"></i
                        ></span>
                        <span class="font-edit font">
                          <i class="fa edit fa-edit"></i
                        ></span>
                      </div>
                    </section>
                  </div>
                </li>`;

        ol.innerHTML = data;

        budget2Inner_div.appendChild(ol);

        budgetTopContentAmount_h1.textContent = "your remaining budget amount";

        tempbudget = originalBudgetValue - result;

        display_budget(tempbudget, tempbudget, originalBudgetValue);

        const expensesList_li = document.querySelectorAll(".expenses-list");

        expensesList_li.forEach((expenseList) => {
          expenseList.addEventListener("click", ({ target }) => {
            let id = expenseList.dataset.id;
            if (target.classList.contains("trash")) {
              handleDelete(id, expenseList, false);
            } else if (target.classList.contains("edit")) {
              handleDelete(id, expenseList, true);
              if (isEditMode) {
                const fonts = document.querySelectorAll(".font");

                fonts.forEach((Mainfonts) => {
                  Mainfonts.classList.add("fontOne");
                });
              }
            }
          });
        });
      };

      isEditMode = false;

      expenseArray.forEach(handleExpense);
    }
  }
};

//</Functions Container>

budgetForm_form.addEventListener("submit", (event) => {
  event.preventDefault();

  originalBudgetValue = budgetMainInput_input.value;
  display_budget(originalBudgetValue);
});

expenseForm_form.addEventListener("submit", (event) => {
  handleExpenses(event);
});
