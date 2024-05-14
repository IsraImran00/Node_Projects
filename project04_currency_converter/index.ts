#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.magenta.italic("\n\t Welcome to \ISRA IMRAN\ Currency-Converter-Project"));

   const currency: any = {
    USD : 1, // base currencey
    EUR : 0.91,
    GBP : 0.76,
    INR : 74.57,
    PKR : 280,
};

let userAnswer = await inquirer.prompt([
    {
name : "from",
message : chalk.red.italic("Enter from currency"),
type : "list",
choices : ["USD","EUR","GBP", "INR","PKR"],
    },
    {
name : "to",
message : chalk.red.italic("Enter to currency"),
type : "list",
choices : ["USD","EUR","GBP","INR","PKR"],
    },
    {
 name : "amount",
 message : chalk.green.bold("How much amount you want to convert"),
 type : "number",
    }
]);

 let fromAmount = currency[userAnswer.from]
 let toAmount = currency[userAnswer.to]
 let amount = userAnswer.amount
 let baseAmount = amount / fromAmount    // formula of currencey converter
 let convertedAmount = baseAmount * toAmount;
 let total = convertedAmount.toFixed(2);
 console.log(total);
