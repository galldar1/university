import db from '../database/db.js'  
import axios from 'axios'

export const createInstitution = (data) => {  
	// Функція для створення нового навчального закладу.
	const { name, address } = data  
	// Деструктуруємо дані для отримання імені та адреси.

	return new Promise((resolve, reject) => {  
		// Повертаємо проміс для асинхронного виконання.
		const query = `INSERT INTO institutions (name, address) VALUES (?, ?)`  
		// SQL-запит для вставки нового запису в таблицю "institutions".
		db.run(query, [name, address], function (err) {  
			// Виконуємо запит до бази даних.
			if (err) return reject(err)  
			// У разі помилки відхиляємо проміс.
			resolve({ id: this.lastID, name, address })  
			// Якщо запит успішний, повертаємо новостворений запис із його ID.
		})
	})
}

export const getAllInstitutions = async () => {  
	// Функція для отримання всіх навчальних закладів.
	
		

// SPARQL-запит
const query = `
  SELECT ?university ?universityLabel ?address ?website WHERE {
    ?university wdt:P31 wd:Q3918;        # тип - університет
               wdt:P131 wd:Q1899;        # Київ
               wdt:P17 wd:Q212.          # Україна
               
    OPTIONAL { ?university wdt:P6375 ?address. } # Адреса (якщо є)
    OPTIONAL { ?university wdt:P856 ?website. }  # Офіційний сайт (якщо є)

    SERVICE wikibase:label { bd:serviceParam wikibase:language "uk,en". }
  }
  ORDER BY ?universityLabel
`;

// URL сервісу запитів Wikidata
const endpointUrl = 'https://query.wikidata.org/sparql';

// Функція для виконання запиту
const fetchUniversitiesInKyiv = async () => {
  try {
    const response = await axios.get(endpointUrl, {
      headers: {
        'Accept': 'application/json' // Повернення даних у форматі JSON
      },
      params: {
        query: query
      }
    });

    const results = response.data.results.bindings;

    // Вивід університетів

      return results;
  } catch (error) {
    console.error('Помилка при виконанні запиту:', error);
  }
};

// Виконання функції
return await fetchUniversitiesInKyiv();

	
}

export const getInstitutionById = (id) => {  
	// Функція для отримання навчального закладу за ID.
	return new Promise((resolve, reject) => {  
		// Повертаємо проміс для асинхронного виконання.
		const query = `SELECT * FROM institutions WHERE id = ?`  
		// SQL-запит для отримання запису за ID.
		db.get(query, [id], (err, row) => {  
			// Виконуємо запит до бази даних.
			if (err) return reject(err)  
			// У разі помилки відхиляємо проміс.
			if (!row) return reject(new Error('Institution not found'))  
			// Якщо запис не знайдено, повертаємо відповідну помилку.
			resolve(row)  
			// Повертаємо знайдений запис.
		})
	})
}

export const updateInstitution = (id, updates) => {  
	// Функція для оновлення даних навчального закладу за ID.
	return new Promise((resolve, reject) => {  
		// Повертаємо проміс для асинхронного виконання.
		const { name, address, type } = updates  
		// Деструктуруємо дані для оновлення.
		const query = `
            UPDATE institutions
            SET name = ?, address = ?, type = ?
            WHERE id = ?
        `  
		// SQL-запит для оновлення запису за ID.
		db.run(query, [name, address, type, id], function (err) {  
			// Виконуємо запит до бази даних.
			if (err) return reject(err)  
			// У разі помилки відхиляємо проміс.
			if (this.changes === 0) return reject(new Error('Institution not found'))  
			// Якщо запис для оновлення не знайдено, повертаємо помилку.
			resolve({ id, name, address, type })  
			// Повертаємо оновлений запис.
		})
	})
}

export const deleteInstitution = (id) => {  
	// Функція для видалення навчального закладу за ID.
	return new Promise((resolve, reject) => {  
		// Повертаємо проміс для асинхронного виконання.
		const query = `DELETE FROM institutions WHERE id = ?`  
		// SQL-запит для видалення запису за ID.
		db.run(query, [id], function (err) {  
			// Виконуємо запит до бази даних.
			if (err) return reject(err)  
			// У разі помилки відхиляємо проміс.
			if (this.changes === 0) return reject(new Error('Institution not found'))  
			// Якщо запис для видалення не знайдено, повертаємо помилку.
			resolve()  
			
		})
	})
}
