import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import axios from "axios";

const glassFrost = {
  backdropFilter: "blur(30px)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
};

const bg = {
  backgroundImage: "url('assets/blob-bg.webp')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Signup = () => {
  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const [googleSignUpLoading, setGoogleSignUpLoading] =
    useState<boolean>(false);

  const fetchGoogle = () => {
    setGoogleSignUpLoading(true);
    window.open("http://localhost:3000/auth/google?auth_type=signup", "_self");
  };

  useEffect(() => {
    const urlErr = new URLSearchParams(window.location.search).get("error");
    if (urlErr) {
      if (urlErr === "account-already-exists") {
        toast.error("Account already exists. Please sign in.");
      } else {
        toast.error(urlErr);
      }
      setTerms(true);
    }
  }, []);

  const signUp = () => {
    setSignUpLoading(true);
    if (fName && lName && email && password) {
      if (terms) {
        axios
          .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/register`, {
            fName,
            lName,
            email,
            password,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            if (err.response.status === 409) {
              toast.error("Account already exists. Please sign in.");
            } else {
              toast.error("Something went wrong");
            }
          })
          .finally(() => {
            setSignUpLoading(false);
          });
      } else {
        toast.error("Please agree to the terms and conditions");
        setSignUpLoading(false);
      }
    } else {
      toast.error("Please fill all the fields");
      setSignUpLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-[100vh] p-5 gap-20"
      style={bg}
    >
      <div className="h-[90vh] w-[40%] p-10 rounded-xl" style={glassFrost}>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
          Sign Up<span className="text-blue-500">.</span>
        </h2>

        <div className="flex gap-5 mb-5">
          <div>
            <small className="text-sm font-medium leading-none">
              First Name
            </small>
            <Input
              className="p-6 mt-2 w-[250px] border-gray-700"
              onChange={(e) => setFName(e.target.value)}
              value={fName}
            />
          </div>

          <div>
            <small className="text-sm font-medium leading-none">
              Last Name
            </small>
            <Input
              className="p-6 mt-2 w-[250px] border-gray-700"
              onChange={(e) => setLName(e.target.value)}
              value={lName}
            />
          </div>
        </div>

        <div className=" mb-5">
          <small className="text-sm font-medium leading-none">
            Email Address
          </small>
          <Input
            className="p-6 mt-2 w-[100%] border-gray-700"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className=" mb-5">
          <small className="text-sm font-medium leading-none">Password</small>
          <Input
            className="p-6 mt-2 w-[100%] border-gray-700"
            placeholder="Minimum 8 Characters, Including Alphanumeric Characters"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="flex items-center gap-3 mt-5">
          <Checkbox
            id="terms"
            checked={terms}
            onCheckedChange={(e: boolean) => setTerms(e)}
          />
          <p>I agree to the terms and conditions</p>
        </div>

        <Button className="mt-10 w-[100%]" disabled={!terms} onClick={signUp}>
          {signUpLoading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <div>Sign Up</div>
          )}
        </Button>
        <Button
          disabled={!terms || googleSignUpLoading || signUpLoading}
          onClick={fetchGoogle}
          className="mt-2 mb-5 w-[100%] bg-white flex items-center justify-center"
        >
          {googleSignUpLoading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <img src="assets/img/google.webp" width="20px" className="mr-3" />
              Sign up with Google
            </>
          )}
        </Button>
        <a href="/signin">Sign in</a>
      </div>
      <div className=" bg-red h-[90vh] w-[40%]">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="flex justify-center items-center h-[90vh]">
                <img src="assets/img/logo.svg" width="50px" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="border h-[90vh] ">Hellpo</div>
            </CarouselItem>{" "}
            <CarouselItem>
              <div className="border h-[90vh] ">Hellpo</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Signup;
