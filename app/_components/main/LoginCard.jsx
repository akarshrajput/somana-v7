import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signInAction, signInGithub } from "@/app/_lib/actions";
import { Github, KeyRound, LogIn } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login to Somana</CardTitle>
        <CardDescription>
          Privacy and serurity is our first priority.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full items-center gap-4">
          <form action={signInAction} className="w-full">
            <Button className="w-full">
              <LogIn /> Login with Google
            </Button>
          </form>
          <form action={signInGithub} className="w-full">
            <Button className="w-full" variant="outline">
              <Github />
              Login with GitHub
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Terms and conditions
          </label>
        </div>
      </CardFooter>
    </Card>
  );
}
