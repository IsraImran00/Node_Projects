#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Define the student class
class Student {
    static counter = 10000;
    id;
    name;
    coarses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.coarses = [];
        this.balance = 100;
    }
    // Method to enroll a student in a class
    enroll_coarse(coarse) {
        this.coarses.push(coarse);
    }
    //    Method to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    //  Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance: $${this.balance}`);
    }
    //  Method to display student status
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Coarses: ${this.coarses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// Defining the student manager class to amnage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    //  Method to enroll a student in a coarse
    enroll_student(student_id, coarse) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_coarse(coarse);
            console.log(`${student.name} enrolled in ${coarse} successfully.`);
        }
    }
    //  Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    //  Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    //  Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main function to run the program
async function main() {
    console.log(chalk.magentaBright("Welcome to 'ISRA IMRAN' Student Management System"));
    console.log(chalk.blueBright("-".repeat(50)));
    let student_manager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option.",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // Using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student name"
                    }
                ]);
                student_manager.add_student(chalk.yellowBright(name_input.name));
                break;
            case "Enroll Student":
                let coarse_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "coarse",
                        type: "input",
                        message: "Enter a Coarse Name"
                    }
                ]);
                student_manager.enroll_student(coarse_input.student_id, coarse_input.coarse);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.greenBright("Exiting........"));
                process.exit();
        }
    }
}
// Calling a main function
main();
