// import types from server type
// import method from interceptors

export function getExample(payload: string): Promise<string> {
  // examplae
  // const {page, limit, search, date} = payload
  // return get(`/example?page=${page}&limit=${limit}&search=${search}&date=${date}`)
  return new Promise((resolve) => resolve(payload));
}
