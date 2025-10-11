import { sessionApi } from "./session-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { useUtilities } from "@/lib/services/useUtilities";

export const useSessionQuery = () => {
	const { handleAuthLogout } = useUtilities();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.session.verify(),
		queryFn: () => sessionApi.verifySession(handleAuthLogout),
	});

	return { data, isLoading, isFetching, error };
}