import React, { forwardRef, useEffect, useRef, useState } from 'react'
import BarBody from './BarBody'
import { useChildren } from './../Hooks/useChildren';
import { bounceIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const Dropdown = forwardRef(({ options, handler }, ref) => {
	return (
		<div ref={ref} className="node-dropdown">
			{
				options.map((item, index) => <p key={item} onClick={(e) => handler(e.target.innerText)}>{item}</p>)
			}
		</div>
	)
})


const ChartBox = ({ node_data }) => {

	const [options, setOptions] = useState([]);
	const [chosenNode, setChosenNode] = useState(options[0]);

	const dropdown = useRef(null)

	const getOptions = (object) => setOptions(Object.keys(object))

	const dropdownOpen = () => dropdown.current.classList.toggle("active")

	const dropdownHandler = (node) => setChosenNode(node)

	const chartTree = useChildren(node_data, chosenNode)

	const styles = {
		bounce: {
			animation: 'x 0.5s',
			animationName: Radium.keyframes(bounceIn, 'bounce')
		}
	}

	useEffect(() => {
		getOptions(node_data)
	}, [node_data])


	return (
		<div className="chart-box">

			<section className="chart-box__title">
				<div className="chart-box__title_column">
					<div className="chart-box__title_name">Flow dropout per step and service</div>
					<div className="chart-box__title_info" />
				</div>
				<div className="chart-box__title_column">
					<button className="chart-box__title_branch" onClick={dropdownOpen}>
						{chosenNode ?? "Choose branches"}
						<Dropdown options={options} handler={dropdownHandler} ref={dropdown} />
					</button>
					<button className="chart-box__title_settings"></button>
				</div>
			</section>
			<section className="chart-box__body">
				{
					chosenNode ?
						chartTree.map((node, index) => <StyleRoot key={index}>
							<div style={styles.bounce} key={node.label}>
								<BarBody
									percent={node.value}
									type={node.type.toLowerCase()}
									label={node.label}
									direction={-25.4}
								/>
							</div>
						</StyleRoot>)
						: "No chosen nodes"
				}
			</section>

		</div>
	)
}

export default ChartBox
