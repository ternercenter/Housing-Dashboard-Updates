assumptions = {
	"Equity": 0.35, // Assumes 35% equity, 65% loan
	"Retail": -15, // Construction cost per square foot over residential costs for retail
	"RetailTI": 100, // Retail TI and lease up costs
	"Parking": 120, // Assumes podium as base cost
	"Expense": { // Expense rates are different for different products
		"For Rent": 0.035,
		"For Sale": 0.055
	},
	"Finishes": 0.05, // Condo finish premium
	"Contingency": 1.1, // Hard cost contingency
	"perSpace": 350, // Square feet needed per parking space
	"constTime": 18, // Assume 18 months construction time as base time
	"addConstHeight":{1:1,2:1,3:1,4:1,5:1,6:1.03,7:1.25,8:1.25,9:1.3,10:1.31,11:1.32,12:1.33,13:1.34,14:1.35,15:1.36,16:1.37,17:1.38,18:1.39,19:1.4,20:1.41,21:1.42,22:1.43,23:1.44,24:1.45,25:1.46,26:1.47,27:1.48,28:1.49,29:1.5,30:1.51,31:1.52,32:1.53,33:1.54,34:1.55,35:1.56,36:1.57,37:1.58,38:1.59,39:1.6,40:1.61,41:1.62,42:1.63,43:1.64,44:1.65,45:1.66,46:1.67,47:1.68,48:1.69,49:1.7,50:1.71,51:1.72,52:1.73,53:1.74,54:1.75,55:1.76,56:1.77,57:1.78,58:1.79,59:1.8,60:1.81,61:1.82,62:1.83,63:1.84,64:1.85,65:1.86,66:1.87,67:1.88,68:1.89,69:1.9,70:1.91},
	"addConstEff":{1:0.27,2:0.22,3:0.05,4:0.05,5:0.05,6:0.06,7:0.07,8:0.07,9:0.07,10:0.06,11:0.05,12:0.04,13:0.03,14:0.02,15:0.01,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0,24:0,25:0,26:0,27:0,28:0,29:0,30:0,31:0,32:0,33:0,34:0,35:0,36:0,37:0,38:0,39:0,40:0,41:0,42:0,43:0,44:0,45:0,46:0,47:0,48:0,49:0,50:0,51:0,52:0,53:0,54:0,55:0,56:0,57:0,58:0,59:0,60:0,61:0,62:0,63:0,64:0,65:0,66:0,67:0,68:0,69:0,70:0},
	"addConstTime":{1:-12,2:-6,3:0,4:0,5:0,6:0,7:3,8:3,9:6,10:6,11:6,12:6,13:7,14:7,15:8,16:8,17:9,18:9,19:10,20:10,21:11,22:11,23:12,24:12,25:12,26:12,27:12,28:12,29:12,30:12,31:12,32:12,33:12,34:12,35:12,36:12,37:12,38:12,39:12,40:12,41:12,42:12,43:12,44:12,45:12,46:12,47:12,48:12,49:12,50:12,51:12,52:12,53:12,54:12,55:12,56:12,57:12,58:12,59:12,60:12,61:12,62:12,63:12,64:12,65:12,66:12,67:12,68:12,69:12,70:12},
	"addParking":{1:-60,2:-60,3:0,4:0,5:0,6:0,7:20,8:20,9:20,10:20,11:20,12:40,13:40,14:40,15:40,16:40,17:40,18:40,19:40,20:40,21:40,22:40,23:40,24:40,25:40,26:40,27:40,28:40,29:40,30:40,31:40,32:40,33:40,34:40,35:40,36:40,37:40,38:40,39:40,40:40,41:40,42:40,43:40,44:40,45:40,46:40,47:40,48:40,49:40,50:40,51:40,52:40,53:40,54:40,55:40,56:40,57:40,58:40,59:40,60:40,61:40,62:40,63:40,64:40,65:40,66:40,67:40,68:40,69:40,70:40},
	"addViewPrices":{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0.005,16:0.01,17:0.015,18:0.02,19:0.025,20:0.03,21:0.035,22:0.04,23:0.045,24:0.05,25:0.055,26:0.06,27:0.065,28:0.07,29:0.075,30:0.08,31:0.085,32:0.09,33:0.095,34:0.1,35:0.105,36:0.11,37:0.115,38:0.12,39:0.125,40:0.13,41:0.135,42:0.14,43:0.145,44:0.15,45:0.155,46:0.16,47:0.165,48:0.17,49:0.175,50:0.18,51:0.185,52:0.19,53:0.195,54:0.2,55:0.205,56:0.21,57:0.215,58:0.22,59:0.225,60:0.23,61:0.235,62:0.24,63:0.245,64:0.25,65:0.255,66:0.26,67:0.265,68:0.27,69:0.275,70:0.28},
	"constEff": 0.73, // Basic construction efficiency, percent of lot size
	"resVacancy": 0.05, // Assumed residential vacancy
	"retVacancy": 0.1, // Assumed retail vacancy
	"loanFee": 0.0075, // Bank loan fee
	"softPerc": 0.2, // Soft costs as a share of hard costs, not including interest or local impact fees
	"retailCap": 0.015, // Retail cap rate above residential
	"retailParking": 2, // Retail parking required per 1000 square feet
	"parkingPlus": 15000, // Additional cost for stackers per space
	"stackerMultiple": {1:1,2:1,3:2,4:2,5:2,6:2,7:2,8:2,9:2,10:2,11:2,12:2,13:2,14:2,15:2,16:2,17:2,18:2,19:2,20:2,21:2,22:2,23:2,24:2,25:2,26:2,27:2,28:2,29:2,30:2,31:2,32:2,33:2,34:2,35:2,36:2,37:2,38:2,39:2,40:2,41:2,42:2,43:2,44:2,45:2,46:2,47:2,48:2,49:2,50:2,51:2,52:2,53:2,54:2,55:2,56:2,57:2,58:2,59:2,60:2,61:2,62:2,63:2,64:2,65:2,66:2,67:2,68:2,69:2,70:2}, // Assumes one car on top and one on bottom for stackers
	"landscaping": 10, // Cost per square foot for landscaping work
	"costCarried": 0.1, // Not including land, the carrying costs of predevelopment annually, as a share of hard and soft construction costs
	"optionShare": 0.1, // Percent of land purchase price paid annually in option consideration
	"leaseUp": 20, // Units leased or sold per month
	"operatingRes": 0.3, // Operating costs as a share of rents, residential rentals
	"operatingRet": 0.1, // Operating costs as a share of rents, retail rentals
	"affTaxes": 0.012 * 300000, // approximate taxes on a $300,000 unit
	"affCondo": 6000, // Condo fees annually
	"affDown": 0.1, // Percent down for affordable condos
	"affInflation": 1.03, // Multiple for increase in HUD rents, which I assume to be around inflation
	"landSellerMax": 200, // The maximum multiple before every motivated land seller will sell their land
	"landStdDev": 40, // Standard Deviation of Land Seller price distribution, mean of 100
	"setback": 5, // Setback of building required in feet
	"lowShare": 0.7, // For small buildings, share that isn't yard space or paths between units
	"landslide": 1.015, // Cost multiplier for a landslide zone
	"liquefaction": 1.04, // Cost multiplier for a liquefaction zone
	"EIRcost": 300000, // Base cost for EIR
	"EIRscale": 1500, // Additional EIR cost per unit
	"EIRtime": 12, // Time required to do EIR in months
	"EIRadditional": 12 / 1000, // Additional time for EIR based on project size
	"NegativeDeclaration": 4, // Time required for a negative declaration or mitigated negative declaration
	"Oakland":{
		"densityBonusBase": 1.2, // Basic density bonus multiplier
		"densityBonusThreshold": 10, // Percent of units affordable before getting bonus
		"densityBonusStep": 0.015, // Step for each percent increase in affordable units
		"densityBonusMax": 1.35, // Maximum density multiplier
		"densityBonusAff": 80, // Maximum density bonus affordability level
		"landEst": 100, // Base estimator for carrying costs for price of land
		"inflate2016": 1.18, // Inflate to 2016 values based on Zillow data
		"Size": 800, // Average unit size to get to ideal rents
		"latLon": [37.81467, -122.25406], // Center of map
		"zoom": 13, // Zoom of map
		"affInc": 48750 // 50% of AMI for a family of 4 annually, based on 2016 HUD income limits for the Oakland-Fremont CA Metro Area - https://www.huduser.gov/portal/datasets/il/il15/index.html
	},
	"San Francisco":{
		"densityBonusBase": 1, // Basic density bonus multiplier
		"densityBonusThreshold": 10, // Percent of units affordable before getting bonus
		"densityBonusStep": 0, // Step for each percent increase in affordable units
		"densityBonusMax": 1, // Maximum density multiplier
		"densityBonusAff": 80, // Maximum density bonus affordability level
		"landEst": 250, // Base estimator for carrying costs for price of land
		"inflate2016": 1.12, // Inflate to 2016 values based on Zillow data
		"Size": 700, // Average unit size to get to ideal rents
		"latLon": [37.7833, -122.4167], // Center of map
		"zoom": 13, // Zoom of map
		"affInc": 61500 // 50% of AMI for a family of 4 annually, based on 2016 HUD income limits for the San Francisco Metro Area - https://www.huduser.gov/portal/datasets/il/il15/index.html
	},
	"Pleasanton":{
		"densityBonusBase": 1.2, // Basic density bonus multiplier
		"densityBonusThreshold": 10, // Percent of units affordable before getting bonus
		"densityBonusStep": 0.015, // Step for each percent increase in affordable units
		"densityBonusMax": 1.35, // Maximum density multiplier
		"densityBonusAff": 80, // Maximum density bonus affordability level
		"landEst": 100, // Base estimator for carrying costs for price of land
		"inflate2016": 1.10, // Inflate to 2016 values based on Zillow data
		"Size": 900, // Average unit size to get to ideal rents
		"latLon": [37.6625, -121.8747], // Center of map
		"zoom": 13, // Zoom of map
		"affInc": 48750 // 50% of AMI for a family of 4 annually, based on 2016 HUD income limits for the Oakland-Fremont CA Metro Area - https://www.huduser.gov/portal/datasets/il/il15/index.html
	},
	"Menlo Park":{
		"densityBonusBase": 1.365, // Basic density bonus multiplier
		"densityBonusThreshold": 21, // Percent of units affordable before getting bonus
		"densityBonusStep": 0.015, // Step for each percent increase in affordable units
		"densityBonusMax": 1.6, // Maximum density multiplier
		"densityBonusAff": 80, // Maximum density bonus affordability level
		"landEst": 250, // Base estimator for carrying costs for price of land
		"inflate2016": 1.12, // Inflate to 2016 values based on Zillow data
		"Size": 700, // Average unit size to get to ideal rents
		"latLon": [37.4528, -122.1833], // Center of map
		"zoom": 13, // Zoom of map
		"affInc": 61500 // 50% of AMI for a family of 4 annually, based on 2016 HUD income limits for the San Francisco Metro Area - https://www.huduser.gov/portal/datasets/il/il15/index.html
	},
	"efficiencySize": [50,250], // bounds for project efficiency
	"efficiencyDiscount": [1, 0.9], // bounds for project efficiency multiplier
	"monthsPrep": 3, // Months spent before anything is submitted to city government
	"landCostMin": 10, // Minimum price per square foot for land
	"publicShift": 40, // Shift in land value ratio for public owned properties
	"yearsOwnedThresholds": [20,40], // Threshold at which it becomes less likely the owner will sell
	"yearsOwnedRate": 40/20 // Rate at which land value ratio shifts for every year owned over threshold
}

inputs = {}

te = true

unitHeights = [40,30,20,10,8,6,4,2]
function calcAll(tRow){

	sLen = 4
	//if (either){ sLen = 3; }
	//else if (fee){ sLen = 1;}
	//else{ sLen = 2; }
	tempFee = fee
	d = data["data"][tRow]

	// Calculate maximum stories
	floorsf = d[c["Lot_Area_Setback"]]
	res_units = d[c["Max_Density_Units"]]
	stories = d[c["Max_stories_all"]]
	lot_area = d[c["Lot_Area"]]
	ls = d[c["LS_Flag"]]
	lq = d[c["LQ_Flag"]]
	ap = d[c["AP_7_ID"]]
	local_sales = d[c["Sales"]] * assumptions[tCity]["inflate2016"] // Update to 2016 values
	local_rents = d[c["Rentals"]] * 12 * assumptions[tCity]["inflate2016"] // Update to 2016 values
	local_cap = d[c["Cap"]] - 0.0025 // Update to 2016 values
	small_impact = d[c["Small_Environmental_Impact"]]
	public_owner = d[c["Use_Cat"]]
	years_owner = d[c["Years_Owned"]]

	if (!!res_units){ res_units = res_units  * (1 + inputs["Change_in_Density"]/100); }
	else{ res_units = Math.min(1000,floorsf*unitHeights[0]/(assumptions[tCity]["Size"]/assumptions["constEff"])) * (1 + inputs["Change_in_Density"]/100); }
	if (res_units < 0){ res_units = 0; }
	if (!!stories){ stories = stories * (1 + inputs["Change_in_Density"]/100); }
	else{ stories = unitHeights[0] * (1 + inputs["Change_in_Density"]/100); }
	if (stories > 40){ stories = 40; }
	parking_req = d[c["PS_per_unit"]] * (1 + inputs["Change_in_Parking"]/100)
	if (parking_req < 0.5){ parking_req = 0.5; }
	retail_req = d[c["Ground_Floor_Retail"]] + inputs["Change_in_Ground_Floor_Retail"]/100;
	if (retail_req < 0){ retail_req = 0; }
	if (retail_req > 1){ retail_req = 1; }
	retail = retail_req * floorsf

	// Calculate Hard construction costs
	building_res = assumptions["Contingency"]
	building_ret = (assumptions["Retail"] + inputs["Low_Rise_Construction_Costs"]) * assumptions["Contingency"] + assumptions["RetailTI"]

	// Calculate Permitting time and costs
	sp = d[c["SP_Flag"]]
	cu_ind = d[c["Permit"]]
	if (cu_ind == "C"){ cu = true; }
	else{ cu = false; }
	addTimeEIR = 0;
	if (!sp && inputs["specificplan"] == "No"){
		if ((lot_area >= 60000 || cu) && inputs["conditionaluse"] == "No"){
			if (small_impact > inputs["Projects_with_Small_Environmental_Impacts"]){
				if (res_units > 6){
					addCost = assumptions["EIRcost"];
					addTimeEIR = assumptions["EIRtime"];
					addTime = inputs["CU_or_PUD_Additional_Time"];
					addConst =  inputs["CU_or_PUD_Additional_Cost"];
				}
				else{
					addCost = 0;
					addTime = inputs["CU_or_PUD_Additional_Time"];
					addConst = inputs["CU_or_PUD_Additional_Cost"];
				}
			}
			else{
				addCost = inputs["CU_or_PUD_Additional_Cost"];
				if (res_units > 6){
					addTimeEIR = assumptions["NegativeDeclaration"];
				}
				addTime = inputs["CU_or_PUD_Additional_Time"];
				addConst = inputs["CU_or_PUD_Additional_Cost"];
			}
		}
		else{
			addCost = 0;
			addTime = 0;
			addConst = 0;
		}
	}
	else{
		if (cu && inputs["conditionaluse"] == "No"){
			addCost = 0;
			addTime = inputs["CU_or_PUD_Additional_Time"];
			addConst = inputs["CU_or_PUD_Additional_Cost"];
		}
		else{
			addCost = 0;
			addTime = 0;
			addConst = 0;
		}
	}

	// Calculate total Hard and Soft Construction costs
	const_increase = 1 + inputs["Annual_Construction_Cost_Increase"]/100
	if (!!ls || !!ap){
		lfact = assumptions["landslide"];
	}
	else{
		lfact = 1;
	}
	if (!!lq){
		lfact = assumptions["liquefaction"];
	}
	hard_cost_factor = (1 + assumptions["softPerc"]) * lfact
	landCost = assumptions[tCity]["landEst"] * lot_area
	optionCost = landCost * assumptions["optionShare"] / 12
	compound_rate_inv = Math.pow((1 + inputs["Total_Project_Target_Return"]/100), 1/12)
	compound_rate_bank = Math.pow((1 + inputs["Bank_Loan_Annual_Interest_Rate"]/100), 1/12)

	price_inc = 1 + inputs["Annual_Rent_or_Sales_Price_Increase"]/100
	if (!baseLand[tRow]){ comp_cost = []; }
	else{ a_res = []; }

	landValAlt = d[c["Owner_Value"]] / lot_area

	for (j=0;j<sLen;j++){

		for (n1=0;n1<2;n1++){

			rent = true;

			// Fee and affordable housing costs
			if (rent){
				affRent = assumptions[tCity]["affInc"] * (aff_level[j] * 2 / 100) * (0.3/assumptions[tCity]["Size"])
				if (affRent > local_rents){ affRent = local_rents; }
			}
			else{
				aff90 = assumptions[tCity]["affInc"] * 0.3 * (aff_level[j] * 2 / 100) // Assume 30% of income toward mortgage
				available = (aff90 - assumptions["affTaxes"] - assumptions["affCondo"])
				affInterest = inputs["Bank_Loan_Annual_Interest_Rate"] - 0.01
				topFormula = (1 - Math.pow(1 + affInterest/12, -360)) / affInterest
				mortgage = available * topFormula
				affSales = mortgage / ((1 - assumptions["affDown"]) * assumptions[tCity]["Size"])
				if (affSales > local_sales){ affSales = local_sales; }
			}

			if (rent == false){ building_res2 = building_res * (1 + assumptions["Finishes"]) }
			else{ building_res2 = building_res; }

			if (j == 1 || j == 3){ bonus = true; }
			else{ bonus = false; }
			if (j == 2 || j == 3){ tempFee = false; }
			else{ tempFee = true; }

			// Continue Calculating Maxmimum stories
			stories2 = Math.round(stories * bonus_Mult[j]);
			eff = assumptions["constEff"] + assumptions["addConstEff"][stories2]
			res_units2 = res_units * bonus_Mult[j]
			res_space = res_units2 * assumptions[tCity]["Size"] / eff
			spaces = res_units2 * parking_req + Math.ceil(retail_req * floorsf * assumptions["retailParking"] / 1000)
			parking_space = spaces * assumptions["perSpace"] / assumptions["stackerMultiple"][stories2]

			tHeight = Math.ceil((res_space + parking_space + retail)/floorsf)
			if (tHeight > 40){ tHeight = 40; }

			unitMove = [tHeight]
			for (k=0;k<unitHeights.length;k++){
				if (tHeight > unitHeights[k]){ unitMove.push(unitHeights[k]); }
			}

			for (k=0;k<unitMove.length;k++){

				// Calculate residential square footage, retail square footage, parking square footage, and parking spaces
				tempHeight = unitMove[k]
				if (tempHeight <= 2){ floorsf2 = floorsf * assumptions["lowShare"]; }
				else{ floorsf2 = floorsf * 1; }
				eff = assumptions["constEff"] + assumptions["addConstEff"][tempHeight]

				retail = retail_req * floorsf2
				res_parking = (assumptions[tCity]["Size"] / eff) / (assumptions["perSpace"] * parking_req / assumptions["stackerMultiple"][tempHeight])
				ret_parking_total = Math.ceil(retail * assumptions["retailParking"] / 1000) * assumptions["perSpace"] / assumptions["stackerMultiple"][tempHeight]
				if (tempHeight < 7){ tot_space = 1; }
				else{ tot_space = 0; }
				residential = (floorsf2 * (tempHeight * res_parking/(res_parking + tot_space) - retail_req/100) - ret_parking_total) * eff * bonus_Mult[j]
				residential_total = residential/eff;
				resunits = Math.floor(residential/assumptions[tCity]["Size"])
				spaces = resunits * parking_req + Math.ceil(retail * assumptions["retailParking"] / 1000)
				parkingsf = spaces * assumptions["perSpace"] / assumptions["stackerMultiple"][tempHeight]
				if (tempHeight < 7){ addparkingsf = parkingsf; }
				else{ addparkingsf = 0; }
				if (tempHeight > 0){ tHeight = Math.ceil((residential_total + ret_parking_total + addparkingsf + retail) / floorsf2); }
				else{ tHeight = 0; }

				// Calculate Hard Construction costs per square foot
				building_res3 = building_res2 * inputs["Low_Rise_Construction_Costs"] * assumptions["addConstHeight"][tHeight]
				parking = (assumptions["Parking"] + assumptions["addParking"][tHeight]) * assumptions["Contingency"]
				building_ret_cost = building_ret * retail
				landscaping_cost = assumptions["landscaping"] * (lot_area - floorsf2) * assumptions["Contingency"]

				// Calculate Permitting time and costs
				addConst2 = addConst * resunits;
				addCost2 = 0;
				addTimeEIR2 = 0;
				if (!sp && inputs["specificplan"] == "No"){
					if ((lot_area >= 60000 || cu) && inputs["conditionaluse"] == "No"){
						if (small_impact > inputs["Projects_with_Small_Environmental_Impacts"]){
							if (resunits > 6){
								addCost2 = addCost + assumptions["EIRscale"] * resunits;
								addTimeEIR2 = addTimeEIR + assumptions["EIRadditional"] * resunits;
							}
						}
						else{
							addCost2 = addCost * resunits;
						}
					}
				}
				if (!addCost2){ addCost2 = addCost * 1; }
				if (!addTimeEIR2){ addTimeEIR2 = addTimeEIR * 1; }
				if (addTimeEIR2 > inputs["Basic_Permitting_Time"] * 1){
					total_time = addTimeEIR2 + addTime;
				}
				else{
					total_time = inputs["Basic_Permitting_Time"] * 1 + addTime;
				}
				total_time += assumptions["monthsPrep"]

				// Calculate total Hard and Soft Construction costs
				const_multiple = Math.pow(const_increase, total_time/12)
				building_res_cost = building_res3 * residential_total
				parking_cost = parking * parkingsf + assumptions["parkingPlus"] * spaces / assumptions["stackerMultiple"][tempHeight]
				total_hard_cost = (building_res_cost + building_ret_cost + parking_cost + landscaping_cost + addConst2) * const_multiple
				total_hard_soft_cost = total_hard_cost * hard_cost_factor

				// Calculate efficiency based on size
				if (resunits <= 50){
					effSize = 1;
				}
				else if (resunits < 250){
					effSize = (resunits - assumptions["efficiencySize"][0]) / (assumptions["efficiencySize"][1] - assumptions["efficiencySize"][0])
					effSize = assumptions["efficiencyDiscount"][0] - (assumptions["efficiencyDiscount"][0] - assumptions["efficiencyDiscount"][1]) * effSize
				}
				else{
					effSize = assumptions["efficiencyDiscount"][1]
				}
				total_hard_soft_cost = total_hard_soft_cost * effSize
					
				// Calculate rough predevelopment carry costs based on current price of land
				build_time = assumptions["constTime"] + assumptions["addConstTime"][tHeight]
				predevCarry = (total_hard_soft_cost * assumptions["costCarried"] + addCost) / 12
				predevCarry_total_cost = 0
				for (l=total_time;l>0;l--){
					predevCarry_total_cost += Math.pow(compound_rate_inv,l) * (optionCost + predevCarry)
				}

				// Calculate construction carry costs
				const_loan = total_hard_soft_cost * (1 - assumptions["Equity"])
				const_loan_fee = assumptions["loanFee"] * const_loan
				const_time = assumptions["constTime"] + assumptions["addConstTime"][tHeight]
				const_interest = 0
				const_monthly = total_hard_soft_cost * (1 - assumptions["Equity"]) / const_time
				const_principal = 0
				for (l=1;l<=const_time;l++){
					// Function to front-load construction costs
					amount = const_monthly + ((const_time/2 + 0.5) - l) * 0.01 * const_loan
					interest = (compound_rate_bank - 1) * (amount + const_principal)
					const_interest += interest
					const_principal += amount + interest
				}

				// Calculate leasing carry
				if (rent){
					// Payback comes at 90% occupancy for 90 days, when you're stabilized and can sell or get a permanent loan'
					ninety = Math.ceil(resunits * 0.9 / assumptions["leaseUp"]) + 3
					for (i=1;i<=ninety;i++){
						interest = (compound_rate_bank - 1) * const_principal
						const_interest += interest
						const_principal += interest			
					}
					marketing = ninety;
				}
				else{
					// Payback comes after condos are sold in increments
					allSold = Math.ceil(resunits / assumptions["leaseUp"])
					for (i=1;i<=allSold;i++){
						const_principal -= (assumptions["leaseUp"] * assumptions[tCity]["Size"] * local_sales)
						if (const_principal > 0){
							interest = (compound_rate_bank - 1) * const_principal
							const_interest += interest
							const_principal += interest			
						}	
					}
					marketing = allSold;
				}
				const_loan_cost_total = const_loan_fee + const_interest

				// Fee and affordable housing costs
				aff_units = 0
				fee_aff_total_cost = 0
				if (tempFee && (!either || !bonus)){
					fee_aff_total_cost = resunits * inputs["Fees"]
				}
				if (bonus || !tempFee){
					if (bonus){ aff_units = Math.ceil(resunits * minAff[j] / 100); }
					else{ aff_units = Math.ceil(resunits * inputs["Affordable_Housing"] / 100); }
					market_residential_sf = residential - aff_units * assumptions[tCity]["Size"]
				}

				// Calculate total revenues and values
				multiple_Value = Math.pow(price_inc, (total_time + const_time + marketing)/12)
				aff_multiple_Value = Math.pow(assumptions["affInflation"], (const_time + marketing)/12)
				if (rent){
					// Calculate NOI for rental units
					if (tempFee && !bonus){
						total_revenue = residential * local_rents * multiple_Value * (1 + assumptions["addViewPrices"][tHeight])
					}
					else{
						total_revenue = aff_units * affRent * aff_multiple_Value * assumptions[tCity]["Size"] + market_residential_sf * local_rents * multiple_Value * (1 + assumptions["addViewPrices"][tHeight])
					}
					opCost = total_revenue * assumptions["operatingRes"]
					vacancyCost = total_revenue * assumptions["resVacancy"]
					NOI_res = total_revenue - opCost - vacancyCost
					value_res = NOI_res / local_cap
					value_res_total = value_res * (1 - assumptions["Expense"]["For Rent"])
				}
				else{
					// Calculate total sales value
					if (tempFee && !bonus){
						total_revenue = residential * local_sales * multiple_Value * (1 + assumptions["addViewPrices"][tHeight])
					}
					else{
						total_revenue = aff_units * affSales * aff_multiple_Value * assumptions[tCity]["Size"] + market_residential_sf * local_sales * multiple_Value * (1 + assumptions["addViewPrices"][tHeight])
					}
					value_res_total = total_revenue * (1 - assumptions["Expense"]["For Sale"])
				}
				total_retail_revenue = retail * (inputs["Retail_Rents"]/100) * local_rents * multiple_Value
				opCost_retail = total_retail_revenue * assumptions["operatingRet"]
				vacancyCost_retail = total_retail_revenue * assumptions["retVacancy"]
				NOI_ret = total_retail_revenue - opCost_retail - vacancyCost_retail
				value_ret = NOI_ret / (local_cap + assumptions["retailCap"])
				value_ret_total = value_ret * (1 - assumptions["Expense"]["For Rent"])
				total_project_value = value_res_total + value_ret_total

				// Calculate land cost
				total_project_return = Math.pow(1 + (inputs["Total_Project_Target_Return"])/100, (const_time + marketing)/12)
				landCost_total = (total_project_value / total_project_return) - (fee_aff_total_cost + const_loan_cost_total + predevCarry_total_cost + total_hard_soft_cost)
				costs = fee_aff_total_cost + const_loan_cost_total + predevCarry_total_cost + total_hard_soft_cost + landCost_total
				landCost_sf = landCost_total / lot_area

				// Calculate probability of land sale
				if (!baseLand[tRow]){ 
					baseMax = Math.max(assumptions["landCostMin"],landCost_sf);
					baseMax = Math.max(baseMax,landValAlt);
					comp_cost.push(baseMax);
				}
				else{
					land_comp = baseLand[tRow]

					landCost_multiple = Math.ceil(landCost_sf * 100 / land_comp)

					// Shift to the right based on length of time owned, public owner
					if (public_owner == "Public"){
						landCost_multiple -= assumptions["publicShift"]
					}
					else{
						if (years_owner >= assumptions["yearsOwnedThresholds"][1]){
							landCost_multiple -= assumptions["yearsOwnedRate"] * (assumptions["yearsOwnedThresholds"][1] - assumptions["yearsOwnedThresholds"][0]);
						}
						else if (years_owner > assumptions["yearsOwnedThresholds"][0]){
							landCost_multiple -= assumptions["yearsOwnedRate"] * (years_owner - assumptions["yearsOwnedThresholds"][0]);
						}
					}
					landCost_multiple = Math.round(landCost_multiple);
					if (landCost_multiple <= 0){
						probability_success = 0
					}
					else if (landCost_multiple < assumptions["landSellerMax"]){
						probability_success = probs_poisson[landCost_multiple]
					}
					else{
						probability_success = 0.99
					}
					if (probability_success > 0.99){ probability_success = 0.99; }

					// Hard code height of 0
					if (tHeight == 0){ probability_success = 0 }

					if (lot_area <= Math.pow(assumptions["setback"] * 2,2)){ probability_success = 0 }

					a_res.push([probability_success, resunits, landCost_total, predevCarry_total_cost, fee_aff_total_cost + const_loan_cost_total, total_hard_soft_cost, costs, value_res_total + value_ret_total, const_time + marketing, landCost_sf, aff_units, fee_aff_total_cost, rent]);
				}	
			}
		}
	}

	if (!baseLand[tRow]){ return Math.max.apply(null, comp_cost); }
	else{
		aMax = -Infinity;
		aPos = 0;
		for (j=0;j<a_res.length;j++){
			aMax = Math.max(aMax,a_res[j][9]);
			if (a_res[j][9] == aMax){ aPos = j; }
		}
		return a_res[aPos]
	}

}

// Normal Distrubtion Calculation modified from http://www.math.ucla.edu/~tom/distributions/normal.html

function normalcdf(X) {   //HASTINGS.  MAX ERROR = .000001

	var T=1/(1+.2316419*Math.abs(X));
	var D=.3989423*Math.exp(-X*X/2);
	var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
	if (X>0) { Prob=1-Prob }
	return Prob;

}   

function compute(Z,M,SD) {

	Prob=normalcdf((Z-M)/SD);
	Prob=Math.round(100000*Prob)/100000;
	return Prob;

}

// Poisson Distribution Calculation modified from view-source:http://www.math.ucla.edu/~tom/distributions/poisson.html

function LogGamma(Z) {
	with (Math) {
		var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
		var LG= (Z-.5)*log(Z+4.5)-(Z+4.5)+log(S*2.50662827465);
	}
	return LG
}

function Gcf(X,A) {        // Good for X>A+1
	with (Math) {
		var A0=0;
		var B0=1;
		var A1=1;
		var B1=X;
		var AOLD=0;
		var N=0;
		while (abs((A1-AOLD)/A1)>.00001) {
			AOLD=A1;
			N=N+1;
			A0=A1+(N-A)*A0;
			B0=B1+(N-A)*B0;
			A1=X*A0+N*A1;
			B1=X*B0+N*B1;
			A0=A0/B1;
			B0=B0/B1;
			A1=A1/B1;
			B1=1;
		}
		var Prob=exp(A*log(X)-X-LogGamma(A))*A1;
	}
	return 1-Prob
}

function Gser(X,A) {        // Good for X<A+1.
    with (Math) {
		var T9=1/A;
		var G=T9;
		var I=1;
		while (T9>G*.00001) {
			T9=T9*X/(A+I);
			G=G+T9;
			I=I+1;
		}
		G=G*exp(A*log(X)-X-LogGamma(A));
    }
    return G
}

function Gammacdf(x,a) {
	var GI;
	if (x<=0) {
		GI=0
	} else if (x<a+1) {
		GI=Gser(x,a)
	} else {
		GI=Gcf(x,a)
	}
	return GI
}

function compute2(Z,Lam) {
	if (Z<0) {
		Poiscdf=0
	} else {
		Poiscdf=1-Gammacdf(Lam,Z+1);
	}
	Poiscdf=Math.round(Poiscdf*100000)/100000;
    return Poiscdf;
}

// Calculate Normal distribution

probs_total = {}
probs_poisson = {}
for (i=0;i<=assumptions["landSellerMax"];i++){

	// Create the distribution of motivated and long-term sellers
	probs_total[i] = compute(i,100,assumptions["landStdDev"])
	probs_poisson[i] = compute2(i*5/100,4)

}


