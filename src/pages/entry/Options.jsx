import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";

const Options = ({ optionType }) => {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);

	// optionType is "scoops" or "toppings"
	useEffect(() => {
		axios
			.get(`http://localhost:3030/${optionType}`)
			.then((response) => setItems(response.data))
			.catch((error) => {
				setError(true);
			});
	}, [optionType]);

	if (error) {
		return <AlertBanner />;
	}

	const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
	const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

	const optionItems = items.map((item) => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
		/>
	));

	return (
		<>
		<h2>{title}</h2>
		<p>${pricePerItem[optionType]} each</p>
			<Row>{optionItems}</Row>
		</>
	);
};

export default Options;
