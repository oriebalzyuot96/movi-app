import React from 'react'

import Result from './Result'

//second file after search
//pass results (data )
//loop through thid data used map
function Results ({ results, openPopup }) {
	return (
		<section className="results">
			{results.map(result => (
				<Result key={result.imdbID} result={result} openPopup={openPopup} />
			))}
		</section>
	)
}

export default Results
