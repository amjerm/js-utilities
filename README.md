# js-utilities

Various utility functions

## Functions

**formatPhoneNumber**

- Formats phone number as (###) ###-####
- @param {string} phoneNumber - Phone number to format
- @returns {string}

**validateWebsite**

- Returns validated URI or null
- @param {string} website - URI string
- @returns {string|null}

**getLastURISegment**

- Gets last segment of a URI
- @param {string} uri
- @returns {string}

**objectIsDense**

- Used to determine if an object is without null values in the first level.
- @param {object}
- @returns {boolean}

**hasValue**

- Shorthand for foo !== null && foo !== undefined.
- @param {any}
- @returns {boolean}

**prependToObjectKeys**

- Prepends a string to all property names in an object
- @param {object}
- @returns {object}

**makeMailURI**

- Generates an Outlook friendly mailto URI
- @param {object} - Email details object
- @returns {string}
