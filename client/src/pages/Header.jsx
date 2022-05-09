import { Outlet, Link } from "react-router-dom";
import {
	NeutralColors,
	DefaultSpacing,
	FontSizes,
	FontWeights,
} from "@fluentui/theme";
const Header=()=>{
    
    return (
    <div
                style={{
                    backgroundColor: NeutralColors.gray10,
                    padding: DefaultSpacing.l2,
                    minHeight: "100vh",
                }}
            >
                <div
				style={{
					fontSize: FontSizes.size32,
					marginBottom: DefaultSpacing.l2,
					fontWeight: FontWeights.semibold,
				}}
			>
				BreadWatch
			</div>
                
            <Outlet/>
		</div>)}


export default Header;