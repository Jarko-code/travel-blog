export const validateEmail = (email) => {
  if (!email) return 'Email is required.'
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email)) return 'Invalid email format.'
  return null
}

export const validatePassword = (password) => {
  if (!password) return 'Password is required.'
  if (password.length < 10) return 'Password must be at least 10 characters long.'
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number.'
  if (!/[!@#$%^&*-+(),.?":{}|<>]/.test(password))
    return 'Password must contain at least one special character.'
  return null
}
