/* eslint-env jest */
import {
  formatPhoneNumber,
  getLastURISegment,
  hasValue,
  makeMailURI,
  objectIsDense,
  validateWebsite,
  prependToObjectKeys,
} from './index'

describe('Utilities', () => {
  describe('formatPhoneNumber function', () => {
    it('handles string formatting', () => {
      expect(formatPhoneNumber('(123) 456-7890')).toBe('(123) 456-7890')
      expect(formatPhoneNumber('(123) 4567890')).toBe('(123) 456-7890')
      expect(formatPhoneNumber('(123)4567890')).toBe('(123) 456-7890')
      expect(formatPhoneNumber('123-456-7890')).toBe('(123) 456-7890')
      expect(formatPhoneNumber('123 456 7890')).toBe('(123) 456-7890')
      expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890')
    })

    it('returns short number as itself', () => {
      expect(formatPhoneNumber('456-7890')).toBe('456-7890')
    })

    it('throws an error for number type', () => {
      // @ts-ignore
      expect(() => formatPhoneNumber(1234567890)).toThrow(
        'phoneNumber.replace is not a function'
      )
    })
  })

  describe('validateWebsite function', () => {
    it('handles valid strings', () => {
      expect(validateWebsite('http://google.com')).toBe('http://google.com')
      expect(validateWebsite('https://google.com')).toBe('https://google.com')
      expect(validateWebsite('http://www.google.com')).toBe(
        'http://www.google.com'
      )
      expect(validateWebsite('http://google.co.uk')).toBe('http://google.co.uk')
      expect(validateWebsite('http://www.google.co.uk')).toBe(
        'http://www.google.co.uk'
      )
      expect(validateWebsite('https://www.google.co.uk')).toBe(
        'https://www.google.co.uk'
      )
      expect(validateWebsite('www.google.co.uk')).toBe(
        'http://www.google.co.uk'
      )
      expect(validateWebsite('www.google.com')).toBe('http://www.google.com')
      expect(validateWebsite('www.google.ca')).toBe('http://www.google.ca')
      expect(validateWebsite('google.ca')).toBe('http://google.ca')
      expect(validateWebsite('google.com')).toBe('http://google.com')
      expect(validateWebsite('google.co.uk')).toBe('http://google.co.uk')
    })

    it('handles invalid strings', () => {
      expect(validateWebsite('.com')).not.toBeTruthy()
      expect(validateWebsite('')).not.toBeTruthy()
      expect(validateWebsite(' ')).not.toBeTruthy()
      // eslint-disable-next-line no-tabs
      expect(validateWebsite('	')).not.toBeTruthy()
    })

    it('throws error for null input', () => {
      // @ts-ignore
      expect(() => validateWebsite()).toThrow()
    })
  })

  describe('getLastURISegment function', () => {
    it('handles no trailing slash', () => {
      expect(getLastURISegment('http://foo.com/boo')).toBe('boo')
      expect(getLastURISegment('http://foo.com/foo/boo')).toBe('boo')
      expect(getLastURISegment('http://test.foo.com/foo/boo')).toBe('boo')
    })

    it('handles trailing slash', () => {
      expect(getLastURISegment('http://foo.com/boo/')).toBe('boo')
      expect(getLastURISegment('http://foo.com/foo/boo/')).toBe('boo')
      expect(getLastURISegment('http://test.foo.com/foo/boo/')).toBe('boo')
    })

    it('handles trailing slash with hash', () => {
      expect(getLastURISegment('http://foo.com/boo/#')).toBe('boo')
      expect(getLastURISegment('http://foo.com/foo/boo/#')).toBe('boo')
      expect(getLastURISegment('http://test.foo.com/foo/boo/#')).toBe('boo')
    })
  })

  describe('objectIsDense function', () => {
    it('returns true for a dense shallow object', () => {
      expect(objectIsDense({ a: 'foo', b: 'bar' })).toBe(true)
    })

    it('returns false for a non-dense shallow object', () => {
      expect(objectIsDense({ a: 'foo', b: null })).toBe(false)
    })

    it('returns true for a dense multidimensional object', () => {
      expect(objectIsDense({ a: 'foo', b: { c: 'bar', d: 'bat' } })).toBe(true)
    })

    it('returns true for a dense multidimensional object with a null value in another dimension', () => {
      expect(objectIsDense({ a: 'foo', b: { c: 'bar', d: null } })).toBe(true)
    })

    it('returns true for a dense shallow object with false for a value', () => {
      expect(objectIsDense({ a: 'foo', b: 'bar' })).toBe(true)
    })
  })

  describe('hasValue function', () => {
    it('returns false for undefined input', () => {
      expect(hasValue(undefined)).toBe(false)
    })

    it('returns false for null input', () => {
      const foo = null
      expect(hasValue(foo)).toBe(false)
    })

    it('returns true for string input', () => {
      const foo = 'bar'
      expect(hasValue(foo)).toBe(true)
    })

    it('returns true for number 0 input', () => {
      const foo = 0
      expect(hasValue(foo)).toBe(true)
    })

    it('returns true for false input', () => {
      const foo = true
      expect(hasValue(foo)).toBe(true)
    })
  })

  describe('prependToObjectKeys function', () => {
    it('prepends a string to all keys', () => {
      const startObj = {
        a: true,
        b: 'foo',
        c: {
          z: true,
          x: 'bar',
        },
      }

      const result = prependToObjectKeys(startObj, 'test')
      expect(Object.keys(result)).toEqual(['testa', 'testb', 'testc'])
      expect(Object.values(result)).toEqual([
        true,
        'foo',
        {
          z: true,
          x: 'bar',
        },
      ])
      expect(result).toEqual({
        testa: true,
        testb: 'foo',
        testc: {
          z: true,
          x: 'bar',
        },
      })
    })
  })

  describe('makeMailURI function', () => {
    const mailObj = {
      to: ['bill@test.com', 'jane@test.com'],
      subject: 'Lorem ipsum',
      body: "Now that the, uh, garbage ball is in space, Doctor, perhaps you can help me with my sexual inhibitions? Is that a cooking show? Bender, we're trying our best. Bender, we're trying our best. Yes! In your face, Gandhi! Maybe I love you so much I love you no matter who you are pretending to be. Wow, you got that off the Internet? In my day, the Internet was only used to download pornography. Five hours? Aw, man! Couldn't you just get me the death penalty?",
    }

    it('generates correct uri with recipient array', () => {
      expect(makeMailURI(mailObj)).toBe(
        "mailto:bill@test.com,jane@test.com?subject=Lorem ipsum&body=Now%20that%20the%2C%20uh%2C%20garbage%20ball%20is%20in%20space%2C%20Doctor%2C%20perhaps%20you%20can%20help%20me%20with%20my%20sexual%20inhibitions%3F%20Is%20that%20a%20cooking%20show%3F%20Bender%2C%20we're%20trying%20our%20best.%20Bender%2C%20we're%20trying%20our%20best.%20Yes!%20In%20your%20face%2C%20Gandhi!%20Maybe%20I%20love%20you%20so%20much%20I%20love%20you%20no%20matter%20who%20you%20are%20pretending%20to%20be.%20Wow%2C%20you%20got%20that%20off%20the%20Internet%3F%20In%20my%20day%2C%20the%20Internet%20was%20only%20used%20to%20download%20pornography.%20Five%20hours%3F%20Aw%2C%20man!%20Couldn't%20you%20just%20get%20me%20the%20death%20penalty%3F"
      )
    })

    it('generates correct uri with recipient string', () => {
      expect(makeMailURI({ ...mailObj, to: 'bill@test.com' })).toBe(
        "mailto:bill@test.com?subject=Lorem ipsum&body=Now%20that%20the%2C%20uh%2C%20garbage%20ball%20is%20in%20space%2C%20Doctor%2C%20perhaps%20you%20can%20help%20me%20with%20my%20sexual%20inhibitions%3F%20Is%20that%20a%20cooking%20show%3F%20Bender%2C%20we're%20trying%20our%20best.%20Bender%2C%20we're%20trying%20our%20best.%20Yes!%20In%20your%20face%2C%20Gandhi!%20Maybe%20I%20love%20you%20so%20much%20I%20love%20you%20no%20matter%20who%20you%20are%20pretending%20to%20be.%20Wow%2C%20you%20got%20that%20off%20the%20Internet%3F%20In%20my%20day%2C%20the%20Internet%20was%20only%20used%20to%20download%20pornography.%20Five%20hours%3F%20Aw%2C%20man!%20Couldn't%20you%20just%20get%20me%20the%20death%20penalty%3F"
      )
    })
  })
})
