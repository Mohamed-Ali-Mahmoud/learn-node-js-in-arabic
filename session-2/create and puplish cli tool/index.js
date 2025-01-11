import inquirer from "inquirer";
import { Command } from "commander";
import fs from "fs";

const program = new Command();

const questions = [
  {
    type: "input",
    name: "programming",
    message: "enter your course title",
  },
  {
    type: "number",
    name: "price",
    message: "enter your course price",
  },
];

// file path to store the courses
// مسار الملف الذي سيتم حفظ الدورات به
const filePath = "./courses.json";

// 1. Create a new command with the name "add"
program
  .name("zaker courses")
  .description("CLI to add programming courses")
  .version("1.0.0");

program
  .command("add")
  .alias("a")
  .action(() => {
    // 2. Ask Questions
    // أضافة الأسئلة التي سيتم طرحها على المستخدم
    inquirer.prompt(questions).then((answers) => {
      // 1. If The File Is Exist Read It.
      // لو الملف موجود قم بقراءة محتواه
      if (fs.existsSync(filePath)) {
        //This line reads the content of the file and returns it as a string.
        // قرائة محتوى الملف وتحويلة الى نص
        fs.readFile(filePath, "utf-8", (err, fileContent) => {
          if (err) {
            console.log(err);
            process.exit();
          }
          //console.log(fileContent);

          // 2. Update File Content With New Content

          //This line converts (parses) the string into a JavaScript object (in this case, an array).
          // تحويل النص الى كائن جافا سكربت
          const fileContentAsJson = JSON.parse(fileContent);

          // push a new content to a file
          // إضافة محتوى جديد الى الملف
          fileContentAsJson.push(answers);

          // write the new content to a file
          // كتابة المحتوى الجديد الى الملف
          fs.writeFile(
            filePath,
            JSON.stringify(fileContentAsJson),
            "utf-8",
            () => {
              console.log("File Is Updated with");
            }
          );
        });
      } else {
        //If the file does not exist, it creates the file and writes the new contnet
        // إذا لم يكن الملف موجودًا ، فإنه ينشئ الملف ويكتب المحتوى الجديد
        fs.writeFile(filePath, JSON.stringify([answers]), "utf-8", () => {
          console.log("add courses done ✅");
        });
      }
    });
  });

program
  .command("list")
  .alias("l")
  .description("All Courses")
  .action(() => {
    // read the file content
    // قراءة محتوى الملف
    fs.readFile(filePath, "utf-8", (err, content) => {
      if (err) {
        console.log(err);
        process.exit();
      }
      // convert the content to a JavaScript object and print it as a table
      // تحويل المحتوى الى كائن جافا سكربت وطباعته كجدول
      console.table(JSON.parse(content));
    });
  });

program.parse();

//node index.js add

// program
//   .name("zaker courses")
//   .description("CLI to add JavaScript courses")
//   .version("1.0.0");

// program
//   .command("add")
//   .alias("a")
//   .argument("<title>", "add course title")
//   .option("--price <price>", "add course price")
//   .action((params, option) => {
//     console.log("params, option", params, option);
//   });
// program.parse();

//  node index.js add react course --price  500

// const { argv } = require("node:process");
// // console.log("Hola");
// console.log(process.argv);

// if (process.argv[2] === "add") {
//   console.log("you are going to add " + process.argv[3]);
// }
