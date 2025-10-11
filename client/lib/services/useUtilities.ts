import { Routes } from "@/constants/routes";
import { useRouter } from "next/navigation";

export const useUtilities = () => {
	const router = useRouter();

	const handleAuthLogout = () => {
		router.push(Routes.AUTH.LOGIN + (
			(window.location.pathname !== '/' && window.location.pathname !== '/login')
				? `?redirect=${encodeURIComponent(window.location.pathname)}` : ""));
	}

	return { handleAuthLogout };
}