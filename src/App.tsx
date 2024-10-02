import { useState, Dispatch, SetStateAction } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	UserCredential,
} from "firebase/auth";

export default function App() {
	const [user, setUser] = useState<UserCredential | null>(null);

	if (user) {
		return <div>Welcome!</div>;
	}

	return <AuthScreen setUser={setUser} />;
}

const AuthScreen = ({
	setUser,
}: {
	setUser: Dispatch<SetStateAction<UserCredential | null>>;
}) => {
	const [isSignup, setIsSignUp] = useState<boolean>(false);
	const [userEmail, setUserEmail] = useState<string>("");
	const [userPassword, setUserPassword] = useState<string>("");
	const [userConfirmedPassword, setUserConfirmedPassword] =
		useState<string>("");

	const resetValues = () => {
		setUserEmail("");
		setUserPassword("");
		setUserConfirmedPassword("");
	};

	const createUser: (
		email: string,
		password: string
	) => Promise<UserCredential | undefined> = async (
		email: string,
		password: string
	) => {
		const auth = getAuth();

		try {
			const createUserAttempt = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("create user attempt = ", createUserAttempt);
			return createUserAttempt;
		} catch (error) {
			console.error("error =", error);
		}
	};

	return (
		<div
			className="container flex h-screen justify-center items-center"
			style={{
				// borderWidth: 1,
				// borderStyle: "solid",
				// borderColor: "red",
				height: "100vh",
				width: "100vh",
			}}>
			<div className="relative flex flex-col justify-center h-screen overflow-hidden">
				<div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
					<h1 className="text-3xl font-semibold text-center text-purple-700">
						Bueno
					</h1>
					<div className="space-y-4">
						<div>
							<label className="label">
								<span className="text-base label-text">Email</span>
							</label>
							<input
								type="text"
								placeholder="Email Address"
								className="w-full input input-bordered input-primary"
								value={userEmail}
								onChange={(e) => {
									setUserEmail(e.target.value);
								}}
							/>
						</div>
						<div>
							<label className="label">
								<span className="text-base label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="Enter Password"
								className="w-full input input-bordered input-primary"
								value={userPassword}
								onChange={(e) => {
									setUserPassword(e.target.value);
								}}
							/>
						</div>

						{isSignup && (
							<div>
								<label className="label">
									<span className="text-base label-text">Confirm Password</span>
								</label>
								<input
									type="password"
									placeholder="Confirm Password"
									className="w-full input input-bordered input-primary"
									value={userConfirmedPassword}
									onChange={(e) => {
										setUserConfirmedPassword(e.target.value);
									}}
								/>
							</div>
						)}

						<div>
							<button
								className="btn btn-primary mr-2"
								onClick={async () => {
									if (isSignup) return setIsSignUp(false);
									const auth = getAuth();
									const signInAttempt = await signInWithEmailAndPassword(
										auth,
										userEmail,
										userPassword
									);
									console.log("sign in attempt = ", signInAttempt);
									if (signInAttempt) {
										setUser(signInAttempt);
									}
								}}>
								Login
							</button>
							<button
								className="btn btn-secondary"
								// disabled={
								// 	userPassword != userConfirmedPassword ||
								// 	userPassword === "" ||
								// 	userConfirmedPassword === ""
								// }
								onClick={async () => {
									if (!isSignup) return setIsSignUp(true);
									const createUserPayload: {
										email: string;
										password: string;
										confirmedPassword?: string;
									} = {
										email: userEmail,
										password: userPassword,
										confirmedPassword: userConfirmedPassword,
									};

									if (Object.values(createUserPayload).some((v) => v === "")) {
										resetValues();
										return alert("check input values...");
									}

									if (
										createUserPayload.password !=
										createUserPayload.confirmedPassword
									) {
										resetValues();
										return alert("passwords do not match");
									}

									console.log("createUserPayload = ", createUserPayload);
									const firebaseUser: UserCredential | undefined =
										await createUser(
											createUserPayload.email,
											createUserPayload.password
										);

									if (firebaseUser) {
										setUser(firebaseUser);
									}
								}}>
								Signup
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
