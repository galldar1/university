import axios from "axios";
import inquirer from "inquirer";

// Базовий URL для вашого API
const BASE_URL = "http://localhost:3000/institutions";

// Функція для створення нового навчального закладу
// Асинхронна функція для створення нового навчального закладу
async function createInstitution() {
  try {
    // Запит користувача на введення назви та адреси навчального закладу
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Введіть назву навчального закладу:",
      },
      {
        type: "input",
        name: "address",
        message: "Введіть адресу навчального закладу:",
      },
    ]);

    // Надсилання POST запиту з даними користувача для створення нового закладу
    const response = await axios.post(BASE_URL, answers);

    // Виведення відповіді після успішного створення навчального закладу
    console.log("Навчальний заклад створено:", response.data);
  } catch (error) {
    // Ловимо та виводимо помилку, якщо сталася помилка при створенні
    console.error("Помилка при створенні навчального закладу:", error.message);
  }
}

// Функція для отримання всіх навчальних закладів
async function getAllInstitutions() {
  try {
    const response = await axios.get(BASE_URL);
    console.log("Список навчальних закладів:");
    response.data.forEach((institution, index) => {
      console.log(
        `№ ${index + 1}:  Назва: ${
          institution.universityLabel.value
        }, Адрес: ${institution.website?.value ?? 'Відсутня адреса'}`
      );
    });

    console.log();
  } catch (error) {
    console.error(
      "Помилка при отриманні списку навчальних закладів:",
      error.message
    );
  }
}

// Функція для отримання навчального закладу за ID
async function getInstitutionById() {
  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Введіть ID навчального закладу:",
      },
    ]);

    const response = await axios.get(`${BASE_URL}/${answer.id}`);
    console.log("Інформація про навчальний заклад:", response.data);
  } catch (error) {
    console.error(
      "Помилка при отриманні інформації про навчальний заклад:",
      error.message
    );
  }
}

// Функція для видалення навчального закладу
async function deleteInstitution() {
  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Введіть ID навчального закладу, який потрібно видалити:",
      },
    ]);

    await axios.delete(`${BASE_URL}/${answer.id}`);
    console.log("Навчальний заклад видалено");
  } catch (error) {
    console.error("Помилка при видаленні навчального закладу:", error.message);
  }
}

// Функція для виводу меню і обробки вибору
async function showMenu() {
  const choices = [
    "Додати навчальний заклад",
    "Видалити навчальний заклад",
    "Отримати всі навчальні заклади",
    "Знайти навчальний заклад за ID",
    "Вийти",
  ];

  let exit = false;

  while (!exit) {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Оберіть дію:",
        choices: choices,
      },
    ]);

    switch (answer.action) {
      case "Додати навчальний заклад":
        await createInstitution();
        break;
      case "Видалити навчальний заклад":
        await deleteInstitution();
        break;
      case "Отримати всі навчальні заклади":
        await getAllInstitutions();
        break;
      case "Знайти навчальний заклад за ID":
        await getInstitutionById();
        break;
      case "Вийти":
        exit = true;
        console.log("Вихід з програми...");
        break;
      default:
        console.log("Невідома дія");
    }
  }
}

// Запуск меню
showMenu();
