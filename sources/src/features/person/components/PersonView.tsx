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
