import "./ModalForm.css";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { FetchOrganizations, SignIn } from "../../../../features/api/AuthService";
import { useAuthStore } from "../../../../features/useAuthStore";

const emailSchema = z.object({
	email: z.string().email("Please enter a valid email"),
});

const passwordSchema = z.object({
	password: z.string().min(6, "Password must be at least 6 characters"),
	orgId: z.string().optional(),
});

const ModalForm = ({ onLoginSuccess }) => {

	const [step, setStep] = useState(1);
	const [serverError, setServerError] = useState("");
	const [organizations, setOrganizations] = useState([]);
	const [email, setEmail] = useState("");

	const login = useAuthStore((state) => state.login);

	const {
		register: registerEmail,
		handleSubmit: handleSubmitEmail,
		formState: { errors: emailErrors },
	} = useForm({
		resolver: zodResolver(emailSchema),
	});

	const {
		register: registerPassword,
		handleSubmit: handleSubmitPassword,
		formState: { errors: passwordErrors },
	} = useForm({
		resolver: zodResolver(passwordSchema),
	});

	const { mutate: getOrganizations, isPending: isOrgLoading } = useMutation({
		mutationFn: FetchOrganizations,
		onSuccess: (orgs) => {
			if (!orgs.length) {
				setServerError("You do not have access to any organization");
				return;
			}
			setOrganizations(orgs);
			setStep(2);
		},
		onError: () => {
			setServerError("Something went wrong. Try again later.");
		},
	});

	const { mutate: doLogin, isPending: isLoginLoading } = useMutation({
		mutationFn: SignIn,
		onSuccess: () => {
			login(email);
			onLoginSuccess?.();
		},
		onError: (error) => {
			setServerError(error?.response?.data?.error || "Login failed. Try again.");
		},
	});

	const handleEmailSubmit = (data) => {
		setServerError("");
		setEmail(data.email);
		getOrganizations(data.email);
	};

	const handlePasswordSubmit = (data) => {
		setServerError("");
		const selectedOrgId = organizations.length === 1 ? organizations[0].id : data.orgId;

		if (organizations.length > 1 && !selectedOrgId) {
			setServerError("Please select an organization.");
			return;
		}

		doLogin({ email, password: data.password, orgId: selectedOrgId });
	};

	return (
		<div className="auth">
			<div className="auth__wrapper">
				<div className="auth__header authHeader">
					<div className="authHeader__logo-wrapper">
						<img className="authHeader__img" src="/img/logo-BsBS43Ge.svg" alt="logo" />
					</div>
				</div>
				<div className="auth__main-block">
					{serverError &&
						<div className="auth__server-error" style={{ color: "red", marginBottom: "1rem" }}>
							{serverError}
						</div>
					}

					{step === 1 && (
						<>
							<div className="auth__title">
								<h2>1. Enter your email address.</h2>
							</div>
							<form className="auth__form" onSubmit={handleSubmitEmail(handleEmailSubmit)}>
								<div className="auth__lable-wrapper">
									<label className="auth__lable" htmlFor="auth__input-email">
										<span className="auth__lable-span">E-Mail-Address</span>
									</label>
								</div>
								<div className="auth__input-wrapper">
									<input {...registerEmail("email")} className="auth__input" id="auth__input-email" type="text" placeholder="user.name@gmail.com" />
									{emailErrors.email && <span className="auth__span-error" style={{ color: "red" }}>{emailErrors.email.message}</span>}
								</div>
								<button className="auth__btn" type="submit" disabled={isOrgLoading}>{isOrgLoading ? "Loading..." : "Continue to password"}</button>
							</form>
						</>
					)}
					{step === 2 && (
						<>
							<div className="auth__title">
								<h2>2. Enter your password</h2>
							</div>
							<form className="auth__form" onSubmit={handleSubmitPassword(handlePasswordSubmit)}>

								{organizations.length > 1 && (
									<div className="auth__input-wrapper">
										<select
											{...registerPassword("orgId")}
											className="auth__input auth__input-select"
										>
											{organizations.map((org) => (
												<option key={org.id} value={org.id}>
													{org.name}
												</option>
											))}
										</select>
									</div>
								)}


								<div className="auth__input-wrapper">
									<input
										{...registerPassword("password")}
										className="auth__input auth__input-step2"
										type="password"
										placeholder="Your password"
									/>
									{passwordErrors.password &&
										<span
											className="auth__span-error"
											style={{ color: "red" }}
										>
											{passwordErrors.password.message}
										</span>
									}
								</div>

								<button className="auth__btn" type="submit" disabled={isOrgLoading}>
									{isLoginLoading ? "Loggin in..." : "Log in"}
								</button>

							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModalForm;