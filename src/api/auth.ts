import type { FormSchema } from "@/components/auth-form";
import type { AuthResponse } from "@/types";

import axios from "./axios";

export async function authenticateUser(data: FormSchema, type: "sign-in" | "sign-up") {
	const url = `/auth/${type === "sign-up" ? "create_user" : "login"}`;
	const mainData = type === "sign-up"
		? {
				...data,
				//  @ts-expect-error - userType is not in FormSchema
				roles: data.userType,
			}
		: data;
	const response = await axios.post(url, mainData);

	return response.data as AuthResponse;
}
