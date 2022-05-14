import { Outlet, Link } from "react-router-dom";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import {
	NeutralColors,
	DefaultSpacing,
	FontSizes,
	FontWeights,
} from "@fluentui/theme";
const Header = () => {
	return (
		<div
			style={{
				backgroundColor: NeutralColors.gray10,
				padding: DefaultSpacing.l2,
				marginBottom: DefaultSpacing.l2,
				minHeight: "100vh",
			}}
		>
			<div
				style={{
					fontSize: FontSizes.size32,
					fontWeight: FontWeights.semibold,
					marginBottom: DefaultSpacing.l1,
				}}
			>
				BreadWatch
			</div>
			<Link
				to={`/stats/`}
				style={{
					paddingRight: DefaultSpacing.l2,
				}}
			>
				<PrimaryButton>Stats</PrimaryButton>
			</Link>
			<Link to={`/`}>
				<DefaultButton>Today</DefaultButton>
			</Link>

			<Outlet />
		</div>
	);
};

export default Header;
