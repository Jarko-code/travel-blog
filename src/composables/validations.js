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

export const validateFirstName = (firstName) => {
  if (!firstName) return 'First name is required.'
  if (firstName.length < 2 || firstName.length > 20) {
    return 'Login name must be between 2 and 20 characters.'
  }
  if (!/^[a-zA-Z0-9._-]+$/.test(firstName)) {
    return 'Login name can only contain letters, numbers, periods, underscores, and hyphens.'
  }
  return null
}

export const validateCheckbox = (checked) => {
  if (!checked) return 'You have to consent to The Broke Backpacker’s Privacy Policy.'
  return null
}
