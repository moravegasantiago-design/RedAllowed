import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import useFormUser from "../../Auth/hook/useFromUser";
import { useValidation } from "../../Auth/hook/useValidation";
import { useComparePassword } from "../../Auth/tsx/comparePassword";
import { useIndicator } from "../../Auth/hook/useIndicator";
import { useFetch } from "../../hook/useFetch";
// Register.tsx
const Register = () => {
  const navegate = useNavigate();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const { formUser, handleChange } = useFormUser();
  const { validation, handleState } = useValidation();
  const { data, error, loading, handleRequest } = useFetch();
  const { isPassword, comparePassword } = useComparePassword();
  const { indicator, updateIndicator } = useIndicator();
  const colorClasses = {
    "bg-red-500": "focus:ring-red-500 focus:border-red-500",
    "bg-orange-500": "focus:ring-yellow-500 focus:border-yellow-500",
    "bg-emerald-500": "focus:ring-emerald-500 focus:border-emerald-500",
    "bg-emerald-900": "focus:ring-green-500 focus:border-green-500",
  } as const;

  useEffect(() => {
    if (!data?.success) return;
    navegate("/login");
  }, [data, navegate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>

      <div className="w-full max-w-md relative animate-[fadeIn_0.5s_ease-out]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/20">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>
          <p className="text-zinc-500 mt-1">Únete a la conversación</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <form
            className="space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              if (formUser.password === undefined) return;
              if (
                handleState(formUser) ||
                comparePassword({
                  pass: formUser.password,
                  confirmPass: formUser.passwordConfirm || "",
                }) ||
                !updateIndicator(formUser.password) ||
                loading
              )
                return;
              await handleRequest({
                href: "api/auth/register",
                method: "POST",
                isCredentials: false,
                user: formUser,
              });
            }}
          >
            <div
              className="space-y-2"
              onSubmit={() => {
                const verify = handleState(formUser);
                if (!verify) return;
              }}
            >
              <label className="text-sm font-medium text-zinc-300">
                Nombre completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  minLength={6}
                  maxLength={40}
                  pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+"
                  title="Solo letras y espacios (2 a 40 caracteres)"
                  value={formUser.name}
                  placeholder="Tu nombre"
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Nombre de usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formUser.username}
                  required
                  minLength={6}
                  maxLength={15}
                  pattern="[a-zA-Z0-9_]+"
                  title="Solo letras, números y guion bajo (3–15 caracteres)"
                  placeholder="@usuario"
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formUser.email}
                  required
                  minLength={6}
                  maxLength={50}
                  pattern="\S+"
                  placeholder="tu@email.com"
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={seePassword ? "text" : "password"}
                  name="password"
                  value={formUser.password}
                  required
                  pattern="^\S+$"
                  placeholder="Mínimo 8 caracteres"
                  onChange={(e) => {
                    handleChange(e);
                    updateIndicator(e.target.value);
                  }}
                  className={`w-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl 
                  py-3.5 pl-12 pr-12 focus:outline-none transition-all duration-200 ${
                    indicator &&
                    colorClasses[
                      indicator?.colorInput as keyof typeof colorClasses
                    ]
                  } `}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setSeePassword((prev) => !prev)}
                >
                  <svg
                    className="w-5 h-5 text-zinc-500 hover:text-zinc-300 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    {seePassword ? (
                      ""
                    ) : (
                      <line
                        x1="3"
                        y1="3"
                        x2="21"
                        y2="21"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </button>
              </div>
              {/* Password strength indicator */}
              <div className="flex gap-1.5 mt-2">
                {indicator?.indicator.map((p) => p)}
              </div>
              <p className="text-xs text-zinc-500">{indicator?.title}</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Confirmar contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  name="passwordConfirm"
                  value={formUser.passwordConfirm}
                  required
                  pattern="^\S+$"
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  className={`w-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none transition-all duration-200 ${
                    indicator &&
                    colorClasses[
                      indicator?.colorInput as keyof typeof colorClasses
                    ]
                  } `}
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="conditions"
                checked={formUser.conditions}
                className="w-4 h-4 mt-0.5 bg-zinc-800 border-zinc-600 rounded text-emerald-500 focus:ring-emerald-500/50 focus:ring-offset-0 cursor-pointer"
                onChange={handleChange}
              />

              <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                Acepto los{" "}
                <button
                  type="button"
                  className="text-emerald-500 hover:text-emerald-400"
                >
                  términos y condiciones
                </button>{" "}
                y la{" "}
                <button
                  type="button"
                  className="text-emerald-500 hover:text-emerald-400"
                >
                  política de privacidad
                </button>
              </span>
            </label>
            {(validation.isError ||
              error?.error ||
              isPassword ||
              (indicator?.colorInput !== "bg-emerald-500" &&
                !Object.values(formUser).filter((p) => !p).length)) && (
              <span className="flex items-center gap-1.5 text-sm text-red-600 font-medium">
                <AlertCircle className="w-4 h-4" />
                {validation.message ||
                  error?.error ||
                  (isPassword && "Las contraseñas no coinciden") ||
                  (indicator?.colorInput !== "bg-emerald-500" &&
                    "Contraseña no válida")}
              </span>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "Cargando.." : "Crear cuenta"}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center mt-8 text-zinc-500">
          ¿Ya tienes una cuenta?{" "}
          <Link
            className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors"
            to="/Login"
          >
            Inicia sesión
          </Link>
        </p>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
