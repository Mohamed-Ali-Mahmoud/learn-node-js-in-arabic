import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
const program = new Command();

// Add Questions
const quetsions = [{}];
// file path to store the courses
const filePath = "./courses.json";

// Add Command and Alias and Action and Questions
program.name("zaker").description("Add Courses").version("1.0.0");

program
  .command("add")
  .alias("a")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "Language",
          message: "What Your Favourit Language",
        },
        {
          type: "number",
          name: "Price",
          message: "What Your Favourit Price",
        },
      ])
      .then((answers) => {
        // if file is exist read it
        if (fs.existsSync(filePath)) {
          fs.readFile(filePath, "utf-8", (err, fileContent) => {
            if (err) {
              console.log(err);
              process.exit();
            }
            console.log(fileContent);
            // update file content with new content
            const fileContentAsJson = JSON.parse(fileContent);
            fileContentAsJson.push(answers);
            // read the new content to a file
            fs.writeFile(
              filePath,
              JSON.stringify(fileContentAsJson),
              "utf-8",
              () => {
                console.log("The File Is Updated");
              }
            );
          });
        } else {
          // if the file does not exist, it creates the file and writes the new content
          fs.writeFile(filePath, JSON.stringify([answers]), "utf-8", () => {
            console.log("You Are Going To Add a New Course");
          });
        }
      });
  });

program.parse();
