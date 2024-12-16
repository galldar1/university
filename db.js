import path from 'path'
import sqlite3 from 'sqlite3'

// Define the path to the SQLite database file
const dbFilePath = path.resolve('./database/database.sqlite')

// Connect to the SQLite database file (creates the file if it doesn't exist)
const db = new sqlite3.Database(dbFilePath, (err) => {
	if (err) {
		console.error('Error opening database:', err.message)
	} else {
		console.log('Connected to SQLite database file:', dbFilePath)
	}
})

// Create the `institutions` table if it doesn't exist
db.serialize(() => {
	db.run(
		`
        CREATE TABLE IF NOT EXISTS institutions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT NOT NULL
        )
    `,
		(err) => {
			if (err) {
				console.error('Error creating table:', err.message)
			} else {
				console.log('Institutions table ensured.')
			}
		}
	)
})

export default db
