import './App.css';
import ChartBox from './Components/ChartBox';
const nodeMap = require("./NodeMap.json")

function App() {
	return (
		<div className="App">
			<ChartBox node_data={nodeMap} />
		</div>
	);
}

export default App;
