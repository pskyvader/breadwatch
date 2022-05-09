import { useParams,Link } from "react-router-dom";
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

import {
	FontSizes,
	FontWeights,
	Depths,
	DefaultSpacing,
	NeutralColors,
} from "@fluentui/theme";

import { Stack } from "@fluentui/react";
import {
	ButtonAddRemove,
	BREAD,
	CAKE,
	COOKIE,
} from "../components/ButtonAddRemove";
import LogStatus from "../components/LogStatus";


import { ButtonToggle, WALK } from "../components/ButtonToggle";

const stackItemStyles = {
	root: {
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
	},
};

const Home=()=>{
    let params = useParams();
    console.log(params);

    let currentDate=(params.date)?new Date(params.date+ " 00:00:00"): new Date();

    let previous= new Date(currentDate.getTime());
    previous.setDate(previous.getDate() - 1);
    let next= new Date(currentDate.getTime());
    next.setDate(next.getDate() +1);


    currentDate=currentDate.getTime();
    previous=previous.toISOString().split('T')[0];
    next=next.toISOString().split('T')[0];

			return (<div>

<Stack horizontal
				style={{
					padding: DefaultSpacing.l2,
				}} disableShrink wrap
			>
                
					<Stack.Item grow={1} styles={stackItemStyles} style={{justifyContent: "left"}} >
                    <Link to={`/date/${previous}`}>
                <DefaultButton>
                {previous}
                </DefaultButton>
                </Link>        
					</Stack.Item>
{/* 
					<Stack.Item grow={1} styles={stackItemStyles} style={{
								fontSize: FontSizes.size24,
								fontWeight: FontWeights.semibold,
							}} >
                        Current Date
                    </Stack.Item>
                
                 */}
					<Stack.Item grow={1} styles={stackItemStyles} style={{justifyContent: "right"}}>
                <Link to={`/date/${next}`}>
                <DefaultButton>
                {next}
                </DefaultButton>
                </Link>
					</Stack.Item>
</Stack>
    
    
            

            
            <LogStatus date={currentDate}>
            <ButtonAddRemove element={BREAD} />
            <ButtonAddRemove element={COOKIE} />
            <ButtonAddRemove element={CAKE} />
            <ButtonToggle element={WALK} />
        </LogStatus>

        

        </div>)
}

export default Home;