import { Link } from "react-router-dom";
import { useFormUser } from "../Auth/tsx/useFromUser";
import { useEffect } from "react";
import { useValidation } from "../Auth/tsx/formValidation";

const Login = () => {
  const { formUser, handleChange } = useFormUser();
  const { validation, handleState } = useValidation();
  useEffect(() => {
    console.log(formUser);
  }, [formUser]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent"></div>

      <div className="w-full max-w-md relative animate-[fadeIn_0.5s_ease-out]">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Bienvenido</h1>
          <p className="text-zinc-500 mt-1">Inicia sesión para continuar</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <form
            className="space-y-5"
            onSubmit={() => {
              const verify = handleState(formUser);
              if (!verify) return console.log("Error");
              console.log("Paso");
            }}
          >
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
                  placeholder="tu@email.com"
                  value={formUser.email}
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
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formUser.password}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
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
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="conditions"
                  className="w-4 h-4 bg-zinc-800 border-zinc-600 rounded text-emerald-500 focus:ring-emerald-500/50 focus:ring-offset-0 cursor-pointer"
                  onChange={handleChange}
                />

                <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  Recordarme
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            {validation.isError && (
              <span className="flex items-center gap-1.5 text-sm text-red-600 font-medium">
                {validation.message}
              </span>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98]"
            >
              Iniciar sesión
            </button>
          </form>
        </div>

        {/* Register Link */}
        <p className="text-center mt-8 text-zinc-500">
          ¿No tienes una cuenta?{" "}
          <Link
            className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors"
            to="/Register"
          >
            Regístrate aquí
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

export default Login;
