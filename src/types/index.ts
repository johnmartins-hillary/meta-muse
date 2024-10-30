import type { LucideProps } from "lucide-react";
import type { Control, FieldPath } from "react-hook-form";

import type { FormSchema } from "@/components/auth-form";

export interface InputWithIconProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	control: Control<FormSchema>;
	name: FieldPath<FormSchema>;

	Icon: React.ComponentType<LucideProps>;
}

export interface User {
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	status: string;
	othername: string | null;
	email: string;
	username: string;
	phoneNumber: string | null;
	roles: string;
	permissions: string | null;
	address: string | null;
	shippingAddress: string | null;
	city: string | null;
	deactivationReason: string | null;
	deactivationDate: string | null;
	reactivationDate: string | null;
	userType: string;
	emailVerified: boolean;
	emailVerifyHash: string;
	emailVerifyHashCreatedAt: string;
	emailVerifiedAt: string;
	language: string;
	phoneVerified: boolean;
	transactionPin: string | null;
	twoFaEnabled: boolean;
	countryId: string;
	primaryBankAccountId: string | null;
}

export interface AuthResponse {
	statusCode: number;
	data: {
		user: User;
		access_token: string;
		refreshToken: string;
	};
	message: string;
	isSuccessful: boolean;
}
