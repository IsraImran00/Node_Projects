#! /usr/bin/env node
import inquirer from "inquirer";
let myBalance = 20000;
let myPin = 2230;
let pinAnswer = await inquirer.prompt([
    {
        name: "Pin",
        type: "number",
        message: "Enter your Pin"
    }
]);
if (pinAnswer.Pin === myPin) {
    console.log("You entered correct pin!");
    let operationAns = await inquirer.prompt([
        {
            name: "Operation",
            type: "list",
            message: "Please select option",
            choices: ["Withdraw", "Check Balance", "FastCash"]
        }
    ]);
    console.log(operationAns);
    if (operationAns.Operation === "Withdraw") {
        let amountAns = await inquirer.prompt([
            {
                name: "Amount",
                type: "number",
                message: "Select the Amount you want to withdraw",
            }
        ]);
        if (myBalance >= amountAns.Amount) {
            console.log(myBalance -= amountAns.Amount);
            console.log(`Your remaining balance is ${myBalance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    else if (operationAns.Operation === "Check Balance") {
        console.log(`Your Balance is ${myBalance}`);
    }
    else if (operationAns.Operation === "FastCash") {
        let fastCash = await inquirer.prompt([
            {
                name: "Balance",
                type: "list",
                message: "Select the amount you want to withdraw",
                choices: [5000, 10000, 15000, 20000]
            }
        ]);
        myBalance -= fastCash.Balance;
        console.log(`Your remaining balance is ${myBalance}`);
    }
}
else {
    console.log("Incorrect Pincode");
}
