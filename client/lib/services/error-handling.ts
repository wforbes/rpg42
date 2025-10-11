import { AxiosError } from "axios"

export type ApiError = {
	success: false;
	error: string;
}

export const handleApiError = (
	error: unknown,
	defaultMsg: string = "An unexpected error occurred. Please try again later.",
	handleAuthLogout?: () => void
): ApiError => {

	if (error instanceof AxiosError) {
		if (error.response) {
			// API returned an error response (4xx, 5xx)
			return {
				success: false,
				error: error.response.data?.message || `Server error: ${error.response.status}`
			}
		} else if (error.request) {
			// Network error - no response received
			return {
				success: false,
				error: "Network error. Please check your connection and try again."
			}
		}
	}
	if (handleAuthLogout) {
		handleAuthLogout();
	}
	return {
		success: false,
		error: defaultMsg
	}
}

export const isApiError = (data: unknown): data is ApiError => {
	return typeof data === 'object' && data !== null && 'success' in data && data.success === false;
}