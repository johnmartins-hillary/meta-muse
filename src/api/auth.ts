import axios from "./axios";
import store from "@/redux/store";
import { setAuthenticating } from "@/redux/slice/auth-slice";
import { toast } from "react-toastify";

export async function authenticateUser(data: any, type: "login" | "sign-up", router:any) {
  store.dispatch(setAuthenticating(true));
  const url = `/${type}`;

  await axios.post(url, data).then((res) => {
    const { data } = res;
    if (type === "login") {
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Logged In");
      router.navigate({ to: '/' }); // Redirect to home
    }
    if (type === "sign-up") {
      toast.success("Account created successfully");
      router.navigate({ to: '/auth/sign-in' }); // Redirect to sign-in page
    }
    store.dispatch(setAuthenticating(false));
  }).catch((err) => {
    store.dispatch(setAuthenticating(false));
    toast.error(err?.message);
  });
}

export async function canvas(data: any, type: "createCanvas" | "joinCanvas") {
	store.dispatch(setAuthenticating(true))
	const url = `/${type}`;
	await axios.post(url, data).then(() => {
		// const { data } = res
		if (type === "createCanvas") {
			toast.success("canvas created")
		}
		if (type === "joinCanvas") {
			toast.success("You have joined a canvas")
		} 
		store.dispatch(setAuthenticating(false))
	}).catch((err) => {
		store.dispatch(setAuthenticating(false))
		toast.error(err?.message)
	})
}