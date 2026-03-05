import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <>
      <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
        Créer un compte
      </h2>
      <SignupForm />
    </>
  );
}
