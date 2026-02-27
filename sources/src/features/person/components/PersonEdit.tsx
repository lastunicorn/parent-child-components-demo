import { type ChangeEvent } from 'react'
import { type PersonData } from '../types/PersonData'
import './PersonEdit.css'

type PersonEditProps = PersonData & {
	onPersonChange: (updatedPerson: PersonData) => void
}

function PersonEdit({ name, age, isStudent, onPersonChange }: PersonEditProps) {
	console.log('PersonEdit rendered');

	function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
		onPersonChange({ name: event.target.value, age, isStudent })
	}

	function handleAgeChange(event: ChangeEvent<HTMLInputElement>) {
		const nextAge = Number(event.target.value)
		onPersonChange({ name, age: Number.isNaN(nextAge) ? 0 : nextAge, isStudent })
	}

	function handleIsStudentChange(event: ChangeEvent<HTMLInputElement>) {
		onPersonChange({ name, age, isStudent: event.target.checked })
	}

	return (
		<div className="PersonEdit">
			<h1>Person Edit</h1>
			
			<label>
				Name:
				<input type="text" value={name} onChange={handleNameChange} />
			</label>

			<label>
				Age:
				<input type="number" value={age} onChange={handleAgeChange} />
			</label>

			<label className="PersonEditCheckboxLabel">
				<input
					type="checkbox"
					checked={isStudent}
					onChange={handleIsStudentChange}
				/>
				 Child is a student
			</label>
		</div>
	)
}

export default PersonEdit
