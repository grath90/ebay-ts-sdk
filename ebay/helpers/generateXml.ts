/**
 * @param {*} params 
 * 
 * Dynamic xml generator based on params passed to function
 * Use Key names as data elements and their respective values as the
 * actual data element values for xml
 */

function assignParams(params: any): string {
  let body: string;
  body = '';

  let nested: string;
  nested = '';

  for (let property in params) {
    if (params.hasOwnProperty(property)) {
      if (typeof params[property] === 'object') {
        /** Assign nested parameters recursively */
        nested = assignParams(params[property])
        body += `<${property}>${nested}</${property}>`
      } else {
        body += `<${property}>${params[property]}</${property}>`;
      }
    }
  }

  return body;
}

function generate(params: any): string {
  let body: string;
  body = '';

  body = assignParams(params.callInfo);

  return `<?xml version="1.0" encoding="utf-8"?>
  <${params.callName}Request xmlns="urn:ebay:apis:eBLBaseComponents">
    <RequesterCredentials>
      <eBayAuthToken>${params.auth.token}</eBayAuthToken>
    </RequesterCredentials>
    ${body}
  </${params.callName}Request>
  `;
};

export { generate }