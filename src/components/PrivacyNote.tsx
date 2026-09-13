/** Nota de privacidad de 3 líneas exigida por 01-SPEC.md §8, reutilizada en registro y perfil. */
export function PrivacyNote() {
  return (
    <p className="text-caption text-content-muted">
      Solo pedimos tu apodo y tu correo, nunca tu nombre completo, edad ni teléfono.
      <br />
      Tu contraseña se guarda cifrada, nunca en texto plano.
      <br />
      Puedes escribirle al administrador si necesitas eliminar tu cuenta.
    </p>
  )
}
