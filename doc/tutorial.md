# React Parent-Child Components Tutorial

This tutorial shows how to build a small React + TypeScript demo where a **parent component** manages a person object and two child components:


- `ParentComponent` owns the person state
- `PersonEdit` updates that state via a callback prop
- `PersonView` displays the current values

The key focus is how data flows between parent and children:

- data down (via props)
- updates up (via callbacks)

---

## Prerequisites

- Node.js LTS
- npm
- VS Code (or any editor)

---

## 1) Create React application

Create a Vite React + TypeScript app:

```bash
npm create vite@latest parent-child-components -- --template react-ts
cd parent-child-components
npm install
```

Run it:

 ```bash
 npm run dev
 ```

### Suggested structure

Create this structure inside `src/`:

```text
src/
	features/
		person/
			components/
				ParentComponent.tsx
				ParentComponent.css
				PersonEdit.tsx
				PersonEdit.css
				PersonView.tsx
				PersonView.css
			types/
				PersonData.ts
			index.ts
```

Create the shared type:

```ts
// src/features/person/types/PersonData.ts
export type PersonData = {
	name: string
	age: number
	isStudent: boolean
}
```

---

## 2) Create parent component

`ParentComponent` owns the state using `useState` and passes values to both children.

```tsx
// src/features/person/components/ParentComponent.tsx
import { useState } from 'react'
import './ParentComponent.css'
import { type PersonData } from '../types/PersonData'
import PersonEdit from './PersonEdit'
import PersonView from './PersonView'

function ParentComponent() {
	console.log('ParentComponent rendered');

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
```

### Communication highlights

- **`useState`**: parent stores the single source of truth in `person` object.
- **Props down**: parent sends `name`, `age`, and `isStudent` to both child components.
- **Callback up**: parent gives `onPersonChange` to `PersonEdit` child so that it can request updates.

---

## 3) Create person view component

`PersonView` receives data only through component parameters (props).

```tsx
// src/features/person/components/PersonView.tsx
import './PersonView.css'

type PersonViewProps = {
	name: string
	age: number
	isStudent: boolean
}

function PersonView({ name, age, isStudent }: PersonViewProps) {
	console.log('PersonView rendered');

	return (
		<div className="PersonView">
			<h1>Person View</h1>

			<p>
				<strong>Name:</strong> {name}
			</p>

			<p>
				<strong>Age:</strong> {age}
			</p>

			<p>
				<strong>Is student:</strong> {isStudent ? 'Yes' : 'No'}
			</p>
		</div>
	)
}

export default PersonView
```

### Why this matters

- This is a display component.
- It does not own state.
- It re-renders automatically when parent props change.

---

## 4) Create person edit component

`PersonEdit` is a controlled editor: each input uses prop values and, when user changes something, it reports changes to parent.

```tsx
// src/features/person/components/PersonEdit.tsx
import { type ChangeEvent } from 'react'
import { type PersonData } from '../types/PersonData'
import './PersonEdit.css'

type PersonEditProps = {
	name: string
	age: number
	isStudent: boolean
	onPersonChange: (person: PersonData) => void
}

function PersonEdit({ name, age, isStudent, onPersonChange }: PersonEditProps) {
	console.log('PersonEdit rendered');

	function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
		onPersonChange({
			name: event.target.value,
			age,
			isStudent
		})
	}

	function handleAgeChange(event: ChangeEvent<HTMLInputElement>) {
		const nextAge = Number(event.target.value)
		onPersonChange({
			name,
			age: Number.isNaN(nextAge) ? 0 : nextAge,
			isStudent
		})
	}

	function handleIsStudentChange(event: ChangeEvent<HTMLInputElement>) {
		onPersonChange({
			name,
			age,
			isStudent: event.target.checked
		})
	}

	return (
		<div className="PersonEdit">
			<h1>Person Edit</h1>
			
			<label>
				Name:
				<input
					type="text"
					value={name}
					onChange={handleNameChange}
				/>
			</label>

			<label>
				Age:
				<input
					type="number"
					value={age}
					onChange={handleAgeChange}
				/>
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
```

### Communication highlights

- **Component params (props)**: `name`, `age`, `isStudent`, and `onPersonChange`.
- **Event handling**: each input has an `onChange` handler.
- **Upward data flow**: handlers call `onPersonChange(...)` with a full updated `PersonData` object.

---

## Wire feature into app

`index.ts` re-exports the parent as default:

```ts
// src/features/person/index.ts
export { default } from './components/ParentComponent'
export type { PersonData } from './types/PersonData'
```

`App.tsx` uses that default export:

```tsx
import './App.css'
import ParentComponent from './features/person'

function App() {
	return (
		<>
			<h1>Parent-Child Components Demo</h1>
			<ParentComponent />
		</>
	)
}

export default App
```

