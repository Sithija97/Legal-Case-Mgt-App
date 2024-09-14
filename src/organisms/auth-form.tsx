import React from "react";
import { Button } from "@/atoms/button";
import { Input } from "@/atoms/input";
import { Label } from "@/atoms/label";
import { cn } from "@/lib/utils";
import { Spinner } from "@/molecules";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "@/store/user-slice";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users } = useAppSelector((state: RootState) => state.usersState);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const emailList = users.map((user) => user.email);
    // Use includes to check if the email exists
    if (emailList.includes(email)) {
      const user = users.filter((user) => user.email === email);
      console.log(`The email ${email} is already in the users array.`);
      dispatch(setLoggedInUser(user));
      setIsLoading(false);
      navigate("/users");
    } else {
      console.log(`The email ${email} is not in the users array.`);
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button className="bg-blue-800 hover:bg-blue-700">
            {isLoading && <Spinner />}
            Sign In with Email
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  );
}
