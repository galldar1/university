import { expect } from "chai";
import axios from "axios";
const BASE_URL = "http://localhost:3000/institutions";

// Тестування API для навчальних закладів
describe("Educational Institutions API", function () {
  // Тест для перевірки створення нового навчального закладу
  it("повинен створити новий навчальний заклад", async function () {
    const newInstitution = {
      name: "Тестовий Університет",
      address: "Київ, вулиця Тестова, 10",
    };

    const response = await axios.post(BASE_URL, newInstitution);
    expect(response.status).to.equal(201);
    expect(response.data).to.have.property("name", "Тестовий Університет");
    expect(response.data).to.have.property(
      "address",
      "Київ, вулиця Тестова, 10"
    );
  });

  // Тест для перевірки отримання всіх навчальних закладів
  it("повинен повернути список всіх навчальних закладів", async function () {
    const response = await axios.get(BASE_URL);
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("array");
  });

  // Тест для перевірки отримання навчального закладу за ID
  it("повинен повернути навчальний заклад за ID", async function () {
    // Попереднє створення навчального закладу для тесту
    const newInstitution = {
      name: "Тестовий Коледж",
      address: "Львів, вулиця Коледжна, 20",
    };

    const createResponse = await axios.post(BASE_URL, newInstitution);
    const createdId = createResponse.data.id;

    // Тестування отримання навчального закладу за ID
    const response = await axios.get(`${BASE_URL}/${createdId}`);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("name", "Тестовий Коледж");
    expect(response.data).to.have.property(
      "address",
      "Львів, вулиця Коледжна, 20"
    );
  });

  // Тест для перевірки видалення навчального закладу за ID
  it("повинен видалити навчальний заклад за ID", async function () {
    // Попереднє створення навчального закладу для тесту
    const newInstitution = {
      name: "Тестовий Технікум",
      address: "Одеса, вулиця Технічна, 30",
    };

    const createResponse = await axios.post(BASE_URL, newInstitution);
    const createdId = createResponse.data.id;

    // Тестування видалення навчального закладу
    const deleteResponse = await axios.delete(`${BASE_URL}/${createdId}`);
    expect(deleteResponse.status).to.equal(204);

    // Перевірка, що навчальний заклад дійсно видалено
    try {
      await axios.get(`${BASE_URL}/${createdId}`);
    } catch (error) {
      expect(error.response.status).to.equal(404);
    }
  });
});
