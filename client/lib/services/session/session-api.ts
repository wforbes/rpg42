import { Routes } from "@/constants/routes";
import api from "@/lib/services/api";
import { AxiosError } from "axios";
import { handleApiError } from "@/lib/services/error-handling";


export const sessionApi = {
	verifySession: async (handleAuthLogout?: () => void) => {
		try {
			const res = await api.get(Routes.API.AUTH.VERIFY_SESSION);
			return res.data;
		} catch (error: unknown) {
			return handleApiError(
				error as AxiosError,
				"Failed to verify session, please try again later.",
				handleAuthLogout
			);
		}
	}
}