function generateQS(params: any): string{
  let qs: string = '?';

  /** Iterate through params object and assign name and value to query string. */
  for(const data in params) {
    qs += `${data}=${params[data]}`
  }

  return qs;
}

export { generateQS };