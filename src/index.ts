/**
 * Formats phone number as (###) ###-####
 * @param {string} phoneNumber - Phone number to format
 * @returns {string}
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const re = /[\s\-().]/g
  const cleanNumber = phoneNumber.replace(re, '')

  if (cleanNumber.length === 10) {
    return `(${cleanNumber.substring(0, 3)}) ${cleanNumber.substring(3, 6)}-${cleanNumber.substring(6)}`
  }

  return phoneNumber
}

/**
 * Returns validated URI or null
 * @param {string} website - URI string
 * @returns {string|null}
 */
export const validateWebsite = (website: string): string | null => {
  let cleanedUrl = website.trim()

  if (typeof cleanedUrl === 'string' && cleanedUrl.match(/^[\w:/.-]+\.[\w]{2,}(\/)?$/) !== null) {
    const re = /^http(s)?:\/\//

    if (cleanedUrl.match(re) === null) {
      cleanedUrl = `http://${cleanedUrl}`
    }

    return cleanedUrl
  }

  return null
}

/**
 * Gets last segment of a URI
 * @param {string} uri
 * @returns {string}
 */
export const getLastURISegment = (uri: string): string => {
  const parts: string[] = uri.split('/').reverse()

  if (/\w/.test(parts[0])) {
    return parts[0]
  } else {
    return parts[1]
  }
}

/**
* Used to determine if an object is without null values in the first level.
* @param {object}
* @returns {boolean}
*/
export const objectIsDense = (object: object): boolean => {
  const valuesArray = Object.values(object)

  for (let i = 0; i < valuesArray.length; i++) {
    if (valuesArray[i] === null) {
      return false
    }
  }
  return true
}

/**
 * Shorthand for foo !== null && foo !== undefined.
 * @param {any}
 * @returns {boolean}
 */
export const hasValue = (input: any): boolean => {
  return input !== null && input !== undefined
}

/**
 * Prepends a string to all property names in an object
 * @param {object} - Routes object
 * @returns {object}
 */
export const prependToObjectKeys = (object: { [key: string]: any }, string: string): object => {
  const newObject: { [key: string]: any } = {}

  Object.entries(object).forEach(entry => {
    newObject[`${string}${entry[0]}`] = entry[1]
  })

  return newObject
}

/**
 * Generates an Outlook friendly mailto URI
 * @param {object} - Email details object
 * @returns {string}
 */
export const makeMailURI = ({ to, body, ...parameters }: { to: string, body: string }): string => {
  const recipientString = Array.isArray(to) ? to.join(',') : typeof to === 'string' ? to : ''

  let mailToUri = `mailto:${typeof recipientString === 'string' ? recipientString : ''}`
  let parameterOperator = '?'

  for (let [key, value] of Object.entries(parameters)) {
    if (Array.isArray(value)) {
      value = value.join(',')
    }

    if (typeof value === 'string' && value !== '') {
      mailToUri += `${parameterOperator}${key}=${value}`
      parameterOperator = '&'
    }
  }

  if (typeof body === 'string' && body !== '') {
    mailToUri += `&body=${encodeURIComponent(body) ?? ''}`
  }

  mailToUri = mailToUri.replace('%u2019', '\'')

  return mailToUri
}
