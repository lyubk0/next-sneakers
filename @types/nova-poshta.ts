export interface NovaPoshtaData {
	success: boolean
	data: NovaPoshtaCity[]
	errors: any[]
	warnings: any[]
	info: NovaPoshtaCityInfo
	messageCodes: any[]
	errorCodes: any[]
	warningCodes: any[]
	infoCodes: any[]
}

export interface NovaPoshtaCity {
	Description: string
	DescriptionRu: string
	Ref: string
	Delivery1: string
	Delivery2: string
	Delivery3: string
	Delivery4: string
	Delivery5: string
	Delivery6: string
	Delivery7: string
	Area: string
	SettlementType: string
	IsBranch: string
	PreventEntryNewStreetsUser: string
	CityID: string
	SettlementTypeDescriptionRu: string
	SettlementTypeDescription: string
	SpecialCashCheck: number
	AreaDescription: string
	AreaDescriptionRu: string
}

export interface NovaPoshtaCityInfo {
	totalCount: number
}
