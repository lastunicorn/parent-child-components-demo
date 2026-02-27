import { useState } from 'react'
import './ParentComponent.css'
import { type PersonData } from '../types/PersonData'
import PersonEdit from './PersonEdit'
import PersonView from './PersonView'

function ParentComponent() {
	const [person, setPerson] = useState<PersonData>({
		name: 'Alex',
		age: 10,
		isStudent: true,
	})

	function handlePersonChange(updatedPerson: PersonData) {
		setPerson(updatedPerson)
	}

	return (
		<div className="ParentComponent">
			
			<h1>Parent Component</h1>

			<PersonEdit
				name={person.name}
				age={person.age}
				isStudent={person.isStudent}
				onPersonChange={handlePersonChange}
			/>

			<PersonView
				name={person.name}
				age={person.age}
				isStudent={person.isStudent}
			/>
		</div>
	)
}

export default ParentComponent
