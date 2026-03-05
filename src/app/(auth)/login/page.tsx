import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
        Connexion
      </h2>
      <LoginForm />
    </>
  );
}
