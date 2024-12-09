export const truncateText = (str: string, maxLength: number) => 
	str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str