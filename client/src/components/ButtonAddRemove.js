import { useState } from "react";

const BREAD = "Bread";
const CAKE = "Cake";
const COOKIE = "Cookie";

const ButtonAddRemove = ({ element, logs }) => {
	const [quantity, setQuantity] = useState((logs && logs[element]) || 0);
	console.log(element, logs);

	return (
		<div className="btn-group">
			<div className="button-add">
				<button
					className="button-add__button"
					onClick={() => setQuantity(quantity + 1)}
				>
					<span className="button-add__icon">
						<i className="fas fa-plus"></i>
					</span>
					<span className="button-add__text">add {element}</span>
				</button>
			</div>
			<div>
				<div className="quantity">{quantity}</div>
			</div>
			<div className="button-remove">
				<button
					className="button-remove__button"
					onClick={() => setQuantity(quantity - 1)}
				>
					<span className="button-remove__icon">
						<i className="fas fa-minus"></i>
					</span>
					<span className="button-remove__text">
						remove {element}
					</span>
				</button>
			</div>
		</div>
	);
};

export { ButtonAddRemove, BREAD, CAKE, COOKIE };
