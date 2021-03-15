import React from 'react'
import classNames from "classnames"

const BarBody = ({ percent, type, label, direction }) => {

	const arrowDirection = classNames("bar__body_arrow__direction ", {
		"up": direction > 0,
		"down": direction < 0
	})


	return (
		<div className="bar">
			<div className={"bar__body " + type} style={{ height: percent * 4 }}>
				<label className="bar__body_label" >{label}</label>
				<div className="bar__body_arrow" >
					<div className={arrowDirection} />
					<div className="bar__body_arrow__percentage ">{direction}%</div>
				</div>
			</div>
			<div className="bar__persent">{percent}%</div>
		</div >
	)
}

export default BarBody
