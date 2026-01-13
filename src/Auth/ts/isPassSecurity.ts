export const isSecurity = (
  password: string
): { level: number; color: string; title: string } => {
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  if (password.length < 8) {
    return {
      level: 0,
      color: "bg-red-500",
      title: "Mínimo 8 caracteres",
    };
  }

  if (hasNumber && hasUpper && hasLower && hasSymbol) {
    return {
      level: 3,
      color: "bg-emerald-500",
      title: "Contraseña segura",
    };
  }

  if (hasNumber && hasUpper && hasLower) {
    return {
      level: 2,
      color: "bg-emerald-900",
      title: "Agrega un símbolo",
    };
  }

  if (hasNumber) {
    return {
      level: 1,
      color: "bg-orange-500",
      title: "Agrega mayúscula y minúscula",
    };
  }

  return {
    level: 0,
    color: "bg-red-500",
    title: "Agrega un numero",
  };
};
