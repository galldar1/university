import express from 'express'
import {
	createInstitution,
	deleteInstitution,
	getAllInstitutions,
	getInstitutionById,
	updateInstitution,
} from '../services/institutionService.js'

const router = express.Router()

router.post('/', async (req, res) => {
	const { name, address } = req.body
	try {
		const newInstitution = await createInstitution({ name, address })
		res.status(201).json(newInstitution)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

router.get('/', async (req, res) => {
	res.json(await getAllInstitutions())
})

router.get('/:id', async (req, res) => {
	const { id } = req.params

	try {
		const institution = await getInstitutionById(id)
		res.json(institution)
	} catch (error) {
		res.status(404).json({ error: error.message })
	}
})

router.put('/:id', async (req, res) => {
	const { id } = req.params
	const { name, address, type } = req.body

	try {
		const updatedInstitution = await updateInstitution(id, {
			name,
			address,
			type,
		})
		res.json(updatedInstitution)
	} catch (error) {
		res.status(404).json({ error: error.message })
	}
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params

	try {
		await deleteInstitution(id)
		res.status(204).send()
	} catch (error) {
		res.status(404).json({ error: error.message })
	}
})

export default router
