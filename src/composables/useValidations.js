import { useI18n } from 'vue-i18n'

export const useValidators = () => {
  const { t } = useI18n()

  const validateEmail = (email) => {
    if (!email) return t('admin.validations.emailRequired')
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email))
      return t('admin.validations.invalidEmailFormat')
    return null
  }

  const validatePassword = (password) => {
    if (!password) return t('admin.validations.passwordRequired')
    if (password.length < 10) return t('admin.validations.passwordTooShort')
    if (!/[0-9]/.test(password)) return t('admin.validations.passwordMissingNumber')
    if (!/[!@#$%^&*-+(),.?":{}|<>]/.test(password))
      return t('admin.validations.passwordMissingSpecial')
    return null
  }

  const validateFirstName = (firstName) => {
    if (!firstName) return t('admin.validations.firstNameRequired')
    if (firstName.length < 2 || firstName.length > 20) {
      return t('admin.validations.firstNameLength')
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(firstName)) {
      return t('admin.validations.firstNameInvalidCharacters')
    }
    return null
  }

  const validateCheckbox = (checked) => {
    if (!checked) return 'You have to consent to The Broke Backpacker’s Privacy Policy.'
    return null
  }

  const validateSurname = (surname) => {
    if (!surname) return t('admin.validations.surnameRequired')
    if (surname.length < 2 || surname.length > 30) {
      return t('admin.validations.surnameLength')
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(surname)) {
      return t('admin.validations.surnameInvalidCharacters')
    }
    return null
  }

  const validateRole = (role) => {
    const validRoles = ['Admin', 'Editor', 'User']
    if (!role || typeof role !== 'string') {
      return t('admin.validations.roleRequired')
    }
    if (!validRoles.includes(role)) {
      return t('admin.validations.roleInvalid')
    }
    return null
  }

  const validateStatus = (status) => {
    const validStatus = ['Active', 'Inactive']
    if (!status || typeof status !== 'string') {
      return t('admin.validations.statusRequired')
    }
    if (!validStatus.includes(status)) {
      return t('admin.validations.statusInvalid')
    }
    return null
  }

  return {
    validateEmail,
    validatePassword,
    validateFirstName,
    validateCheckbox,
    validateSurname,
    validateRole,
    validateStatus,
  }
}
